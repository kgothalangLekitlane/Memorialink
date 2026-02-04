import { getMemoryById } from '@/lib/actions';
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
import { Logo } from '@/components/shared/Logo';

interface MemoryPageProps {
  params: {
    id: string;
  };
}

export default async function MemoryPage({ params }: MemoryPageProps) {
  const memory = await getMemoryById(params.id);

  if (!memory) {
    notFound();
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <div className="absolute left-4 top-4 md:left-8 md:top-8">
        <Button variant="ghost" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Memories
          </Link>
        </Button>
      </div>

      <main className="w-full max-w-2xl">
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-lg bg-primary p-2">
                <Logo className="h-6 w-6" />
                <span className="font-headline text-lg font-bold text-primary-foreground">MemoriaLink</span>
            </div>
            <CardTitle className="font-headline text-4xl">{format(memory.date, 'MMMM d, yyyy')}</CardTitle>
            <CardDescription>A shared memory</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap text-center text-lg text-foreground/80">
              {memory.content}
            </p>
          </CardContent>
          {memory.linkUrl && memory.shouldIncludeLink && (
            <CardFooter className="flex-col items-center justify-center border-t pt-6">
               <a
                href={memory.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent-foreground"
              >
                <Link2 className="h-4 w-4" />
                <span>Associated Link</span>
              </a>
              {memory.analysisSummary && (
                <p className="mt-2 text-center text-xs text-muted-foreground/80 italic">
                  AI Note: {memory.analysisSummary}
                </p>
              )}
            </CardFooter>
          )}
        </Card>
      </main>
    </div>
  );
}
