'use client';

import Image from 'next/image';
import { Slider } from '@/components/ui/slider';
import { Track } from '@/types/music';
import { Play, Pause, SkipBack, SkipForward, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExpandedPlayerProps {
  track: Track;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  currentTime: number;
  duration: number;
  onSeek: (value: number) => void;
  onClose: () => void;
  albumArtUrl?: string;
  isSpaceMode?: boolean;
}

export function ExpandedPlayer({
  track,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  currentTime,
  duration,
  onSeek,
  onClose,
  albumArtUrl,
  isSpaceMode,
}: ExpandedPlayerProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatRemainingTime = (seconds: number, total: number) => {
    const remaining = total - seconds;
    const mins = Math.floor(remaining / 60);
    const secs = Math.floor(remaining % 60);
    return `-${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={cn(
        'fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in',
        isSpaceMode
          ? 'bg-transparent backdrop-blur-sm'
          : 'bg-[#F0F4F0]/80 backdrop-blur-sm'
      )}>
      <div
        className={cn(
          'w-full max-w-sm rounded-3xl border-2 overflow-hidden transition-all duration-500',
          isSpaceMode
            ? 'bg-transparent border-white/20 shadow-none'
            : 'bg-[#F4E1E6] border-black/10 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.05)]'
        )}>
        <div
          className={cn(
            'relative flex items-center p-4 border-b',
            isSpaceMode ? 'border-white/10' : 'border-black/5 bg-white/20'
          )}>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={onClose}
              className="w-3.5 h-3.5 rounded-full bg-[#FFB3B3] border border-black/5 hover:brightness-90 transition-all flex items-center justify-center">
              <X className="w-2.5 h-2.5 text-black/40" />
            </button>
            <div className="w-3 h-3 rounded-full bg-[#FFD9B3] border border-black/5" />
            <div className="w-3 h-3 rounded-full bg-[#B3FFB3] border border-black/5" />
          </div>
          <div
            className={cn(
              'absolute left-1/2 -translate-x-1/2 text-xs font-bold uppercase tracking-[0.2em]',
              isSpaceMode ? 'text-white/40' : 'text-black/30'
            )}>
            miniplayer
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div
            className={cn(
              'relative aspect-square w-full rounded-2xl border-2 overflow-hidden',
              isSpaceMode
                ? 'bg-transparent border-transparent'
                : 'bg-white border-black/5 shadow-md'
            )}>
            <Image
              src={albumArtUrl || 'https://picsum.photos/seed/music/800/800'}
              alt="Album Art"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-1 text-center">
            <h2
              className={cn(
                'text-xl font-bold leading-tight',
                isSpaceMode ? 'text-white' : 'text-black'
              )}>
              {track.title}
            </h2>
            <p
              className={cn(
                'text-sm font-medium uppercase tracking-wide',
                isSpaceMode ? 'text-white/50' : 'text-black/40'
              )}>
              {track.artist}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Slider
                value={[currentTime]}
                max={duration}
                step={1}
                onValueChange={val => onSeek(val[0])}
                className="h-2 cursor-pointer"
                isSpaceMode={isSpaceMode}
              />
              <div
                className={cn(
                  'flex justify-between text-[11px] font-bold font-mono tracking-tighter',
                  isSpaceMode ? 'text-white/40' : 'text-black/30'
                )}>
                <span>{formatTime(currentTime)}</span>
                <span>{formatRemainingTime(currentTime, duration)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-10">
              <button
                onClick={onPrevious}
                className={cn(
                  'transition-colors',
                  isSpaceMode
                    ? 'text-white/40 hover:text-white'
                    : 'text-black/30 hover:text-black/60'
                )}>
                <SkipBack className="w-6 h-6 fill-current" />
              </button>

              <button
                onClick={onPlayPause}
                className={cn(
                  'w-14 h-14 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md group',
                  isSpaceMode
                    ? 'bg-white/10 border-2 border-white/20'
                    : 'bg-white border-2 border-black/5'
                )}>
                {isPlaying ? (
                  <Pause
                    className={cn(
                      'w-6 h-6 fill-current',
                      isSpaceMode
                        ? 'text-white/80 group-hover:text-white'
                        : 'text-black/60 group-hover:text-black'
                    )}
                  />
                ) : (
                  <Play
                    className={cn(
                      'w-6 h-6 fill-current translate-x-0.5',
                      isSpaceMode
                        ? 'text-white/80 group-hover:text-white'
                        : 'text-black/60 group-hover:text-black'
                    )}
                  />
                )}
              </button>

              <button
                onClick={onNext}
                className={cn(
                  'transition-colors',
                  isSpaceMode
                    ? 'text-white/40 hover:text-white'
                    : 'text-black/30 hover:text-black/60'
                )}>
                <SkipForward className="w-6 h-6 fill-current" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
