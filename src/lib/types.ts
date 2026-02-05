export type User = {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
  location?: string;
  website?: string;
};

export type Post = {
  id: string;
  authorId: string;
  content: string;
  date: Date;
  linkUrl?: string;
  analysisSummary?: string;
  shouldIncludeLink?: boolean;
  createdAt: Date;
};

export type Story = {
  id: string;
  authorId: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  createdAt: Date;
};
