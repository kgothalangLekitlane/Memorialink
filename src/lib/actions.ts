'use server';

import { z } from 'zod';
import { posts, users } from './data';
import type { Post } from './types';
import { revalidatePath } from 'next/cache';
import { analyzeAndDecideLinkRelevance } from '@/ai/flows/analyze-and-decide-link-relevance';

const postSchema = z.object({
  content: z.string().min(3, 'Post is too short.'),
  date: z.coerce.date(),
  linkUrl: z.string().url('Please enter a valid URL.').optional().or(z.literal('')),
});

export async function createPost(prevState: any, formData: FormData) {
  const validatedFields = postSchema.safeParse({
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
  const authorId = '1';

  const newPost: Post = {
    id: `post-${Date.now()}`,
    authorId,
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
      newPost.linkUrl = linkUrl;
      newPost.shouldIncludeLink = analysis.shouldIncludeLink;
      newPost.analysisSummary = analysis.analysisSummary;
    } catch (error) {
      console.error('AI analysis failed:', error);
      newPost.shouldIncludeLink = false;
      newPost.analysisSummary = "AI analysis of the link failed.";
    }
  }

  posts.unshift(newPost);

  revalidatePath('/dashboard');
  revalidatePath(`/profile/${authorId}`);
  
  return { success: true };
}

export async function getPosts() {
  // In a real app, you'd fetch from a DB
  return posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function getPostById(id: string) {
  return posts.find(p => p.id === id);
}

export async function getUsers() {
    return users;
}

export async function getUserById(id:string) {
    return users.find(u => u.id === id);
}

export async function getPostsByUserId(userId: string) {
    return posts.filter(post => post.authorId === userId).sort((a,b) => b.date.getTime() - a.date.getTime());
}
