'use server';

/**
 * @fileOverview Summarizes the content of a given link.
 *
 * - summarizeLinkContent - A function that summarizes link content.
 * - SummarizeLinkContentInput - The input type for the summarizeLinkContent function.
 * - SummarizeLinkContentOutput - The return type for the summarizeLinkContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeLinkContentInputSchema = z.object({
  url: z.string().url().describe('The URL to summarize.'),
});
export type SummarizeLinkContentInput = z.infer<typeof SummarizeLinkContentInputSchema>;

const SummarizeLinkContentOutputSchema = z.object({
  summary: z.string().describe('A summary of the content at the URL.'),
  shouldIncludeLink: z.boolean().describe('A decision if the original URL should be displayed based on the content.'),
});
export type SummarizeLinkContentOutput = z.infer<typeof SummarizeLinkContentOutputSchema>;

export async function summarizeLinkContent(input: SummarizeLinkContentInput): Promise<SummarizeLinkContentOutput> {
  return summarizeLinkContentFlow(input);
}

const summarizeLinkContentPrompt = ai.definePrompt({
  name: 'summarizeLinkContentPrompt',
  input: {schema: SummarizeLinkContentInputSchema},
  output: {schema: SummarizeLinkContentOutputSchema},
  prompt: `You are an AI assistant that summarizes the content of a given URL.  You will determine whether the original URL should be displayed in the content in the shouldIncludeLink field.

URL: {{{url}}} `,
});

const summarizeLinkContentFlow = ai.defineFlow(
  {
    name: 'summarizeLinkContentFlow',
    inputSchema: SummarizeLinkContentInputSchema,
    outputSchema: SummarizeLinkContentOutputSchema,
  },
  async input => {
    const {output} = await summarizeLinkContentPrompt(input);
    return output!;
  }
);
