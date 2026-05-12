import { useEffect } from "react";

/**
 * Observes all `.fade-section` elements and adds the `.visible` class
 * when they enter the viewport, triggering a CSS fade-in animation.
 */
export function useScrollFade() {
  useEffect(() => {
    const els = document.querySelectorAll(".fade-section");

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.12 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
