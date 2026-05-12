import { useState, useEffect, useCallback, useRef } from "react";
import { NOTE_FREQ, HAPPY_BIRTHDAY, WHITE_KEYS, BLACK_KEY_MAP } from "../data/index.js";
import { useAudioContext } from "../hooks/useAudioContext.js";
import "../styles/Piano.css";

// ── Audio helper ──────────────────────────────────────────────────────────────
function playNote(audioCtx, freq, duration) {
  const osc  = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.type = "triangle";
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.55,  audioCtx.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration * 0.92);
  osc.start(audioCtx.currentTime);
  osc.stop(audioCtx.currentTime + duration);
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function Piano() {
  const [pressedKeys,   setPressedKeys]   = useState(new Set());
  const [activeNoteIdx, setActiveNoteIdx] = useState(-1);
  const [isPlaying,     setIsPlaying]     = useState(false);
  const [tempo,         setTempo]         = useState(100);
  const [timeouts,      setTimeouts]      = useState([]);
  const [keyWidth,      setKeyWidth]      = useState(42);

  const wrapperRef = useRef(null);
  const getCtx     = useAudioContext();

  // ── Responsive key size ───────────────────────────────────────────────────
  useEffect(() => {
    const update = () => {
      if (!wrapperRef.current) return;
      const available = wrapperRef.current.clientWidth - 40; // padding
      const natural   = WHITE_KEYS.length * 43;
      if (available < natural) {
        setKeyWidth(Math.floor(available / WHITE_KEYS.length));
      } else {
        setKeyWidth(42);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const keyGap     = 1;
  const whiteW     = keyWidth;
  const whiteH     = Math.round(keyWidth * 3.1);
  const blackW     = Math.round(keyWidth * 0.62);
  const blackH     = Math.round(whiteH * 0.60);
  const totalWidth = WHITE_KEYS.length * (whiteW + keyGap);

  // Trigger a single key press
  const triggerKey = useCallback((note) => {
    const freq = NOTE_FREQ[note];
    if (!freq) return;
    playNote(getCtx(), freq, 0.45);
    setPressedKeys((prev) => new Set([...prev, note]));
    setTimeout(
      () => setPressedKeys((prev) => { const s = new Set(prev); s.delete(note); return s; }),
      200
    );
  }, [getCtx]);

  const clearTimeouts = useCallback((ids) => ids.forEach(clearTimeout), []);

  const stopSong = useCallback(() => {
    clearTimeouts(timeouts);
    setTimeouts([]);
    setIsPlaying(false);
    setActiveNoteIdx(-1);
    setPressedKeys(new Set());
  }, [timeouts, clearTimeouts]);

  const playSong = useCallback(() => {
    if (isPlaying) { stopSong(); return; }
    setIsPlaying(true);
    const ctx    = getCtx();
    const beatMs = (60 / tempo) * 1000;
    const ids    = [];
    let t = 0;

    HAPPY_BIRTHDAY.forEach(([note, dur], i) => {
      const delay  = t;
      const durSec = (dur * beatMs) / 1000;
      const id1 = setTimeout(() => {
        setActiveNoteIdx(i);
        setPressedKeys(new Set([note]));
        playNote(ctx, NOTE_FREQ[note], durSec * 0.88);
      }, delay);
      const id2 = setTimeout(() => setPressedKeys(new Set()), delay + durSec * 850);
      ids.push(id1, id2);
      t += dur * beatMs;
    });

    const endId = setTimeout(() => {
      setIsPlaying(false);
      setActiveNoteIdx(-1);
      setPressedKeys(new Set());
    }, t + 200);

    ids.push(endId);
    setTimeouts(ids);
  }, [isPlaying, tempo, stopSong, getCtx]);

  useEffect(() => () => clearTimeouts(timeouts), [timeouts, clearTimeouts]);

  const melodyNotes = HAPPY_BIRTHDAY.map(([n]) => n);

  return (
    <section className="piano-section fade-section">
      <h2 className="section-title">🎹 Happy Birthday, Shanum!</h2>
      <p className="section-sub">Dengerin lagu untukmu — klik tuts atau play otomatis 🎵</p>

      <div className="piano-wrapper glass-card" ref={wrapperRef}>

        {/* Play / Stop */}
        <div className="piano-controls">
          <button
            className={`piano-btn play-btn ${isPlaying ? "active" : ""}`}
            onClick={playSong}
          >
            {isPlaying ? "⏹ Stop" : "▶ Play Happy Birthday"}
          </button>
        </div>

        {/* Tempo */}
        <div className="tempo-row">
          <span>🐢</span>
          <input
            type="range" min="60" max="160" value={tempo}
            className="tempo-slider"
            onChange={(e) => { if (!isPlaying) setTempo(Number(e.target.value)); }}
          />
          <span>🐇</span>
          <span style={{ minWidth: "60px" }}>{tempo} BPM</span>
        </div>

        {/* Note chips */}
        <div className="song-display">
          {melodyNotes.map((n, i) => (
            <div key={i} className={`note-chip ${i === activeNoteIdx ? "active-chip" : ""}`}>
              {n}
            </div>
          ))}
        </div>

        {/* ── Piano keys — fully fluid ── */}
        <div
          className="piano-keys-wrap"
          style={{ width: totalWidth + "px", height: whiteH + "px" }}
        >
          {/* White keys */}
          {WHITE_KEYS.map((note, i) => {
            const isHighlight = melodyNotes.includes(note);
            const isPressed   = pressedKeys.has(note);
            return (
              <div
                key={note}
                className={[
                  "piano-key white",
                  isPressed   ? "pressed"        : "",
                  isHighlight ? "highlight-note" : "",
                ].join(" ")}
                style={{
                  left:   i * (whiteW + keyGap) + "px",
                  width:  whiteW + "px",
                  height: whiteH + "px",
                  borderRadius: `0 0 ${Math.round(whiteW * 0.22)}px ${Math.round(whiteW * 0.22)}px`,
                }}
                onPointerDown={() => triggerKey(note)}
              >
                <div className="key-note-dot" />
                <span className="key-label">{note.replace(/\d/, "")}</span>
              </div>
            );
          })}

          {/* Black keys */}
          {WHITE_KEYS.map((wNote, i) => {
            const bNote = BLACK_KEY_MAP[wNote];
            if (!bNote) return null;
            const isPressed = pressedKeys.has(bNote);
            const leftPos   = i * (whiteW + keyGap) + whiteW - Math.round(blackW / 2);
            return (
              <div
                key={bNote}
                className={`piano-key black ${isPressed ? "pressed" : ""}`}
                style={{
                  left:   leftPos + "px",
                  width:  blackW  + "px",
                  height: blackH  + "px",
                  borderRadius: `0 0 ${Math.round(blackW * 0.25)}px ${Math.round(blackW * 0.25)}px`,
                }}
                onPointerDown={(e) => { e.stopPropagation(); triggerKey(bNote); }}
              />
            );
          })}
        </div>

        <p className="piano-hint">
          🎀 Klik tuts piano untuk memainkan nada sendiri &nbsp;·&nbsp; Atur tempo sesuai selera 💜
        </p>

      </div>
    </section>
  );
}

