import { useEffect } from "react";

// Global styles (must be first)
import "./styles/global.css";

// Hooks
import { useFloatingHearts } from "./hooks/useFloatingHearts.js";
import { useScrollFade }     from "./hooks/useScrollFade.js";

// Components
import Hero         from "./components/Hero.jsx";
import LevelUp      from "./components/LevelUp.jsx";
import Gallery      from "./components/Gallery.jsx";
import BirthdayCake from "./components/BirthdayCake.jsx";
import Piano        from "./components/Piano.jsx";
import Timeline     from "./components/Timeline.jsx";
import Closing      from "./components/Closing.jsx";
import MusicPlayer  from "./components/MusicPlayer.jsx";


// ── Confetti helper (DOM-based, lives outside React tree) ────────────────────
function spawnConfetti() {
  const colors = ["#d4b8f5","#f4b8d1","#b8d8f4","#c4a8e8","#ffd6a0","#fff"];
  for (let i = 0; i < 120; i++) {
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
      animationDelay:    Math.random() * 2 + "s",
    });
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 5500);
  }
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  useFloatingHearts();
  useScrollFade();

  useEffect(() => {
    // Double confetti burst on load
    const t1 = setTimeout(spawnConfetti, 300);
    const t2 = setTimeout(spawnConfetti, 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div>
      <Hero         />
      <LevelUp      />
      <Gallery      />
<BirthdayCake />
      <Piano        />
      <Timeline     />
      <Closing      />
      <MusicPlayer  />
    </div>
  );
}
