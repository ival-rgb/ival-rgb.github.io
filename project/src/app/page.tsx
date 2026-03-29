'use client';

import { useState, useEffect, useRef } from 'react';
import { ALBUM_TRACKS } from '@/lib/constants';
import { PlayerControls } from '@/components/music-player/PlayerControls';
import { ExpandedPlayer } from '@/components/music-player/ExpandedPlayer';
import { TrackItem } from '@/components/music-player/TrackItem';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';
import StarryBackground from '@/components/special/StarryBackground';

export default function MelodyGrovePlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSpaceMode, setIsSpaceMode] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = ALBUM_TRACKS[currentTrackIndex];
  const albumArt = PlaceHolderImages.find(img => img.id === 'album-art');

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.play().catch(e => console.error('Error playing audio: ', e));
        setIsSpaceMode(true);
      } else {
        audio.pause();
        setIsSpaceMode(false);
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.src = currentTrack.url;
      setCurrentTime(0);
      if (isPlaying) {
        audio.play().catch(e => console.error('Error playing audio: ', e));
      }
    }
  }, [currentTrackIndex]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrackIndex(prev => (prev + 1) % ALBUM_TRACKS.length);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    setCurrentTrackIndex(
      prev => (prev - 1 + ALBUM_TRACKS.length) % ALBUM_TRACKS.length
    );
    setIsPlaying(true);
  };

  const handleTrackSelect = (index: number) => {
    if (index === currentTrackIndex) {
      handlePlayPause();
    } else {
      setCurrentTrackIndex(index);
      setIsPlaying(true);
    }
  };

  const onSeek = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleTrackEnded = () => {
    handleNext();
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 pb-48 font-body selection:bg-primary/30 overflow-x-hidden relative transition-colors duration-1000`}
      style={isSpaceMode ? { backgroundColor: '#0a061d', color: 'white' } : { backgroundColor: '#FAF9FA' }}
    >
      {isSpaceMode && <StarryBackground />}
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTrackEnded}
        preload="metadata"
      />

      {!isExpanded && (
        <div
          className={`w-full max-w-sm rounded-3xl border-2 overflow-hidden animate-fade-in ${
            isSpaceMode
              ? 'bg-transparent border-transparent shadow-none'
              : 'bg-white border-black/5 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.03)]'
          }`}>
          <div
            className={`flex items-center p-4 border-b ${
              isSpaceMode
                ? 'border-white/10 bg-transparent'
                : 'border-black/5 bg-[#F9F9F9]'
            }`}>
            <div className="flex gap-2 shrink-0">
              <div className="w-3 h-3 rounded-full bg-[#FFB3B3] border border-black/5" />
              <div className="w-3 h-3 rounded-full bg-[#FFD9B3] border border-black/5" />
              <div className="w-3 h-3 rounded-full bg-[#B3FFB3] border border-black/5" />
            </div>
            <span
              className={`ml-4 text-[10px] font-bold uppercase tracking-[0.2em] ${
                isSpaceMode ? 'text-white/30' : 'text-black/30'
              }`}>
              history ost
            </span>
          </div>

          <div className="p-6">
            <div
              className={`relative aspect-square w-full mb-6 rounded-2xl border-2 overflow-hidden ${
                isSpaceMode
                  ? 'bg-transparent border-transparent'
                  : 'bg-white border-black/5 shadow-sm'
              }`}>
              <Image
                src={albumArt?.imageUrl || 'https://picsum.photos/seed/history-ost/600/600'}
                alt="history ost Album Art"
                fill
                className="object-cover"
                data-ai-hint={albumArt?.imageHint}
              />
            </div>

            <div className="pr-1">
              <ScrollArea className="h-48 pr-3 custom-scrollbar">
                <div className="space-y-0">
                  {ALBUM_TRACKS.map((track, index) => (
                    <TrackItem
                      key={track.id}
                      track={track}
                      index={index}
                      isActive={currentTrackIndex === index}
                      isPlaying={isPlaying}
                      onClick={() => handleTrackSelect(index)}
                      isSpaceMode={isSpaceMode}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      )}

      {isExpanded && (
        <ExpandedPlayer
          track={currentTrack}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrevious={handlePrevious}
          currentTime={currentTime}
          duration={currentTrack.duration}
          onSeek={onSeek}
          onClose={() => setIsExpanded(false)}
          albumArtUrl={albumArt?.imageUrl}
          isSpaceMode={isSpaceMode}
        />
      )}

      {!isExpanded && (
        <PlayerControls
          track={currentTrack}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrevious={handlePrevious}
          currentTime={currentTime}
          duration={currentTrack.duration}
          onSeek={onSeek}
          onExpand={() => setIsExpanded(true)}
          albumArtUrl={albumArt?.imageUrl}
          isSpaceMode={isSpaceMode}
        />
      )}
    </div>
  );
}
