import type { Memory, User } from './types';

export const users: User[] = [
  { id: '1', email: 'user@example.com' },
];

export const memories: Memory[] = [
  {
    id: 'mem-1',
    userId: '1',
    content: "Our trip to the Grand Canyon was breathtaking. The sheer scale of it is something a photo can never truly capture. We hiked the South Kaibab Trail down to Ooh Aah Point, and the view was absolutely worth the effort. The sunset painted the canyon in hues of orange, pink, and purple – a memory etched in my mind forever.",
    date: new Date('2023-05-15T00:00:00.000Z'),
    createdAt: new Date(),
    linkUrl: 'https://www.nps.gov/grca/index.htm',
    shouldIncludeLink: true,
    analysisSummary: 'The link is relevant and provides useful information about the location mentioned in the memory.'
  },
  {
    id: 'mem-2',
    userId: '1',
    content: "I finally finished building that bookshelf I've been working on for weeks. There were a few moments where I thought I'd messed it up completely, but it all came together in the end. It's so satisfying to see it standing there, filled with my favorite books. A testament to patience and a little bit of woodworking skill!",
    date: new Date('2024-01-20T00:00:00.000Z'),
    createdAt: new Date(),
  },
  {
    id: 'mem-3',
    userId: '1',
    content: 'Spent the afternoon at the local park, just reading and enjoying the sun. It was a simple, peaceful day. Sometimes, these quiet moments are the most memorable.',
    date: new Date('2023-08-01T00:00:00.000Z'),
    createdAt: new Date()
  },
];
