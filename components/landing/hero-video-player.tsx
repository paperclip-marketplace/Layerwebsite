"use client";

import { useCallback, useRef, useState } from "react";
import { Play } from "lucide-react";
import styles from "./landing-hero-section.module.css";

const HERO_VIDEO_SRC = "/assets/videos/landing/hero-placeholder-video.mp4";

export function HeroVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      await video.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, []);

  return (
    <div className={styles.videoEmbed}>
      <video
        ref={videoRef}
        className={styles.video}
        src={HERO_VIDEO_SRC}
        title="Layer product overview"
        playsInline
        preload="metadata"
        controls={isPlaying}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      {!isPlaying ? (
        <button
          type="button"
          className={styles.playOverlay}
          onClick={handlePlay}
          aria-label="Play product overview video"
        >
          <span className={styles.playButton}>
            <Play className={styles.playIcon} aria-hidden />
          </span>
        </button>
      ) : null}
    </div>
  );
}
