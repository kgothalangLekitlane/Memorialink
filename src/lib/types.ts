export type User = {
  id: string;
  email: string;
};

export type Memory = {
  id: string;
  userId: string;
  content: string;
  date: Date;
  linkUrl?: string;
  analysisSummary?: string;
  shouldIncludeLink?: boolean;
  createdAt: Date;
};
