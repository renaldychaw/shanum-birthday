import { timeline } from "../data/index.js";
import "../styles/Timeline.css";

export default function Timeline() {
  return (
    <section className="timeline-section fade-section">
      <h2 className="section-title">🌟 Petualangan Shanum</h2>
      <p className="section-sub">4 tahun penuh kenangan indah 💫</p>

      <div className="timeline">
        {timeline.map((t, i) => (
          <div
            key={i}
            className="timeline-item glass-card fade-section"
            style={{ transitionDelay: i * 0.15 + "s" }}
          >
            <div className="timeline-dot" style={{ background: t.bg }}>
              {t.dot}
            </div>
            <div className="timeline-year">{t.year}</div>
            <div className="timeline-milestone">{t.milestone}</div>
            <div className="timeline-desc">{t.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
