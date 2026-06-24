"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import { Maximize, Minimize, Pause, Play, Volume2, VolumeX } from "lucide-react";
import styles from "./landing-hero-section.module.css";

const HERO_VIMEO_VIDEO_ID = "1203910576";
const HERO_VIMEO_APP_ID = "58479";
const DEFAULT_VOLUME = 1;
const HERO_VIMEO_THUMBNAIL =
  "https://i.vimeocdn.com/video/2172120547-38aff336eae8b511d5b9968c513e878d691e974960154410a6a1cc8b575c5971-d_1920x1080?region=us";
const SYNC_INTERVAL_MS = 250;
const AUTOPLAY_RETRY_DELAYS_MS = [0, 150, 400, 800, 1500, 2500] as const;

const EMBED_SRC = (() => {
  const params = new URLSearchParams({
    badge: "0",
    autopause: "0",
    autoplay: "1",
    muted: "1",
    app_id: HERO_VIMEO_APP_ID,
    playsinline: "1",
    title: "0",
    byline: "0",
    portrait: "0",
    controls: "0",
    pip: "0",
    keyboard: "0",
  });

  return `https://player.vimeo.com/video/${HERO_VIMEO_VIDEO_ID}?${params.toString()}`;
})();

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
  const playerRef = useRef<Player | null>(null);
  const isSeekingRef = useRef(false);
  const lastVolumeRef = useRef(DEFAULT_VOLUME);
  const soundUnlockedRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showPoster, setShowPoster] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isVideoHovered, setIsVideoHovered] = useState(false);

  const syncPlayerState = useCallback(async (player: Player) => {
    try {
      const [paused, seconds, videoDuration, nextVolume, muted] = await Promise.all([
        player.getPaused(),
        player.getCurrentTime(),
        player.getDuration(),
        player.getVolume(),
        player.getMuted(),
      ]);

      setIsPlaying(!paused);
      if (!isSeekingRef.current) setCurrentTime(seconds);
      if (videoDuration > 0) setDuration(videoDuration);

      const clampedVolume = clampVolume(nextVolume);
      setVolume(clampedVolume);
      setIsMuted(muted);
      if (clampedVolume > 0 && !muted) lastVolumeRef.current = clampedVolume;
    } catch {
      // Player may be destroyed during async reads.
    }
  }, []);

  const ensureMutedAutoplay = useCallback(async (player: Player) => {
    try {
      await player.setMuted(true);
      await player.setVolume(DEFAULT_VOLUME);

      if (await player.getPaused()) {
        await player.play();
      }

      if (!(await player.getPaused())) {
        setIsPlaying(true);
        setIsMuted(true);
        setShowPoster(false);
        return true;
      }
    } catch {
      // Retry via scheduled attempts.
    }

    return false;
  }, []);

  const unlockSound = useCallback(async (player: Player) => {
    if (soundUnlockedRef.current) return;

    try {
      await player.setVolume(DEFAULT_VOLUME);
      await player.setMuted(false);

      soundUnlockedRef.current = true;
      setVolume(DEFAULT_VOLUME);
      setIsMuted(false);
      lastVolumeRef.current = DEFAULT_VOLUME;
    } catch {
      // Ignore volume errors.
    }
  }, []);

  const handleContainerClick = useCallback(async () => {
    const player = playerRef.current;
    if (!player) return;

    try {
      await unlockSound(player);

      if (await player.getPaused()) {
        await player.play();
      }

      setIsPlaying(true);
      setShowPoster(false);
    } catch {
      // Ignore playback errors.
    }
  }, [unlockSound]);

  const handleTogglePlay = useCallback(async () => {
    const player = playerRef.current;
    if (!player) return;

    try {
      await unlockSound(player);

      const paused = await player.getPaused();
      if (paused) {
        await player.play();
        setIsPlaying(true);
        setShowPoster(false);
      } else {
        await player.pause();
        setIsPlaying(false);
      }
    } catch {
      // Ignore playback errors.
    }
  }, [unlockSound]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let cancelled = false;
    let syncIntervalId = 0;
    const retryTimeouts: number[] = [];

    let player = playerRef.current;
    if (!player) {
      player = new Player(iframe);
      playerRef.current = player;
    }

    const onPlay = () => {
      setIsPlaying(true);
      setShowPoster(false);
    };
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);
    const onTimeUpdate = (data: { seconds: number; duration: number }) => {
      if (!isSeekingRef.current) setCurrentTime(data.seconds);
      if (data.duration > 0) setDuration(data.duration);
    };
    const onVolumeChange = (data: { volume: number }) => {
      const nextVolume = clampVolume(data.volume);
      setVolume(nextVolume);
      if (nextVolume > 0) lastVolumeRef.current = nextVolume;
    };

    player.off("play");
    player.off("pause");
    player.off("ended");
    player.off("timeupdate");
    player.off("volumechange");
    player.on("play", onPlay);
    player.on("pause", onPause);
    player.on("ended", onEnded);
    player.on("timeupdate", onTimeUpdate);
    player.on("volumechange", onVolumeChange);

    const init = async () => {
      try {
        await player!.ready();
        if (cancelled) return;

        setShowPoster(false);

        for (const delay of AUTOPLAY_RETRY_DELAYS_MS) {
          const timeoutId = window.setTimeout(() => {
            if (cancelled) return;
            void ensureMutedAutoplay(player!);
          }, delay);
          retryTimeouts.push(timeoutId);
        }

        await ensureMutedAutoplay(player!);
        await syncPlayerState(player!);

        syncIntervalId = window.setInterval(() => {
          if (cancelled || !playerRef.current) return;
          void syncPlayerState(playerRef.current);
        }, SYNC_INTERVAL_MS);
      } catch (error) {
        console.error("Hero video player failed to initialize", error);
        if (!cancelled) setShowPoster(false);
      }
    };

    void init();

    return () => {
      cancelled = true;
      for (const timeoutId of retryTimeouts) window.clearTimeout(timeoutId);
      if (syncIntervalId) window.clearInterval(syncIntervalId);
    };
  }, [ensureMutedAutoplay, syncPlayerState]);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const handleSeek = useCallback(async (nextTime: number) => {
    const player = playerRef.current;
    setCurrentTime(nextTime);
    setShowPoster(false);

    if (!player) return;

    try {
      await player.setCurrentTime(nextTime);
    } catch {
      // Ignore seek errors.
    }
  }, []);

  const handleVolumeChange = useCallback(async (nextVolume: number) => {
    const player = playerRef.current;
    const clamped = clampVolume(nextVolume);

    setVolume(clamped);
    setIsMuted(clamped === 0);
    if (clamped > 0) {
      lastVolumeRef.current = clamped;
      soundUnlockedRef.current = true;
    }

    if (!player) return;

    try {
      await player.setVolume(clamped);
      await player.setMuted(clamped === 0);
    } catch {
      // Ignore volume errors.
    }
  }, []);

  const handleToggleMute = useCallback(async () => {
    const player = playerRef.current;
    if (!player) return;

    if (isMuted || volume === 0) {
      await unlockSound(player);
      return;
    }

    lastVolumeRef.current = volume > 0 ? volume : DEFAULT_VOLUME;
    setVolume(0);
    setIsMuted(true);

    try {
      await player.setMuted(true);
    } catch {
      // Ignore volume errors.
    }
  }, [isMuted, unlockSound, volume]);

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
      className={`${styles.videoEmbed} ${isFullscreen ? styles.videoEmbedFullscreen : ""} ${isVideoHovered ? styles.videoEmbedControlsVisible : ""}`}
      onMouseEnter={() => setIsVideoHovered(true)}
      onMouseLeave={() => setIsVideoHovered(false)}
      onFocusCapture={() => setIsVideoHovered(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsVideoHovered(false);
        }
      }}
      onClick={() => {
        void handleContainerClick();
      }}
    >
      <iframe
        ref={iframeRef}
        className={styles.video}
        title="Layer - Agents for revenue teams | www.withlayer.ai"
        src={EMBED_SRC}
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />

      {showPoster ? (
        <img
          className={styles.videoPoster}
          src={HERO_VIMEO_THUMBNAIL}
          alt=""
          draggable={false}
        />
      ) : null}

      <button
        type="button"
        className={styles.videoTapTarget}
        onClick={(event) => {
          event.stopPropagation();
          void handleTogglePlay();
        }}
        aria-label={isPlaying ? "Pause video" : "Play video"}
      />

      <div
        className={styles.videoControls}
        aria-label="Video controls"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className={styles.controlButton}
          onClick={() => {
            void handleTogglePlay();
          }}
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
            onChange={(event) => {
              void handleSeek(Number(event.target.value));
            }}
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
            onClick={() => {
              void handleToggleMute();
            }}
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
              onChange={(event) => {
                void handleVolumeChange(Number(event.target.value));
              }}
              aria-label={`Volume, ${volumePercent} percent`}
            />
          </div>
        </div>

        <button
          type="button"
          className={styles.controlButton}
          onClick={() => {
            void handleToggleFullscreen();
          }}
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
