import type { Post, User, Story, Conversation, Message } from './types';

export const users: User[] = [
  { 
    id: '1', 
    email: 'user@example.com', 
    name: 'Amelia', 
    avatarUrl: 'https://picsum.photos/seed/amelia/100/100',
    bio: 'Just a girl who loves to travel and code. Trying to see the world one line of code at a time.',
    location: 'San Francisco, CA',
    website: 'https://amelia.dev'
  },
  { 
    id: '2', 
    email: 'jane@example.com', 
    name: 'Jane Doe', 
    avatarUrl: 'https://picsum.photos/seed/jane/100/100',
    bio: 'Photographer and artist. I see beauty in the mundane and try to capture it with my camera.',
    location: 'New York, NY',
    website: 'https://janedoe.photo'
  },
  { 
    id: '3', 
    email: 'john@example.com', 
    name: 'John Smith', 
    avatarUrl: 'https://picsum.photos/seed/john/100/100',
    bio: 'Woodworker, father, and all-around maker. I build things with my hands and enjoy a good cup of coffee.',
    location: 'Austin, TX',
    website: 'https://johnsmithbuilds.com'
  },
];

export const posts: Post[] = [
  {
    id: 'post-1',
    authorId: '2',
    content: "Our trip to the Grand Canyon was breathtaking. The sheer scale of it is something a photo can never truly capture. We hiked the South Kaibab Trail down to Ooh Aah Point, and the view was absolutely worth the effort. The sunset painted the canyon in hues of orange, pink, and purple – a memory etched in my mind forever.",
    date: new Date('2023-05-15T00:00:00.000Z'),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    linkUrl: 'https://www.nps.gov/grca/index.htm',
    shouldIncludeLink: true,
    analysisSummary: 'The link is relevant and provides useful information about the location mentioned.'
  },
  {
    id: 'post-2',
    authorId: '3',
    content: "I finally finished building that bookshelf I've been working on for weeks. There were a few moments where I thought I'd messed it up completely, but it all came together in the end. It's so satisfying to see it standing there, filled with my favorite books. A testament to patience and a little bit of woodworking skill!",
    date: new Date('2024-01-20T00:00:00.000Z'),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
  },
  {
    id: 'post-3',
    authorId: '2',
    content: 'Spent the afternoon at the local park, just reading and enjoying the sun. It was a simple, peaceful day. Sometimes, these quiet moments are the most memorable.',
    date: new Date('2023-08-01T00:00:00.000Z'),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5)
  },
  {
    id: 'post-4',
    authorId: '1',
    content: 'Just tried the new coffee shop downtown. The latte art was almost too good to drink! ☕️',
    date: new Date(),
    createdAt: new Date(Date.now() - 1000 * 60 * 30)
  },
];

export const stories: Story[] = [
  {
    id: 'story-1',
    authorId: '2',
    mediaUrl: 'https://picsum.photos/seed/story-jane/1080/1920',
    mediaType: 'image',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: 'story-2',
    authorId: '3',
    mediaUrl: 'https://picsum.photos/seed/story-john/1080/1920',
    mediaType: 'image',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
  },
   {
    id: 'story-3',
    authorId: '1',
    mediaUrl: 'https://picsum.photos/seed/story-amelia-1/1080/1920',
    mediaType: 'image',
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: 'story-4',
    authorId: '1',
    mediaUrl: 'https://picsum.photos/seed/story-amelia-2/1080/1920',
    mediaType: 'image',
    createdAt: new Date(Date.now() - 1000 * 60 * 25),
  },
];


export const messages: Message[] = [
    { id: 'msg-1', conversationId: 'convo-1', senderId: '1', content: 'Hey Jane, how have you been?', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24) },
    { id: 'msg-2', conversationId: 'convo-1', senderId: '2', content: 'Hey! I\'m doing great, thanks for asking. Just got back from that Grand Canyon trip.', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 23) },
    { id: 'msg-3', conversationId: 'convo-1', senderId: '1', content: 'Oh wow, I saw your post! It looked amazing.', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 22) },
    { id: 'msg-4', conversationId: 'convo-1', senderId: '2', imageUrl: 'https://picsum.photos/seed/canyon-chat/400/300', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 21) },
    { id: 'msg-5', conversationId: 'convo-2', senderId: '3', content: 'Hey everyone, planning a hiking trip next month. Who\'s in?', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5) },
    { id: 'msg-6', conversationId: 'convo-2', senderId: '1', content: 'I am so in! Where are we thinking of going?', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4) },
    { id: 'msg-7', conversationId: 'convo-2', senderId: '2', content: 'Sounds fun! Count me in.', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3) },
];

export const conversations: Conversation[] = [
    {
        id: 'convo-1',
        participantIds: ['1', '2'],
        isGroup: false,
        messages: messages.filter(m => m.conversationId === 'convo-1'),
    },
    {
        id: 'convo-2',
        participantIds: ['1', '2', '3'],
        isGroup: true,
        groupName: 'Hiking Crew',
        groupAvatar: 'https://picsum.photos/seed/hiking-group/100/100',
        messages: messages.filter(m => m.conversationId === 'convo-2'),
    }
];
