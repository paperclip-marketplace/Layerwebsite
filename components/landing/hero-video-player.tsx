"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Maximize, Minimize, Pause, Play, Volume2, VolumeX } from "lucide-react";
import styles from "./landing-hero-section.module.css";

const VIMEO_ORIGIN = "https://player.vimeo.com";
const HERO_VIMEO_VIDEO_ID = "1202820253";
const HERO_VIMEO_HASH = "4e687234b7";
const DEFAULT_VOLUME = 0.85;

type VimeoMessage = {
  event?: string;
  method?: string;
  value?: number | boolean;
  player_id?: string;
  seconds?: number;
  duration?: number;
  percent?: number;
  data?: {
    seconds?: number;
    duration?: number;
    percent?: number;
    volume?: number;
  };
};

function readPlaybackPosition(data: VimeoMessage) {
  const seconds = data.data?.seconds ?? data.seconds;
  const duration = data.data?.duration ?? data.duration;

  return {
    seconds: typeof seconds === "number" ? seconds : null,
    duration: typeof duration === "number" ? duration : null,
  };
}

function buildEmbedSrc(playerId: string) {
  const params = new URLSearchParams({
    h: HERO_VIMEO_HASH,
    api: "1",
    player_id: playerId,
    autoplay: "1",
    autopause: "0",
    title: "0",
    byline: "0",
    portrait: "0",
    badge: "0",
    dnt: "1",
    controls: "0",
    pip: "0",
    keyboard: "0",
  });

  return `${VIMEO_ORIGIN}/video/${HERO_VIMEO_VIDEO_ID}?${params.toString()}`;
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";

  const totalSeconds = Math.floor(seconds);
  const minutes = Math.floor(totalSeconds / 60);
  const remainder = totalSeconds % 60;

  return `${minutes}:${remainder.toString().padStart(2, "0")}`;
}

