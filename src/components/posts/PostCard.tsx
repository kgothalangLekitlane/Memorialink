import type { Post, User } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { Link2, Heart, MessageCircle, Send, MoreHorizontal } from 'lucide-react';
import { SharePostDialog } from './SharePostDialog';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Link from 'next/link';
import { Button } from '../ui/button';

interface PostCardProps {
  post: Post;
  author?: User;
}

export function PostCard({ post, author }: PostCardProps) {
  return (
    <div className="w-full rounded-none border-b bg-card sm:rounded-lg sm:border">
      <div className="flex items-center justify-between p-3">
        <Link href={`/profile/${author?.id}`} className="flex items-center gap-3">
          <Avatar className="h-8 w-8 border">
            {author?.avatarUrl && <AvatarImage src={author.avatarUrl} alt={author.name} />}
            <AvatarFallback>{author?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-semibold hover:underline">{author?.name}</span>
        </Link>
        <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal />
        </Button>
      </div>

      <div className="p-4 pt-0">
        <p className="whitespace-pre-wrap text-sm text-foreground/90">{post.content}</p>
        {post.linkUrl && post.shouldIncludeLink && (
            <div className="mt-2">
                <a
                    href={post.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-500 hover:underline"
                >
                    {post.linkUrl.replace(/^(https?:\/\/)?(www\.)?/, '')}
                </a>
            </div>
        )}
      </div>

      <div className="px-3 pb-3">
        <div className="flex items-center">
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
              <Heart className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
              <MessageCircle className="h-6 w-6" />
            </Button>
            <SharePostDialog postId={post.id}>
              <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
                <Send className="h-6 w-6" />
              </Button>
            </SharePostDialog>
          </div>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {formatDistanceToNow(post.createdAt, { addSuffix: true })}
        </p>
      </div>
    </div>
  );
}
