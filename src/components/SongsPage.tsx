'use client';

import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Search, ChevronLeft, Music, Play, Pause, SkipBack, SkipForward,
  ExternalLink, Volume2, VolumeX, ListMusic
} from 'lucide-react';
import { songs } from '@/lib/data';

function formatTime(seconds: number): string {
  if (isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function SongsPage() {
  const [search, setSearch] = useState('');
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return songs;
    const q = search.toLowerCase();
    return songs.filter(s => s.Name.toLowerCase().includes(q));
  }, [search]);

  // Reset current track when search changes and it no longer matches
  useEffect(() => {
    if (currentIndex !== null && currentIndex >= filtered.length) {
      setCurrentIndex(null);
      setIsPlaying(false);
    }
  }, [filtered.length, currentIndex]);

  const currentSong = currentIndex !== null ? filtered[currentIndex] : null;

  // Play a song by index
  const playSong = useCallback((index: number) => {
    if (index < 0 || index >= filtered.length) return;
    setCurrentIndex(index);
    setIsPlaying(true);
  }, [filtered.length]);

  // Handle audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || currentIndex === null || !currentSong) return;

    audio.src = currentSong.src;
    audio.volume = isMuted ? 0 : volume;

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      // Auto-play next
      if (currentIndex < filtered.length - 1) {
        playSong(currentIndex + 1);
      } else {
        setIsPlaying(false);
        setCurrentTime(0);
      }
    };
    const onError = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('durationchange', onDurationChange);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('durationchange', onDurationChange);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [currentIndex, currentSong, isPlaying, volume, isMuted, filtered.length, playSong]);

  // Sync play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || currentIndex === null) return;
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying, currentIndex]);

  const togglePlay = () => {
    if (currentIndex === null && filtered.length > 0) {
      playSong(0);
    } else {
      setIsPlaying(prev => !prev);
    }
  };

  const playNext = () => {
    if (currentIndex === null) return;
    const next = (currentIndex + 1) % filtered.length;
    playSong(next);
  };

  const playPrev = () => {
    if (currentIndex === null) return;
    const prev = (currentIndex - 1 + filtered.length) % filtered.length;
    playSong(prev);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !progressRef.current || !duration) return;
    const rect = progressRef.current.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * duration;
    setCurrentTime(ratio * duration);
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) audioRef.current.volume = val;
    setIsMuted(false);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="min-h-screen pt-24 pb-32">
      {/* Hidden audio element */}
      <audio ref={audioRef} preload="metadata" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-white/40 hover:text-white/70 transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white flex items-center gap-3">
              <Music className="w-8 h-8 text-rose-400" />
              Songs
            </h1>
            <p className="text-white/50 mt-1">Music and audio collection</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search songs..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/20 transition-all"
            />
          </div>
        </div>
        <div className="text-sm text-white/40 mt-4">{filtered.length} songs</div>
      </div>

      {/* Songs Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-white/40">No songs found</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((song, i) => {
              const isCurrentTrack = currentIndex === i;
              return (
                <button
                  key={song.id}
                  onClick={() => {
                    if (isCurrentTrack) {
                      togglePlay();
                    } else {
                      playSong(i);
                    }
                  }}
                  className={`group relative glass rounded-xl p-5 text-left transition-all duration-300 hover:scale-[1.02] ${
                    isCurrentTrack
                      ? 'bg-rose-500/10 border-rose-500/30 ring-1 ring-rose-500/30'
                      : 'hover:bg-white/[0.06]'
                  }`}
                  style={{ animationDelay: `${(i % 6) * 100}ms` }}
                >
                  <div className="flex items-center gap-4">
                    {/* Album art placeholder / Play button */}
                    <div className={`relative w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isCurrentTrack && isPlaying
                        ? 'bg-rose-500/20'
                        : 'bg-white/5 group-hover:bg-rose-500/10'
                    }`}>
                      {isCurrentTrack && isPlaying ? (
                        <div className="flex items-end gap-0.5 h-6">
                          <span className="w-1 bg-rose-400 rounded-full animate-equalizer-1" />
                          <span className="w-1 bg-rose-400 rounded-full animate-equalizer-2" />
                          <span className="w-1 bg-rose-400 rounded-full animate-equalizer-3" />
                          <span className="w-1 bg-rose-400 rounded-full animate-equalizer-4" />
                        </div>
                      ) : (
                        <Play className={`w-6 h-6 transition-colors ${
                          isCurrentTrack ? 'text-rose-400 fill-rose-400' : 'text-white/40 group-hover:text-rose-400'
                        }`} />
                      )}
                    </div>

                    {/* Song info */}
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold truncate transition-colors ${
                        isCurrentTrack ? 'text-rose-300' : 'text-white group-hover:text-rose-300'
                      }`}>
                        {song.Name}
                      </h3>
                      <p className="text-xs text-white/30 mt-1 truncate">
                        {song.src.split('/').pop()?.replace(/%20/g, ' ') || 'Audio track'}
                      </p>
                    </div>

                    {/* Source link */}
                    <a
                      href={song.data}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="shrink-0 p-2 rounded-lg text-white/20 hover:text-white/60 hover:bg-white/5 transition-all"
                      title="View on GitHub"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Progress bar for currently playing */}
                  {isCurrentTrack && (
                    <div className="mt-3 h-1 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-rose-400 to-rose-500 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Sticky Now Playing Bar */}
      {currentSong && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-xl border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            {/* Progress bar (clickable) */}
            <div
              ref={progressRef}
              onClick={handleProgressClick}
              className="absolute top-0 left-0 right-0 h-1 bg-white/5 cursor-pointer group/progress hover:h-1.5 transition-all"
            >
              <div
                className="h-full bg-gradient-to-r from-rose-400 to-rose-500 relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-rose-400 shadow-lg shadow-rose-500/50 opacity-0 group-hover/progress:opacity-100 transition-opacity" />
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              {/* Left: Song info */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-10 h-10 rounded-lg bg-rose-500/20 flex items-center justify-center shrink-0">
                  {isPlaying ? (
                    <div className="flex items-end gap-[2px] h-4">
                      <span className="w-0.5 bg-rose-400 rounded-full animate-equalizer-1" />
                      <span className="w-0.5 bg-rose-400 rounded-full animate-equalizer-2" />
                      <span className="w-0.5 bg-rose-400 rounded-full animate-equalizer-3" />
                    </div>
                  ) : (
                    <Music className="w-5 h-5 text-rose-400" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">{currentSong.Name}</p>
                  <p className="text-xs text-white/40 truncate">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </p>
                </div>
              </div>

              {/* Center: Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={playPrev}
                  className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all"
                  title="Previous"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  onClick={togglePlay}
                  className="p-3 rounded-full bg-rose-500 hover:bg-rose-400 text-white transition-all hover:scale-105 active:scale-95 shadow-lg shadow-rose-500/25"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  onClick={playNext}
                  className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all"
                  title="Next"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              {/* Right: Volume & source */}
              <div className="flex items-center gap-3 flex-1 justify-end">
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 accent-rose-400"
                  title="Volume"
                />
                <a
                  href={currentSong.data}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white/60 text-xs transition-all"
                >
                  <ExternalLink className="w-3 h-3" />
                  Source
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS for equalizer animation */}
      <style jsx>{`
        @keyframes equalizer-1 {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        @keyframes equalizer-2 {
          0%, 100% { height: 12px; }
          50% { height: 6px; }
        }
        @keyframes equalizer-3 {
          0%, 100% { height: 8px; }
          50% { height: 18px; }
        }
        @keyframes equalizer-4 {
          0%, 100% { height: 14px; }
          50% { height: 4px; }
        }
        :global(.animate-equalizer-1) { animation: equalizer-1 0.8s ease-in-out infinite; }
        :global(.animate-equalizer-2) { animation: equalizer-2 0.6s ease-in-out infinite; }
        :global(.animate-equalizer-3) { animation: equalizer-3 0.7s ease-in-out infinite; }
        :global(.animate-equalizer-4) { animation: equalizer-4 0.9s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
