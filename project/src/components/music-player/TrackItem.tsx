"use client";

import { cn } from "@/lib/utils";
import { Track } from "@/types/music";

interface TrackItemProps {
  track: Track;
  index: number;
  isActive: boolean;
  isPlaying: boolean;
  onClick: () => void;
  isSpaceMode?: boolean;
}

export function TrackItem({ track, isActive, onClick, isSpaceMode }: TrackItemProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "group w-full flex items-center justify-between py-2.5 px-2 transition-all duration-200 border-none bg-transparent outline-none",
        isActive 
          ? "opacity-100" 
          : "opacity-40 hover:opacity-100"
      )}
    >
      <div className="flex flex-col text-left overflow-hidden">
        <h4 className={cn(
          "text-sm font-bold leading-tight truncate",
          isSpaceMode ? 'text-white' : (isActive ? "text-black" : "text-black/80")
        )}>
          {track.title}
        </h4>
      </div>

      <div className={cn(
        "text-[11px] font-bold font-mono shrink-0 ml-4 transition-colors",
        isSpaceMode ? "text-white/30 group-hover:text-white/50" : "text-black/20 group-hover:text-black/30"
      )}>
        {formatTime(track.duration)}
      </div>
    </button>
  );
}
