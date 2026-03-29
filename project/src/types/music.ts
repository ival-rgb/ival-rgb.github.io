export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number; // in seconds
  url: string;
}

export interface PlayerState {
  currentTrackIndex: number;
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  isMuted: boolean;
}