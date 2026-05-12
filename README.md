# 🎀 Shanum JKT48 Birthday Tribute

A premium fan-made birthday tribute website for Shanum JKT48's 16th birthday.  
Built with React + Vite, featuring glassmorphism, animated piano, confetti, and more.

---

## 📁 Folder Structure

```
shanum-birthday/
├── index.html                    ← HTML entry point
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                  ← React root mount
    ├── App.jsx                   ← Root component + confetti + hooks
    │
    ├── data/
    │   └── index.js              ← All static data (stats, gallery, timeline, piano notes)
    │
    ├── hooks/
    │   ├── useFloatingHearts.js  ← Spawns floating emoji hearts
    │   ├── useScrollFade.js      ← Intersection Observer fade-in
    │   └── useAudioContext.js    ← Web Audio API context manager
    │
    ├── components/
    │   ├── Hero.jsx              ← Fullscreen animated gradient hero
    │   ├── LevelUp.jsx           ← Game-style stat cards + birthday message
    │   ├── Gallery.jsx           ← Photo grid with hover effects
    │   ├── Piano.jsx             ← Interactive piano + Happy Birthday autoplay
    │   ├── Timeline.jsx          ← Vertical milestone timeline
    │   └── Closing.jsx           ← Final section with sparkles + credit
    │
    └── styles/
        ├── global.css            ← Variables, reset, glass-card, fade-section
        ├── Hero.css
        ├── LevelUp.css
        ├── Gallery.css
        ├── Piano.css
        ├── Timeline.css
        └── Closing.css
```

---

## 🚀 Setup & Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build
```

---

## 🖼️ Adding Real Photos

In `src/components/Gallery.jsx`, replace the placeholder divs:

```jsx
{/* FROM: */}
<div className={`gallery-placeholder ${g.cls}`}>
  <span>{g.emoji}</span>
  <p>PHOTO {i + 1}</p>
</div>

{/* TO: */}
<img src="/photos/shanum-1.jpg" alt="Shanum on stage" loading="lazy" />
```

Put your photos in `public/photos/` and update `src/data/index.js` to include the paths.

---

## 🎹 Piano Notes

Happy Birthday melody is defined in `src/data/index.js` as `HAPPY_BIRTHDAY`.  
Each entry is `[note, durationMultiplier]`. You can edit the melody or tempo range there.

---

Made with 💜 by **Renaldy** — for the one and only Shanum JKT48 🎀
