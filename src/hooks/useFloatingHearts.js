import { useEffect } from "react";

/**
 * Spawns floating heart/sparkle emojis that rise from the bottom of the screen.
 * Cleans up the interval on unmount.
 */
export function useFloatingHearts() {
  useEffect(() => {
    const icons = ["💜", "🌸", "✨", "💫", "🎀", "⭐"];

    const spawn = () => {
      const el = document.createElement("div");
      el.className = "float-heart";
      el.textContent = icons[Math.floor(Math.random() * icons.length)];
      el.style.left = Math.random() * 100 + "vw";
      el.style.bottom = "-40px";
      el.style.fontSize = Math.random() * 1 + 0.9 + "rem";
      el.style.animationDuration = Math.random() * 4 + 4 + "s";
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 8500);
    };

    const id = setInterval(spawn, 1200);
    return () => clearInterval(id);
  }, []);
}
