import type { Memory } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { format } from 'date-fns';
import { Link2, Info } from 'lucide-react';
import { ShareMemoryDialog } from './ShareMemoryDialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface MemoryCardProps {
  memory: Memory;
}

export function MemoryCard({ memory }: MemoryCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{format(memory.date, 'MMMM d, yyyy')}</CardTitle>
        <CardDescription>
            Added on {format(memory.createdAt, 'PP')}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="whitespace-pre-wrap text-foreground/90">{memory.content}</p>
        
        {memory.linkUrl && memory.shouldIncludeLink && (
            <TooltipProvider>
                <div className="mt-4 rounded-lg border bg-secondary/50 p-3">
                    <div className="flex items-center justify-between">
                         <a
                            href={memory.linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-secondary-foreground transition-colors hover:text-accent-foreground"
                        >
                            <Link2 className="h-4 w-4" />
                            <span className="truncate">{memory.linkUrl}</span>
                        </a>
                        {memory.analysisSummary && (
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="max-w-xs text-sm">{memory.analysisSummary}</p>
                                </TooltipContent>
                            </Tooltip>
                        )}
                    </div>
                </div>
            </TooltipProvider>
        )}
      </CardContent>
      <CardFooter className="bg-muted/50 p-4">
        <ShareMemoryDialog memoryId={memory.id} />
      </CardFooter>
    </Card>
  );
}
