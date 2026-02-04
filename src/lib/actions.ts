'use server';

import { z } from 'zod';
import { memories, users } from './data';
import type { Memory } from './types';
import { revalidatePath } from 'next/cache';
import { analyzeAndDecideLinkRelevance } from '@/ai/flows/analyze-and-decide-link-relevance';

const memorySchema = z.object({
  content: z.string().min(10, 'Memory is too short.'),
  date: z.coerce.date(),
  linkUrl: z.string().url('Please enter a valid URL.').optional().or(z.literal('')),
});

export async function createMemory(prevState: any, formData: FormData) {
  const validatedFields = memorySchema.safeParse({
    content: formData.get('content'),
    date: formData.get('date'),
    linkUrl: formData.get('linkUrl'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const { content, date, linkUrl } = validatedFields.data;

  // Mock user
  const userId = '1';

  const newMemory: Memory = {
    id: `mem-${Date.now()}`,
    userId,
    content,
    date,
    createdAt: new Date(),
  };

  if (linkUrl) {
    try {
      const analysis = await analyzeAndDecideLinkRelevance({
        link: linkUrl,
        memoryContent: content,
      });
      newMemory.linkUrl = linkUrl;
      newMemory.shouldIncludeLink = analysis.shouldIncludeLink;
      newMemory.analysisSummary = analysis.analysisSummary;
    } catch (error) {
      console.error('AI analysis failed:', error);
      // Decide how to handle AI failure. Here we'll just not include the link.
      newMemory.shouldIncludeLink = false;
      newMemory.analysisSummary = "AI analysis of the link failed.";
    }
  }

  memories.unshift(newMemory);

  revalidatePath('/dashboard');
  
  return { success: true };
}

export async function getMemories() {
  // In a real app, you'd fetch from a DB
  return memories;
}

export async function getMemoryById(id: string) {
  return memories.find(m => m.id === id);
}

export async function getUsers() {
    return users;
}
