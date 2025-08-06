// Implemented the GenerateAIImage flow to generate images based on text prompts using the Gemini API.

'use server';

/**
 * @fileOverview An AI image generation agent.
 *
 * - generateAiImage - A function that handles the image generation process.
 * - GenerateAiImageInput - The input type for the generateAiImage function.
 * - GenerateAiImageOutput - The return type for the generateAiImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAiImageInputSchema = z.object({
  prompt: z.string().describe('The text prompt to generate an image from.'),
});
export type GenerateAiImageInput = z.infer<typeof GenerateAiImageInputSchema>;

const GenerateAiImageOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated image.'),
});
export type GenerateAiImageOutput = z.infer<typeof GenerateAiImageOutputSchema>;

export async function generateAiImage(input: GenerateAiImageInput): Promise<GenerateAiImageOutput> {
  return generateAiImageFlow(input);
}

const generateAiImageFlow = ai.defineFlow(
  {
    name: 'generateAiImageFlow',
    inputSchema: GenerateAiImageInputSchema,
    outputSchema: GenerateAiImageOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      // IMPORTANT: ONLY the googleai/gemini-2.0-flash-preview-image-generation model is able to generate images. You MUST use exactly this model to generate images.
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: input.prompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE'], // MUST provide both TEXT and IMAGE, IMAGE only won't work
      },
    });

    if (!media?.url) {
      throw new Error('No image was generated.');
    }

    return {imageUrl: media.url};
  }
);
