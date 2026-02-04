import type { Post, User } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { format, formatDistanceToNow } from 'date-fns';
import { Link2, Info } from 'lucide-react';
import { SharePostDialog } from './SharePostDialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Link from 'next/link';

interface PostCardProps {
  post: Post;
  author?: User;
}

export function PostCard({ post, author }: PostCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Link href={`/profile/${author?.id}`} className="flex items-center gap-3">
            <Avatar>
              {author?.avatarUrl && <AvatarImage src={author.avatarUrl} alt={author.name} />}
              <AvatarFallback>{author?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base font-bold leading-none">{author?.name}</CardTitle>
              <CardDescription className="mt-1 text-xs">
                {formatDistanceToNow(post.createdAt, { addSuffix: true })}
              </CardDescription>
            </div>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="flex-grow pb-4">
        <p className="mb-4 text-sm font-semibold text-muted-foreground">{format(post.date, 'MMMM d, yyyy')}</p>
        <p className="whitespace-pre-wrap text-foreground/90">{post.content}</p>
        
        {post.linkUrl && post.shouldIncludeLink && (
            <TooltipProvider>
                <div className="mt-4 rounded-lg border bg-secondary/50 p-3">
                    <div className="flex items-center justify-between">
                         <a
                            href={post.linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-secondary-foreground transition-colors hover:text-accent-foreground"
                        >
                            <Link2 className="h-4 w-4" />
                            <span className="truncate">{post.linkUrl}</span>
                        </a>
                        {post.analysisSummary && (
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="max-w-xs text-sm">{post.analysisSummary}</p>
                                </TooltipContent>
                            </Tooltip>
                        )}
                    </div>
                </div>
            </TooltipProvider>
        )}
      </CardContent>
      <CardFooter className="bg-muted/50 p-2">
        <SharePostDialog postId={post.id} />
      </CardFooter>
    </Card>
  );
}
