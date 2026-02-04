export type User = {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
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
