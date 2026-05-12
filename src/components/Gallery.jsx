import { useRef, useState } from "react";
import { gallery } from "../data/index.js";
import "../styles/Gallery.css";

export default function Gallery() {
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState(null);
  const trackRef = useRef(null);

  // Double the items so the loop is seamless
  const items = [...gallery, ...gallery];

  return (
    <section className="gallery-section fade-section">
      <h2 className="section-title">📸 Galeri Shanum</h2>
      <p className="section-sub">Moments too cute to forget ✨</p>

      {/* ── Conveyor belt ── */}
      <div
        className="carousel-viewport"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        {/* Left fade */}
        <div className="carousel-fade carousel-fade-left" />
        {/* Right fade */}
        <div className="carousel-fade carousel-fade-right" />

        <div
          ref={trackRef}
          className={`carousel-track ${paused ? "paused" : ""}`}
        >
          {items.map((g, i) => (
            <div
              key={i}
              className="carousel-card"
              onClick={() => setSelected(g)}
            >
              <img src={g.src} alt={g.label} loading="lazy" draggable={false} />
              <div className="carousel-label">
                <span>{g.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="gallery-hint">✋ Hover untuk pause &nbsp;·&nbsp; Klik foto untuk memperbesar 💜</p>

      {/* ── Lightbox ── */}
      {selected && (
        <div className="lightbox" onClick={() => setSelected(null)}>
          <div className="lightbox-inner" onClick={e => e.stopPropagation()}>
            <img src={selected.src} alt={selected.label} />
            <p className="lightbox-label">{selected.label}</p>
            <button className="lightbox-close" onClick={() => setSelected(null)}>✕</button>
          </div>
        </div>
      )}
    </section>
  );
}

