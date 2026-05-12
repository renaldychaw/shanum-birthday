import { useRef, useState, useEffect, useCallback } from "react";

// ── Dreamy birthday music — pure Web Audio synthesis ─────────────────────────
// Chord progression: F maj7 → A min7 → D min7 → G maj7 (loop)
// Gentle arpeggio + soft pad + subtle bass

const CHORD_NOTES = [
  // F maj7:  F3  A3  C4  E4
  [174.61, 220.00, 261.63, 329.63],
  // A min7:  A3  C4  E4  G4
  [220.00, 261.63, 329.63, 392.00],
  // D min7:  D3  F3  A3  C4
  [146.83, 174.61, 220.00, 261.63],
  // G maj7:  G3  B3  D4  F#4
  [196.00, 246.94, 293.66, 369.99],
];

const BASS_NOTES = [174.61, 220.00, 146.83, 196.00]; // F2 A2 D2 G2

export function useBackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume,    setVolume]    = useState(0.5);

  const ctxRef        = useRef(null);
  const masterGainRef = useRef(null);
  const schedulerRef  = useRef(null);
  const startTimeRef  = useRef(0);
  const chordIdxRef   = useRef(0);
  const notesRef      = useRef([]);

  // ── Create / resume context ───────────────────────────────────────────────
  const getCtx = () => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      // Master gain + gentle limiter
      const master  = ctxRef.current.createGain();
      const limiter = ctxRef.current.createDynamicsCompressor();
      limiter.threshold.value = -6;
      limiter.ratio.value     = 4;
      master.connect(limiter);
      limiter.connect(ctxRef.current.destination);
      masterGainRef.current = master;
    }
    if (ctxRef.current.state === "suspended") ctxRef.current.resume();
    return ctxRef.current;
  };

  // ── Play one note with envelope ───────────────────────────────────────────
  const scheduleNote = (ctx, freq, startAt, duration, gainVal = 0.12, type = "sine") => {
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(masterGainRef.current);

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startAt);

    // Soft attack / decay envelope
    gain.gain.setValueAtTime(0.001, startAt);
    gain.gain.exponentialRampToValueAtTime(gainVal, startAt + 0.08);
    gain.gain.exponentialRampToValueAtTime(gainVal * 0.6, startAt + duration * 0.5);
    gain.gain.exponentialRampToValueAtTime(0.001, startAt + duration * 0.95);

    osc.start(startAt);
    osc.stop(startAt + duration);
    notesRef.current.push(osc);
  };

  // ── Schedule one full chord cycle (arpeggio + pad + bass) ─────────────────
  const scheduleChord = useCallback((ctx, chordIdx, beatStart, bpm) => {
    const beat   = 60 / bpm;          // seconds per beat
    const chord  = CHORD_NOTES[chordIdx % CHORD_NOTES.length];
    const bass   = BASS_NOTES[chordIdx % BASS_NOTES.length];

    // --- Soft pad (all notes together, long) ---
    chord.forEach(freq => {
      scheduleNote(ctx, freq, beatStart, beat * 4 * 0.92, 0.07, "sine");
    });

    // --- Gentle arpeggio (eighth notes) ---
    const arpOrder = [0, 1, 2, 3, 2, 1, 0, 1]; // up-down pattern
    arpOrder.forEach((noteIdx, i) => {
      const t    = beatStart + i * (beat * 0.5);
      const freq = chord[noteIdx] * 2; // one octave up
      scheduleNote(ctx, freq, t, beat * 0.45, 0.055, "triangle");
    });

    // --- Soft bass (beats 1 & 3) ---
    [0, 2].forEach(b => {
      scheduleNote(ctx, bass, beatStart + b * beat, beat * 0.85, 0.09, "sine");
      // Subtle bass harmonic
      scheduleNote(ctx, bass * 2, beatStart + b * beat, beat * 0.6, 0.03, "sine");
    });

    // --- Twinkle high note (random sparkle) ---
    const sparkleFreqs = [523.25, 659.25, 783.99, 1046.50];
    const sf = sparkleFreqs[Math.floor(Math.random() * sparkleFreqs.length)];
    scheduleNote(ctx, sf, beatStart + beat * 1.5, beat * 0.3, 0.03, "sine");
    scheduleNote(ctx, sf * 1.5, beatStart + beat * 3,   beat * 0.3, 0.025, "sine");
  }, []);

  // ── Main scheduler loop ───────────────────────────────────────────────────
  const tick = useCallback(() => {
    const ctx     = ctxRef.current;
    if (!ctx) return;
    const bpm     = 72;
    const beat    = 60 / bpm;
    const ahead   = beat * 4; // schedule 1 chord ahead
    const now     = ctx.currentTime;

    while (startTimeRef.current < now + ahead) {
      scheduleChord(ctx, chordIdxRef.current, startTimeRef.current, bpm);
      chordIdxRef.current = (chordIdxRef.current + 1) % CHORD_NOTES.length;
      startTimeRef.current += beat * 4; // each chord = 4 beats
    }

    schedulerRef.current = setTimeout(tick, beat * 1000);
  }, [scheduleChord]);

  // ── Start ─────────────────────────────────────────────────────────────────
  const start = useCallback(() => {
    const ctx            = getCtx();
    startTimeRef.current = ctx.currentTime + 0.1;
    chordIdxRef.current  = 0;
    notesRef.current     = [];
    // Fade in master gain
    masterGainRef.current.gain.setValueAtTime(0.001, ctx.currentTime);
    masterGainRef.current.gain.exponentialRampToValueAtTime(volume, ctx.currentTime + 1.5);
    tick();
    setIsPlaying(true);
  }, [tick, volume]);

  // ── Stop ──────────────────────────────────────────────────────────────────
  const stop = useCallback(() => {
    clearTimeout(schedulerRef.current);
    const ctx = ctxRef.current;
    if (ctx && masterGainRef.current) {
      masterGainRef.current.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1);
    }
    setTimeout(() => {
      notesRef.current.forEach(osc => { try { osc.stop(); } catch {} });
      notesRef.current = [];
    }, 1200);
    setIsPlaying(false);
  }, []);

  // ── Toggle ────────────────────────────────────────────────────────────────
  const toggle = useCallback(() => {
    isPlaying ? stop() : start();
  }, [isPlaying, start, stop]);

  // ── Volume control ────────────────────────────────────────────────────────
  const changeVolume = useCallback((val) => {
    setVolume(val);
    if (masterGainRef.current && ctxRef.current) {
      masterGainRef.current.gain.setTargetAtTime(val, ctxRef.current.currentTime, 0.1);
    }
  }, []);

  // ── Cleanup on unmount ────────────────────────────────────────────────────
  useEffect(() => () => {
    clearTimeout(schedulerRef.current);
    if (ctxRef.current) ctxRef.current.close();
  }, []);

  return { isPlaying, volume, toggle, changeVolume };
}
