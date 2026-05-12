// ── Stats (LevelUp section) ──────────────────────────────────────────────────
export const stats = [
  { icon: "😄", label: "Keceriaan",    value: "+100", pct: "100%", color: "#d4b8f5" },
  { icon: "🌸", label: "Kelucuan",     value: "+200", pct: "95%",  color: "#f4b8d1" },
  { icon: "🎨", label: "Kreativitas",  value: "+999", pct: "99%",  color: "#b8d8f4" },
  { icon: "💜", label: "Kasih Sayang", value: "∞",    pct: "100%", color: "#c4e8c4" },
];

// ── Gallery image imports ─────────────────────────────────────────────────────
import shanum1 from "../images/shanum_1.jpg";
import shanum2 from "../images/shanum_2.jpg";
import shanum3 from "../images/shanum_3.jpg";
import shanum4 from "../images/shanum_4.jpg";
import shanum5 from "../images/shanum_5.jpg";
import shanum6 from "../images/shanum_6.jpg";
import shanum7 from "../images/shanum_7.jpg";
import shanum8 from "../images/shanum_8.jpg";

const galleryImages = [shanum1, shanum2, shanum3, shanum4, shanum5, shanum6, shanum7, shanum8];

export const gallery = [
  { src: galleryImages[0], label: "Stage Queen"    },
  { src: galleryImages[1], label: "Sparkle Moment" },
  { src: galleryImages[2], label: "Blossom Era"    },
  { src: galleryImages[3], label: "Purple Vibes"   },
  { src: galleryImages[4], label: "Mic Drop"       },
  { src: galleryImages[5], label: "Shining Star"   },
  { src: galleryImages[6], label: "Melody Queen"   },
  { src: galleryImages[7], label: "Free Spirit"    },
];

// ── Timeline ─────────────────────────────────────────────────────────────────
export const timeline = [
  {
    year: "Tahun ke-1",
    dot: "🍼", bg: "#c4e8c4",
    milestone: "Petualangan Dimulai!",
    desc: "Shanum hadir ke dunia dan langsung bikin semua orang jatuh cinta. Senyumnya sudah jadi senjata paling ampuh sejak hari pertama! 🌱",
  },
  {
    year: "Tahun ke-2",
    dot: "👣", bg: "#d4b8f5",
    milestone: "Langkah Pertama",
    desc: "Jalan sana-sini, jatuh bangun, tapi nggak pernah menyerah! Dunia makin seru dieksplorasi dengan dua kaki sendiri. 💫",
  },
  {
    year: "Tahun ke-3",
    dot: "🗣️", bg: "#f4b8d1",
    milestone: "Era Cerewet Dimulai",
    desc: "Pertanyaan tak ada habisnya, cerita mengalir terus. Kata-kata mengalir deras dan dunia makin berwarna lewat obrolan seru setiap hari! 🌸",
  },
  {
    year: "Tahun ke-4",
    dot: "👑", bg: "#ffd6a0",
    milestone: "Level 4 Unlocked!",
    desc: "Makin pinter, makin lucu, makin sayang sama semua orang. Shanum resmi naik level jadi versi terbaik dirinya! Selamat ulang tahun! 🎉",
  },
];

// ── Closing sparkles ─────────────────────────────────────────────────────────
export const closingSparkles = [
  { top: "10%", left: "8%",  delay: "0s",   size: "1.6rem" },
  { top: "20%", right: "12%",delay: "0.6s", size: "1.2rem" },
  { top: "60%", left: "5%",  delay: "1.2s", size: "2rem"   },
  { top: "75%", right: "8%", delay: "0.3s", size: "1.4rem" },
  { top: "85%", left: "20%", delay: "0.9s", size: "1rem"   },
  { top: "30%", left: "50%", delay: "1.5s", size: "1.8rem" },
];

// ── Piano – note frequencies ─────────────────────────────────────────────────
export const NOTE_FREQ = {
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23,
  G4: 392.00, A4: 440.00, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46,
  G5: 783.99, A5: 880.00,
  "C#4": 277.18, "D#4": 311.13, "F#4": 369.99,
  "G#4": 415.30, "A#4": 466.16,
  "C#5": 554.37, "D#5": 622.25, "F#5": 739.99,
};

// Happy Birthday melody: [note, duration multiplier]
// 1 = quarter note, 0.5 = eighth, 2 = half
export const HAPPY_BIRTHDAY = [
  ["G4",0.75],["G4",0.25],["A4",1],  ["G4",1],["C5",1],["B4",2],
  ["G4",0.75],["G4",0.25],["A4",1],  ["G4",1],["D5",1],["C5",2],
  ["G4",0.75],["G4",0.25],["G5",1],  ["E5",1],["C5",1],["B4",1],["A4",2],
  ["F5",0.75],["F5",0.25],["E5",1],  ["C5",1],["D5",1],["C5",2],
];

// Piano key layout
export const WHITE_KEYS = ["C4","D4","E4","F4","G4","A4","B4","C5","D5","E5","F5","G5","A5"];

export const BLACK_KEY_MAP = {
  "C4":"C#4","D4":"D#4","F4":"F#4","G4":"G#4","A4":"A#4",
  "C5":"C#5","D5":"D#5","F5":"F#5",
};
