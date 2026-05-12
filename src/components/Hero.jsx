import "../styles/Hero.css";

const SPARKLES = Array.from({ length: 18 }, (_, i) => ({
  width:  Math.random() * 8 + 4,
  height: Math.random() * 8 + 4,
  bg:     i % 3 === 0 ? "#fff" : i % 3 === 1 ? "#f4b8d1" : "#d4b8f5",
  top:    Math.random() * 100,
  left:   Math.random() * 100,
  dur:    Math.random() * 3 + 2,
  delay:  Math.random() * 3,
}));

export default function Hero() {
  return (
    <section className="hero">
      {/* Gradient background */}
      <div className="hero-bg" />

      {/* Blurred colour orbs */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      {/* Static sparkle dots */}
      {SPARKLES.map((s, i) => (
        <div
          key={i}
          className="sparkle"
          style={{
            width:             s.width + "px",
            height:            s.height + "px",
            background:        s.bg,
            top:               s.top + "%",
            left:              s.left + "%",
            animationDuration: s.dur + "s",
            animationDelay:    s.delay + "s",
            zIndex:            5,
          }}
        />
      ))}

      {/* Main content */}
      <div className="hero-content">
        <div className="hero-badge">🎀 Special Birthday Edition 🎀</div>
        <h1 className="hero-title">
          Happy Level Up Day,<br />Shanum! 🎀✨
        </h1>
        <p className="hero-sub">4 tahun penuh keceriaan dan keajaiban! 🌸</p>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <span>SCROLL</span>
        <div className="scroll-arrow" />
      </div>
    </section>
  );
}
