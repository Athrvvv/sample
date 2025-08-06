// A Genkit flow that takes a text prompt and returns a text completion from the Gemini model.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetAITextCompletionInputSchema = z.object({
  prompt: z.string().describe('The prompt to send to the Gemini model.'),
});
export type GetAITextCompletionInput = z.infer<typeof GetAITextCompletionInputSchema>;

const GetAITextCompletionOutputSchema = z.object({
  text: z.string().describe('The text completion from the Gemini model.'),
});
export type GetAITextCompletionOutput = z.infer<typeof GetAITextCompletionOutputSchema>;

export async function getAITextCompletion(input: GetAITextCompletionInput): Promise<GetAITextCompletionOutput> {
  return getAITextCompletionFlow(input);
}

const getAITextCompletionPrompt = ai.definePrompt({
  name: 'getAITextCompletionPrompt',
  input: {schema: GetAITextCompletionInputSchema},
  output: {schema: GetAITextCompletionOutputSchema},
  prompt: `{{prompt}}`,
});

const getAITextCompletionFlow = ai.defineFlow(
  {
    name: 'getAITextCompletionFlow',
    inputSchema: GetAITextCompletionInputSchema,
    outputSchema: GetAITextCompletionOutputSchema,
  },
  async input => {
    const {text} = await ai.generate({
      prompt: input.prompt,
    });
    return {text};
  }
);
