import { useState } from "react";
import { useBackgroundMusic } from "../hooks/useBackgroundMusic.js";
import "../styles/MusicPlayer.css";

export default function MusicPlayer() {
  const { isPlaying, volume, toggle, changeVolume } = useBackgroundMusic();
  const [showVolume, setShowVolume] = useState(false);

  return (
    <div className={`music-player ${isPlaying ? "playing" : ""}`}>

      {/* Volume slider — pops up on hover */}
      <div className={`volume-popup ${showVolume ? "visible" : ""}`}>
        <span className="volume-icon">🔈</span>
        <input
          type="range"
          min="0.05"
          max="1"
          step="0.05"
          value={volume}
          className="volume-slider"
          onChange={e => changeVolume(Number(e.target.value))}
        />
        <span className="volume-icon">🔊</span>
      </div>

      {/* Main toggle button */}
      <button
        className="music-btn"
        onClick={toggle}
        onMouseEnter={() => setShowVolume(true)}
        onMouseLeave={() => setShowVolume(false)}
        title={isPlaying ? "Pause music" : "Play music"}
      >
        <span className="music-disc">
          {isPlaying ? "🎵" : "🎶"}
        </span>
        <span className="music-label">
          {isPlaying ? "Music ON" : "Music OFF"}
        </span>
      </button>

      {/* Ripple rings when playing */}
      {isPlaying && (
        <>
          <div className="music-ring ring-1" />
          <div className="music-ring ring-2" />
          <div className="music-ring ring-3" />
        </>
      )}
    </div>
  );
}
