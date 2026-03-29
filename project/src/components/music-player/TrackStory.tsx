"use client";

import { useEffect, useState } from "react";
import { generateTrackDescription } from "@/ai/flows/generate-track-description";
import { Sparkles } from "lucide-react";

interface TrackStoryProps {
  trackTitle: string;
}

export function TrackStory({ trackTitle }: TrackStoryProps) {
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchDescription() {
      setLoading(true);
      try {
        const result = await generateTrackDescription({ trackTitle });
        setDescription(result.description);
      } catch (error) {
        console.error("Failed to generate description", error);
        setDescription("A magical tune that warms the heart.");
      } finally {
        setLoading(false);
      }
    }

    fetchDescription();
  }, [trackTitle]);

  return (
    <div className="mt-4 p-4 rounded-2xl bg-accent/50 border border-secondary/20 animate-fade-in">
      <div className="flex items-center gap-2 mb-2 text-secondary font-semibold text-sm">
        <Sparkles className="w-4 h-4" />
        <span>Vibe Check</span>
      </div>
      <p className="text-muted-foreground text-sm italic leading-relaxed">
        {loading ? (
          <span className="animate-pulse">Whispering to the forest spirits...</span>
        ) : (
          description
        )}
      </p>
    </div>
  );
}