import type { Post, User } from './types';

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
