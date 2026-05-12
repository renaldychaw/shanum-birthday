import { useState, useEffect, useRef } from "react";
import "../styles/BirthdayCake.css";

const TOTAL_CANDLES = 4;

export default function BirthdayCake() {
  const [blown, setBlown]         = useState(new Set());
  const [blowing, setBlowing]     = useState(false);
  const [allOut, setAllOut]       = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [micError, setMicError]   = useState(false);
  const [particles, setParticles] = useState([]);
  const analyserRef  = useRef(null);
  const animFrameRef = useRef(null);
  const streamRef    = useRef(null);

  const blowCandle = (idx) => {
    if (blown.has(idx) || allOut) return;
    setBlown(prev => {
      const next = new Set(prev);
      next.add(idx);
      if (next.size === TOTAL_CANDLES) {
        setAllOut(true);
        spawnCelebration();
      }
      return next;
    });
    spawnPuff(idx);
  };

  const blowAll = () => {
    setBlowing(true);
    const indices = [...Array(TOTAL_CANDLES).keys()].filter(i => !blown.has(i));
    indices.forEach((idx, i) => {
      setTimeout(() => blowCandle(idx), i * 80);
    });
    setTimeout(() => setBlowing(false), indices.length * 80 + 300);
  };

  const spawnPuff = (idx) => {
    const id = Date.now() + idx;
    setParticles(p => [...p, { id, idx, type: "puff" }]);
    setTimeout(() => setParticles(p => p.filter(x => x.id !== id)), 900);
  };

  const spawnCelebration = () => {
    const colors = ["#d4b8f5","#f4b8d1","#b8d8f4","#ffd6a0","#fff","#c4a8e8"];
    for (let i = 0; i < 80; i++) {
      const el = document.createElement("div");
      el.className = "confetti-piece";
      const size = Math.random() * 8 + 6 + "px";
      Object.assign(el.style, {
        left:              Math.random() * 100 + "vw",
        top:               "-12px",
        background:        colors[Math.floor(Math.random() * colors.length)],
        width:             size,
        height:            size,
        borderRadius:      Math.random() > 0.5 ? "50%" : "2px",
        animationDuration: Math.random() * 3 + 2 + "s",
        animationDelay:    Math.random() * 1 + "s",
      });
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 5000);
    }
  };

  // ── Mic detection ──────────────────────────────────────────────────────────
  const startMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const ctx      = new (window.AudioContext || window.webkitAudioContext)();
      const source   = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;
      setMicActive(true);
      setMicError(false);
      detectBlow();
    } catch {
      setMicError(true);
    }
  };

  const stopMic = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    analyserRef.current = null;
    setMicActive(false);
  };

  const detectBlow = () => {
    if (!analyserRef.current) return;
    const data = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(data);
    const avg = data.reduce((a, b) => a + b, 0) / data.length;

    if (avg > 18) {
      // Blow out one random unblown candle per frame when blowing
      setBlown(prev => {
        const unblown = [...Array(TOTAL_CANDLES).keys()].filter(i => !prev.has(i));
        if (unblown.length === 0) return prev;
        const pick = unblown[Math.floor(Math.random() * unblown.length)];
        spawnPuff(pick);
        const next = new Set(prev);
        next.add(pick);
        if (next.size === TOTAL_CANDLES) {
          setAllOut(true);
          spawnCelebration();
          stopMic();
        }
        return next;
      });
      setBlowing(true);
    } else {
      setBlowing(false);
    }
    animFrameRef.current = requestAnimationFrame(detectBlow);
  };

  // Reset
  const reset = () => {
    stopMic();
    setBlown(new Set());
    setAllOut(false);
    setBlowing(false);
    setParticles([]);
  };

  useEffect(() => () => stopMic(), []);

  const blownCount = blown.size;

  return (
    <section className="cake-section fade-section">
      <h2 className="section-title">🎂 Tiup Lilin, Shanum!</h2>
      <p className="section-sub">Tiup lilinnya — klik, atau pakai mic beneran! 🎤</p>

      <div className="cake-wrapper">

        {/* ── Candles ── */}
        <div className="candles-row">
          {[...Array(TOTAL_CANDLES)].map((_, i) => {
            const isBlown = blown.has(i);
            const puff    = particles.find(p => p.idx === i);
            return (
              <div key={i} className="candle-wrap" onClick={() => blowCandle(i)}>
                {/* Smoke puff */}
                {puff && <div className="smoke-puff" />}

                {/* Flame */}
                {!isBlown && (
                  <div className={`flame-wrap ${blowing ? "flickering" : ""}`}>
                    <div className="flame-outer" />
                    <div className="flame-inner" />
                    <div className="flame-core"  />
                  </div>
                )}

                {/* Candle body */}
                <div className={`candle-body ${isBlown ? "blown" : ""}`}>
                  <div className="candle-wick" />
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Cake body ── */}
        <div className="cake-body">
          <div className="cake-top">
            <div className="cake-drip d1" /><div className="cake-drip d2" />
            <div className="cake-drip d3" /><div className="cake-drip d4" />
            <div className="cake-drip d5" />
            <span className="cake-text">Happy 4th Shanum! 💜</span>
          </div>
          <div className="cake-mid">
            <span className="cake-deco">🌸 ✨ 🎀 ✨ 🌸</span>
          </div>
          <div className="cake-bot" />
          <div className="cake-plate" />
        </div>

        {/* ── Progress ── */}
        <div className="cake-progress">
          <div className="progress-bar-wrap">
            <div
              className="progress-bar-fill"
              style={{ width: `${(blownCount / TOTAL_CANDLES) * 100}%` }}
            />
          </div>
          <p className="progress-label">
            {allOut
              ? "🎉 Semua lilin mati! Selamat ulang tahun Shanum! 🎉"
              : `${blownCount} / ${TOTAL_CANDLES} lilin ditiup`}
          </p>
        </div>

        {/* ── Controls ── */}
        {!allOut ? (
          <div className="cake-controls">
            <button className="cake-btn blow-btn" onClick={blowAll}>
              💨 Tiup Semua
            </button>
            {!micActive ? (
              <button className="cake-btn mic-btn" onClick={startMic}>
                🎤 Pakai Mic
              </button>
            ) : (
              <button className="cake-btn mic-btn active" onClick={stopMic}>
                🔴 Stop Mic
              </button>
            )}
          </div>
        ) : (
          <button className="cake-btn reset-btn" onClick={reset}>
            🔄 Pasang Lagi
          </button>
        )}

        {micError && (
          <p className="mic-error">⚠️ Mic tidak bisa diakses. Coba klik tiup aja ya!</p>
        )}
        {micActive && !allOut && (
          <p className="mic-hint">🎤 Tiup mic sekarang! {blowing ? "💨 Terdeteksi!" : ""}</p>
        )}

      </div>

      {/* ── Celebration overlay ── */}
      {allOut && (
        <div className="cake-celebration">
          <div className="celebration-text">🎉 Happy Birthday Shanum! 🎉</div>
          <div className="celebration-sub">Level 4 Unlocked! 💜✨</div>
        </div>
      )}
    </section>
  );
}
