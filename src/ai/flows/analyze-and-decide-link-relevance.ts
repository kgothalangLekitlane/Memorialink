'use server';
/**
 * @fileOverview This file defines a Genkit flow that analyzes a given link and decides whether to incorporate
 *               information from the link into a memory post.  It exports the AnalyzeAndDecideLinkRelevanceInput,
 *               AnalyzeAndDecideLinkRelevanceOutput, and the analyzeAndDecideLinkRelevance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeAndDecideLinkRelevanceInputSchema = z.object({
  link: z.string().url().describe('The URL link to analyze.'),
  memoryContent: z.string().describe('The main text content of the memory post.'),
});
export type AnalyzeAndDecideLinkRelevanceInput = z.infer<typeof AnalyzeAndDecideLinkRelevanceInputSchema>;

const AnalyzeAndDecideLinkRelevanceOutputSchema = z.object({
  shouldIncludeLink: z.boolean().describe('Whether the link is relevant and safe to include.'),
  analysisSummary: z.string().describe('A brief summary of the link analysis.'),
});
export type AnalyzeAndDecideLinkRelevanceOutput = z.infer<typeof AnalyzeAndDecideLinkRelevanceOutputSchema>;

export async function analyzeAndDecideLinkRelevance(
  input: AnalyzeAndDecideLinkRelevanceInput
): Promise<AnalyzeAndDecideLinkRelevanceOutput> {
  return analyzeAndDecideLinkRelevanceFlow(input);
}

const analyzeLinkPrompt = ai.definePrompt({
  name: 'analyzeLinkPrompt',
  input: {
    schema: AnalyzeAndDecideLinkRelevanceInputSchema,
  },
  output: {
    schema: AnalyzeAndDecideLinkRelevanceOutputSchema,
  },
  prompt: `You are an AI assistant that analyzes a given link in the context of user-provided memory content to determine whether the link should be included.

  Here's the memory content:
  {{memoryContent}}

  Analyze the following link:
  {{link}}

  Consider the relevance of the link to the memory content, and it's safety. It should not be harmful, misleading, or offensive. It should add value to the memory.

  Based on your analysis, determine whether the link should be included in the memory post. Return your decision in JSON format, following this schema:
  { 
    shouldIncludeLink: boolean,
    analysisSummary: string
  }

  The analysisSummary should briefly explain why the link was either approved or rejected, with a maximum of 50 words.
  `,
});

const analyzeAndDecideLinkRelevanceFlow = ai.defineFlow(
  {
    name: 'analyzeAndDecideLinkRelevanceFlow',
    inputSchema: AnalyzeAndDecideLinkRelevanceInputSchema,
    outputSchema: AnalyzeAndDecideLinkRelevanceOutputSchema,
  },
  async input => {
    const {output} = await analyzeLinkPrompt(input);
    return output!;
  }
);
