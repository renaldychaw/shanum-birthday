import { closingSparkles } from "../data/index.js";
import "../styles/Closing.css";

const SPARKLE_ICONS = ["✨", "💜", "🌸", "⭐", "💫", "🎀"];

export default function Closing() {
  return (
    <section className="closing-section fade-section">

      {/* Animated background sparkles */}
      {closingSparkles.map((s, i) => (
        <div
          key={i}
          className="closing-sparkle"
          style={{
            ...s,
            fontSize:          s.size,
            animationDelay:    s.delay,
            animationDuration: "2.5s",
          }}
        >
          {SPARKLE_ICONS[i % SPARKLE_ICONS.length]}
        </div>
      ))}

      <h2 className="closing-title">Terus bersinar, Shanum! 🌸</h2>

      <p className="closing-sub">
        Dari level 1 sampai level 4 — setiap hari bersamamu adalah petualangan yang luar biasa.
        Dunia ini jadi lebih cerah dan penuh warna karena ada kamu di dalamnya.
        Selamat datang di petualangan baru! 💜
      </p>

      <div className="closing-emojis">💜 🌸 ✨ 🎀 💫</div>

      <div className="credit">
        Made by <span>Renaldy</span> — for the one and only Shanum &nbsp;🎀
      </div>

    </section>
  );
}
