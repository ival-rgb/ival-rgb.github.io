'use server';
/**
 * @fileOverview An AI agent that generates whimsical, short descriptive snippets or 'mood tags' for music tracks.
 *
 * - generateTrackDescription - A function that handles the generation process.
 * - GenerateTrackDescriptionInput - The input type for the generateTrackDescription function.
 * - GenerateTrackDescriptionOutput - The return type for the generateTrackDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTrackDescriptionInputSchema = z.object({
  trackTitle: z.string().describe('The title of the music track.'),
});
export type GenerateTrackDescriptionInput = z.infer<typeof GenerateTrackDescriptionInputSchema>;

const GenerateTrackDescriptionOutputSchema = z.object({
  description: z.string().describe("A whimsical, short descriptive snippet or 'mood tag' for the track, capturing its vibe."),
});
export type GenerateTrackDescriptionOutput = z.infer<typeof GenerateTrackDescriptionOutputSchema>;

export async function generateTrackDescription(input: GenerateTrackDescriptionInput): Promise<GenerateTrackDescriptionOutput> {
  return generateTrackDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTrackDescriptionPrompt',
  input: {schema: GenerateTrackDescriptionInputSchema},
  output: {schema: GenerateTrackDescriptionOutputSchema},
  prompt: `You are an AI assistant specialized in creating whimsical, short descriptive snippets or 'mood tags' for game soundtrack titles. Your goal is to capture the essence of the track title in a cute and imaginative way. The output should be a single, concise description that fits a pastel, gentle aesthetic.

Track Title: {{{trackTitle}}}`,
});

const generateTrackDescriptionFlow = ai.defineFlow(
  {
    name: 'generateTrackDescriptionFlow',
    inputSchema: GenerateTrackDescriptionInputSchema,
    outputSchema: GenerateTrackDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