function clampVolume(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function HeroVideoPlayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerId = useId().replace(/:/g, "");
  const embedSrc = buildEmbedSrc(playerId);
  const listenersBoundRef = useRef(false);
  const isSeekingRef = useRef(false);
  const lastVolumeRef = useRef(DEFAULT_VOLUME);

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const postToPlayer = useCallback(
    (method: string, value?: string | number | boolean) => {
      const iframe = iframeRef.current;
      if (!iframe?.contentWindow) return;

      const payload: Record<string, string | number | boolean> = {
        method,
        player_id: playerId,
      };

      if (value !== undefined) payload.value = value;

      iframe.contentWindow.postMessage(JSON.stringify(payload), VIMEO_ORIGIN);
    },
    [playerId],
  );

  const bindPlayerListeners = useCallback(() => {
    if (listenersBoundRef.current) return;
    listenersBoundRef.current = true;

    for (const event of ["play", "pause", "ended", "timeupdate", "volumechange"] as const) {
      postToPlayer("addEventListener", event);
    }

    postToPlayer("getDuration");
    postToPlayer("getVolume");
    postToPlayer("getMuted");
  }, [postToPlayer]);

  const startPlaybackWithSound = useCallback(() => {
    bindPlayerListeners();
    postToPlayer("setMuted", false);
    postToPlayer("setVolume", DEFAULT_VOLUME);
    postToPlayer("play");
  }, [bindPlayerListeners, postToPlayer]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== VIMEO_ORIGIN || typeof event.data !== "string") return;

      try {
        const data = JSON.parse(event.data) as VimeoMessage;
        if (data.player_id && data.player_id !== playerId) return;

        if (data.event === "ready") {
          startPlaybackWithSound();
          return;
        }

        if (data.event === "play") {
          setIsPlaying(true);
          setHasStarted(true);
          return;
        }

        if (data.event === "pause") {
          setIsPlaying(false);
          return;
        }

        if (data.event === "ended") {
          setIsPlaying(false);
          return;
        }

        if (data.event === "timeupdate") {
          const { seconds, duration: nextDuration } = readPlaybackPosition(data);

          if (!isSeekingRef.current && seconds !== null) {
            setCurrentTime(seconds);
          }
          if (nextDuration !== null && nextDuration > 0) {
            setDuration(nextDuration);
          }
          return;
        }

        if (data.method === "getCurrentTime" && typeof data.value === "number") {
          if (!isSeekingRef.current) setCurrentTime(data.value);
          return;
        }

        if (data.event === "volumechange" && data.data) {
          if (typeof data.data.volume === "number") {
            const nextVolume = clampVolume(data.data.volume);
            setVolume(nextVolume);
            if (nextVolume > 0) lastVolumeRef.current = nextVolume;
          }
          return;
        }

        if (data.method === "getDuration" && typeof data.value === "number") {
          setDuration(data.value);
          return;
        }

        if (data.method === "getVolume" && typeof data.value === "number") {
          const nextVolume = clampVolume(data.value);
          setVolume(nextVolume);
          if (nextVolume > 0) lastVolumeRef.current = nextVolume;
          return;
        }

        if (data.method === "getMuted" && typeof data.value === "boolean") {
          setIsMuted(data.value);
        }
      } catch {
        // Ignore non-JSON Vimeo messages.
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [playerId, startPlaybackWithSound]);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  useEffect(() => {
    if (!hasStarted || !isPlaying) return;

    postToPlayer("getCurrentTime");
    const intervalId = window.setInterval(() => {
      postToPlayer("getCurrentTime");
    }, 250);

    return () => window.clearInterval(intervalId);
  }, [hasStarted, isPlaying, postToPlayer]);

  const handlePlay = useCallback(() => {
    startPlaybackWithSound();
    setHasStarted(true);
    setIsPlaying(true);
    setIsMuted(false);
    setVolume(DEFAULT_VOLUME);
  }, [startPlaybackWithSound]);

  const handleTogglePlay = useCallback(() => {
    bindPlayerListeners();
    if (isPlaying) {
      postToPlayer("pause");
      setIsPlaying(false);
      return;
    }

    startPlaybackWithSound();
    setHasStarted(true);
    setIsPlaying(true);
    setIsMuted(false);
    setVolume(DEFAULT_VOLUME);
  }, [bindPlayerListeners, isPlaying, postToPlayer, startPlaybackWithSound]);

  const handleSeek = useCallback(
    (nextTime: number) => {
      setCurrentTime(nextTime);
      postToPlayer("setCurrentTime", nextTime);
    },
    [postToPlayer],
  );

  const handleVolumeChange = useCallback(
    (nextVolume: number) => {
      const clamped = clampVolume(nextVolume);
      setVolume(clamped);
      setIsMuted(clamped === 0);
      if (clamped > 0) lastVolumeRef.current = clamped;
      postToPlayer("setVolume", clamped);
      postToPlayer("setMuted", clamped === 0);
    },
    [postToPlayer],
  );

  const handleToggleMute = useCallback(() => {
    bindPlayerListeners();

    if (isMuted || volume === 0) {
      const restored = lastVolumeRef.current > 0 ? lastVolumeRef.current : DEFAULT_VOLUME;
      setVolume(restored);
      setIsMuted(false);
      postToPlayer("setMuted", false);
      postToPlayer("setVolume", restored);
      return;
    }

    lastVolumeRef.current = volume > 0 ? volume : DEFAULT_VOLUME;
    setVolume(0);
    setIsMuted(true);
    postToPlayer("setMuted", true);
  }, [bindPlayerListeners, isMuted, postToPlayer, volume]);

  const handleToggleFullscreen = useCallback(async () => {
    const container = containerRef.current;
    if (!container) return;

    try {
      if (document.fullscreenElement === container) {
        await document.exitFullscreen();
        return;
      }

      await container.requestFullscreen();
    } catch {
      // Ignore unsupported fullscreen requests.
    }
  }, []);

  const progressPercent =
    duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;
  const volumePercent = Math.round(volume * 100);
  const effectiveVolume = isMuted ? 0 : volume;

  return (
    <div
      ref={containerRef}
      className={`${styles.videoEmbed} ${!hasStarted ? styles.videoEmbedIdle : ""} ${isFullscreen ? styles.videoEmbedFullscreen : ""}`}
    >
      <iframe
        ref={iframeRef}
        className={styles.video}
        title="Layer product overview"
        src={embedSrc}
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />

      {!hasStarted ? (
        <button
          type="button"
          className={styles.videoTapTarget}
          onClick={handlePlay}
          aria-label="Play product overview video"
        />
      ) : (
        <button
          type="button"
          className={styles.videoTapTarget}
          onClick={handleTogglePlay}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        />
      )}

      <div className={styles.videoControls} aria-label="Video controls">
          <button
            type="button"
            className={styles.controlButton}
            onClick={handleTogglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? (
              <Pause className={styles.controlIcon} aria-hidden />
            ) : (
              <Play className={styles.controlIcon} aria-hidden />
            )}
          </button>

          <div className={styles.progressWrap}>
            <div className={styles.progressTrack} aria-hidden>
              <div
                className={styles.progressFill}
                style={{ ["--hero-progress" as string]: `${progressPercent}%` }}
              />
            </div>
            <input
              type="range"
              className={styles.progressSlider}
              min={0}
              max={Math.max(duration, 0.1)}
              step={0.1}
              value={Math.min(currentTime, duration || currentTime)}
              onChange={(event) => handleSeek(Number(event.target.value))}
              onPointerDown={() => {
                isSeekingRef.current = true;
              }}
              onPointerUp={() => {
                isSeekingRef.current = false;
              }}
              onPointerCancel={() => {
                isSeekingRef.current = false;
              }}
              aria-label={`Video progress, ${formatTime(currentTime)} of ${formatTime(duration)}`}
            />
          </div>

          <span className={styles.timeDisplay} aria-hidden>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          <div className={styles.volumeGroup}>
            <button
              type="button"
              className={styles.controlButton}
              onClick={handleToggleMute}
              aria-label={isMuted || volume === 0 ? "Unmute video" : "Mute video"}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className={styles.controlIcon} aria-hidden />
              ) : (
                <Volume2 className={styles.controlIcon} aria-hidden />
              )}
            </button>

            <div className={styles.volumeWrap}>
              <div className={styles.volumeTrack} aria-hidden>
                <div
                  className={styles.volumeFill}
                  style={{ ["--hero-volume" as string]: `${effectiveVolume * 100}%` }}
                />
              </div>
              <input
                type="range"
                className={styles.volumeSlider}
                min={0}
                max={1}
                step={0.01}
                value={effectiveVolume}
                onChange={(event) => handleVolumeChange(Number(event.target.value))}
                aria-label={`Volume, ${volumePercent} percent`}
              />
            </div>
          </div>

          <button
            type="button"
            className={styles.controlButton}
            onClick={handleToggleFullscreen}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? (
              <Minimize className={styles.controlIcon} aria-hidden />
            ) : (
              <Maximize className={styles.controlIcon} aria-hidden />
            )}
          </button>
      </div>
    </div>
  );
}
