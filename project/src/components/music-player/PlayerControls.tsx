"use client";

import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import { Track } from "@/types/music";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlayerControlsProps {
  track: Track;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  currentTime: number;
  duration: number;
  onSeek: (value: number) => void;
  onExpand: () => void;
  albumArtUrl?: string;
  isSpaceMode?: boolean;
}

export function PlayerControls({
  track,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  currentTime,
  duration,
  onSeek,
  onExpand,
  albumArtUrl,
  isSpaceMode,
}: PlayerControlsProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-lg z-50 px-4">
      <div 
        onClick={onExpand}
        className={cn(
          "cursor-pointer group animate-fade-in rounded-2xl border-2 border-black/10 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] overflow-hidden transition-transform hover:scale-[1.01] active:scale-[0.99]",
          isSpaceMode ? "bg-white" : "bg-[#F4E1E6]"
        )}
      >
        {/* Mac Window Controls (Mini Strip) */}
        <div className="flex gap-1 p-1.5 px-3 border-b border-black/5 bg-white/10">
          <div className="w-2 h-2 rounded-full bg-[#FFB3B3] border border-black/5" />
          <div className="w-2 h-2 rounded-full bg-[#FFD9B3] border border-black/5" />
          <div className="w-2 h-2 rounded-full bg-[#B3FFB3] border border-black/5" />
        </div>

        <div className="p-4 flex items-center gap-6">
          {/* Left: Song Details */}
          <div className="flex items-center gap-4 min-w-[140px] max-w-[200px]">
            <div className="relative w-12 h-12 rounded-xl border-2 border-black/5 overflow-hidden shadow-sm bg-white shrink-0">
              <Image
                src={albumArtUrl || "https://picsum.photos/seed/history-ost/200/200"}
                alt="Album Art"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-bold text-black/80 truncate">
                {track.title}
              </span>
              <span className="text-[10px] text-black/50 font-medium truncate uppercase tracking-wider">
                {track.artist}
              </span>
            </div>
          </div>

          {/* Right: Progress & Controls Column */}
          <div className="flex-1 flex flex-col gap-3" onClick={(e) => e.stopPropagation()}>
            {/* Progress Row */}
            <div className="flex items-center gap-3 px-1">
              <span className="text-[10px] font-bold text-black/30 font-mono shrink-0">
                {formatTime(currentTime)}
              </span>
              <Slider
                value={[currentTime]}
                max={duration}
                step={1}
                onValueChange={(val) => onSeek(val[0])}
                className="cursor-pointer"
              />
              <span className="text-[10px] font-bold text-black/30 font-mono shrink-0">
                {formatTime(duration)}
              </span>
            </div>

            {/* Controls Row - Centered under progress */}
            <div className="flex items-center justify-center gap-8">
              <button
                onClick={onPrevious}
                className="p-1 text-black/30 hover:text-black/60 transition-colors"
              >
                <SkipBack className="w-4 h-4 fill-current" />
              </button>
              
              <button
                onClick={onPlayPause}
                className="w-9 h-9 bg-white rounded-full border-2 border-black/5 flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-sm"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-black/60 fill-current" />
                ) : (
                  <Play className="w-4 h-4 text-black/60 fill-current translate-x-0.5" />
                )}
              </button>

              <button
                onClick={onNext}
                className="p-1 text-black/30 hover:text-black/60 transition-colors"
              >
                <SkipForward className="w-4 h-4 fill-current" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
