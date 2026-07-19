"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { PLAYLIST, type Song } from "@/lib/music";

function SvgPlay() {
  return (
    <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function SvgPause() {
  return (
    <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}

function SvgPrev() {
  return (
    <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
    </svg>
  );
}

function SvgNext() {
  return (
    <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
    </svg>
  );
}

function SvgPlaylist() {
  return (
    <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h12m-12 3.75h7.5" />
    </svg>
  );
}

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Pre-check which songs exist on mount
  useEffect(() => {
    const checks = PLAYLIST.map((song) =>
      fetch(song.file, { method: "HEAD" })
        .then((r) => (r.ok ? song : null))
        .catch(() => null)
    );
    Promise.all(checks).then((results) => {
      const available = results.filter(Boolean) as Song[];
      setSongs(available);
      if (available.length > 0) setLoaded(true);
    });
  }, []);

  const current = songs[currentIndex] ?? null;

  const play = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    a.play().catch(() => setIsPlaying(false));
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % songs.length);
  }, [songs.length]);

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + songs.length) % songs.length);
  }, [songs.length]);

  // Auto-play next when current ends
  const handleEnded = useCallback(() => {
    if (songs.length > 1) next();
  }, [songs.length, next]);

  // Play when song changes
  useEffect(() => {
    const a = audioRef.current;
    if (!a || !current) return;
    a.load();
    const onCanPlay = () => {
      a.play().catch(() => {});
      setIsPlaying(true);
    };
    a.addEventListener("canplay", onCanPlay, { once: true });
    return () => a.removeEventListener("canplay", onCanPlay);
  }, [currentIndex, current]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === "Space" && songs.length > 0) {
        e.preventDefault();
        isPlaying ? pause() : play();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isPlaying, play, pause, songs.length]);

  if (!loaded || songs.length === 0) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-4">
      <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-950/70 backdrop-blur-sm p-3">
        {/* Main bar */}
        <div className="flex items-center gap-3">
          {/* Spinning vinyl record */}
          <div className="hidden sm:flex size-12 shrink-0 relative">
            <div className="size-full rounded-full bg-neutral-800 dark:bg-neutral-700 flex items-center justify-center shadow-lg animate-spin" style={{ animationDuration: "10s", animationPlayState: isPlaying ? "running" : "paused" }}>
              {/* Grooves */}
              <div className="absolute inset-1 rounded-full border border-neutral-700/50 dark:border-neutral-600/50" />
              <div className="absolute inset-2.5 rounded-full border border-neutral-700/50 dark:border-neutral-600/50" />
              <div className="absolute inset-4 rounded-full border border-neutral-700/50 dark:border-neutral-600/50" />
              {/* Center image */}
              <div className="relative size-7 rounded-full overflow-hidden ring-2 ring-neutral-600 dark:ring-neutral-500">
                <img
                  src="/AnonBlog/images/anon.png"
                  alt="cover"
                  className="size-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Song info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {current?.title ?? "No track"}
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
              MyGO!!!!! · 迷跡波
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={prev}
              disabled={songs.length <= 1}
              className="p-1.5 rounded text-foreground hover:bg-neutral-200 dark:hover:bg-neutral-800 disabled:opacity-30 transition-colors cursor-pointer"
              aria-label="Previous"
            >
              <SvgPrev />
            </button>
            <button
              onClick={isPlaying ? pause : play}
              className="p-1.5 rounded text-foreground hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <SvgPause /> : <SvgPlay />}
            </button>
            <button
              onClick={next}
              disabled={songs.length <= 1}
              className="p-1.5 rounded text-foreground hover:bg-neutral-200 dark:hover:bg-neutral-800 disabled:opacity-30 transition-colors cursor-pointer"
              aria-label="Next"
            >
              <SvgNext />
            </button>
          </div>

          {/* Playlist toggle */}
          <button
            onClick={() => setShowPlaylist((v) => !v)}
            className="p-1.5 rounded text-neutral-500 hover:text-foreground hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Toggle playlist"
          >
            <SvgPlaylist />
          </button>
        </div>

        {/* Playlist dropdown */}
        {showPlaylist && (
          <div className="mt-2 border-t border-neutral-200 dark:border-neutral-800 pt-2 max-h-56 overflow-y-auto">
            {songs.map((s, i) => (
              <button
                key={s.file}
                onClick={() => {
                  setCurrentIndex(i);
                  setShowPlaylist(false);
                }}
                className={`w-full text-left px-2 py-1.5 rounded text-sm truncate transition-colors cursor-pointer ${
                  i === currentIndex
                    ? "text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-950/30"
                    : "text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800"
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>
        )}
      </div>

      <audio ref={audioRef} preload="none" onEnded={handleEnded}>
        {current && <source src={current.file} type="audio/mpeg" />}
      </audio>
    </div>
  );
}
