import { getPostById, getUserById } from '@/lib/actions';
import { notFound } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Link2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface PostPageProps {
  params: {
    id: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostById(params.id);

  if (!post) {
    notFound();
  }
  
  const author = await getUserById(post.authorId);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <div className="absolute left-4 top-4 md:left-8 md:top-8">
        <Button variant="ghost" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Feed
          </Link>
        </Button>
      </div>

      <main className="w-full max-w-2xl">
        <Card className="shadow-2xl">
          <CardHeader className="flex flex-row items-center gap-4">
            <Link href={`/profile/${author?.id}`}>
                <Avatar className="h-12 w-12">
                    {author?.avatarUrl && <AvatarImage src={author.avatarUrl} alt={author.name} />}
                    <AvatarFallback>{author?.name.charAt(0)}</AvatarFallback>
                </Avatar>
            </Link>
            <div>
                <CardTitle className="font-headline text-2xl">{author?.name}</CardTitle>
                <CardDescription>
                    Posted on {format(post.createdAt, 'PP')} &middot; From {format(post.date, 'MMMM d, yyyy')}
                </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap text-lg text-foreground/80">
              {post.content}
            </p>
          </CardContent>
          {post.linkUrl && post.shouldIncludeLink && (
            <CardFooter className="flex-col items-start justify-center border-t pt-6">
               <a
                href={post.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent-foreground"
              >
                <Link2 className="h-4 w-4" />
                <span>Associated Link</span>
              </a>
              {post.analysisSummary && (
                <p className="mt-2 text-left text-xs text-muted-foreground/80 italic">
                  AI Note: {post.analysisSummary}
                </p>
              )}
            </CardFooter>
          )}
        </Card>
      </main>
    </div>
  );
}
