'use server';

import { z } from 'zod';
import { posts, users, stories, conversations, messages } from './data';
import type { Post, Story, Message, Conversation } from './types';
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

const messageSchema = z.object({
    content: z.string().optional(),
    imageUrl: z.string().url().optional(),
    conversationId: z.string(),
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

export async function sendMessage(prevState: any, formData: FormData) {
    const validatedFields = messageSchema.safeParse({
        content: formData.get('content'),
        imageUrl: formData.get('imageUrl'),
        conversationId: formData.get('conversationId'),
    });

    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
    }

    const { content, imageUrl, conversationId } = validatedFields.data;
    if (!content && !imageUrl) {
        return { errors: { content: ['Message cannot be empty.'] }};
    }
    
    const senderId = '1'; // Mock current user

    const newMessage: Message = {
        id: `msg-${Date.now()}`,
        conversationId,
        senderId,
        createdAt: new Date(),
        ...(content && { content }),
        ...(imageUrl && { imageUrl }),
    };

    messages.push(newMessage);
    
    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation) {
        conversation.messages.push(newMessage);
    }

    revalidatePath(`/messages/${conversationId}`);
    return { success: true };
}

export async function getPosts() {
  return posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function getPostById(id: string) {
  return posts.find(p => p.id === id);
}

export async function getStories() {
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

export async function getConversations(userId: string) {
    return conversations
        .filter(c => c.participantIds.includes(userId))
        .map(c => ({
            ...c,
            messages: c.messages.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        }))
        .sort((a,b) => b.messages[0].createdAt.getTime() - a.messages[0].createdAt.getTime());
}

export async function getConversation(conversationId: string) {
    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation) {
        return {
            ...conversation,
            messages: conversation.messages.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
        }
    }
    return undefined;
}

export async function getMessages(conversationId: string) {
    return messages.filter(m => m.conversationId === conversationId).sort((a,b) => a.createdAt.getTime() - b.createdAt.getTime());
}
