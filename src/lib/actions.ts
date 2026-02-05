'use server';

import { z } from 'zod';
import { posts, users, stories } from './data';
import type { Post, Story } from './types';
import { revalidatePath } from 'next/cache';
import { analyzeAndDecideLinkRelevance } from '@/ai/flows/analyze-and-decide-link-relevance';

const postSchema = z.object({
  content: z.string().min(3, 'Post is too short.'),
  date: z.coerce.date(),
  linkUrl: z.string().url('Please enter a valid URL.').optional().or(z.literal('')),
});

const userSchema = z.object({
    name: z.string().min(1, 'Name is required.'),
    bio: z.string().max(160, 'Bio must be 160 characters or less.').optional(),
    location: z.string().optional(),
    website: z.string().url('Please enter a valid URL.').optional().or(z.literal('')),
});

const storySchema = z.object({
  imageUrl: z.string().url('A valid image URL is required.'),
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

export async function createStory(prevState: any, formData: FormData) {
    const validatedFields = storySchema.safeParse({
        imageUrl: formData.get('imageUrl'),
    });

    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
    }

    const { imageUrl } = validatedFields.data;
    const authorId = '1'; // Mock current user

    const newStory: Story = {
        id: `story-${Date.now()}`,
        authorId,
        mediaUrl: imageUrl,
        mediaType: 'image',
        createdAt: new Date(),
    };

    stories.push(newStory);

    revalidatePath('/dashboard');
    return { success: true };
}

export async function updateUser(prevState: any, formData: FormData) {
    const validatedFields = userSchema.safeParse({
        name: formData.get('name'),
        bio: formData.get('bio'),
        location: formData.get('location'),
        website: formData.get('website'),
    });

    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
    }

    const { name, bio, location, website } = validatedFields.data;
    const userId = '1'; // Mock current user

    const user = users.find(u => u.id === userId);
    if (user) {
        user.name = name;
        user.bio = bio;
        user.location = location;
        user.website = website;
    }

    revalidatePath('/settings');
    revalidatePath(`/profile/${userId}`);
    return { success: true };
}

export async function getPosts() {
  // In a real app, you'd fetch from a DB
  return posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function getPostById(id: string) {
  return posts.find(p => p.id === id);
}

export async function getStories() {
    // Return stories from the last 24 hours
    return stories.filter(s => new Date().getTime() - s.createdAt.getTime() < 24 * 60 * 60 * 1000)
        .sort((a,b) => a.createdAt.getTime() - b.createdAt.getTime());
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
