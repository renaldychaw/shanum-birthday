import { stats } from "../data/index.js";
import "../styles/LevelUp.css";

export default function LevelUp() {
  return (
    <section className="levelup-section fade-section">
      <h2 className="section-title">🎮 Pengumuman Resmi</h2>
      <p className="section-sub">Shanum Naik Level! — Notifikasi Sistem 🎮</p>

      {/* Stat pills */}
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="stat-pill glass-card">
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-bar">
              <div
                className="stat-fill"
                style={{
                  width:      s.pct,
                  background: `linear-gradient(90deg, ${s.color}, var(--lavender-deep))`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Birthday message card */}
      <div className="message-box glass-card">
        <div className="msg-sparkle" style={{ top: "-14px", right: "18px" }}>✨</div>
        <div className="msg-sparkle" style={{ bottom: "-10px", left: "22px", animationDelay: "0.8s" }}>💜</div>
        <div className="msg-sparkle" style={{ top: "10px", left: "14px", animationDelay: "1.4s" }}>🌸</div>
        <p>
          Selamat ulang tahun ke-4, Shanum! 🎉 Semoga tahun ini penuh dengan tawa, petualangan seru,
          dan hal-hal menyenangkan. Kamu sudah tumbuh jadi anak yang luar biasa —
          terus semangat bermain, belajar, dan bikin semua orang di sekitarmu bahagia.
          Hari ini adalah harimu! Nikmati setiap momennya ya. 🌟💜
        </p>
      </div>
    </section>
  );
}
