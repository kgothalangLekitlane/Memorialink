'use client';

import { useState, useEffect, type ReactNode } from 'react';
import type { Story, User } from '@/lib/types';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';

const STORY_DURATION = 5000; // 5 seconds per story

export function StoryViewer({ user, stories, children }: { user: User; stories: Story[]; children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const currentStory = stories[currentIndex];

  useEffect(() => {
    if (isOpen) {
      setProgress(0);
      const timer = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(timer);
            return 100;
          }
          return p + 100 / (STORY_DURATION / 100);
        });
      }, 100);

      const storyTimer = setTimeout(() => {
        handleNextStory();
      }, STORY_DURATION);

      return () => {
        clearInterval(timer);
        clearTimeout(storyTimer);
      };
    }
  }, [isOpen, currentIndex, stories.length]);

  const handleNextStory = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      setIsOpen(false);
    }
  };

  const handlePrevStory = () => {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
    }
  };

  const handleOpen = () => {
    setCurrentIndex(0);
    setProgress(0);
    setIsOpen(true);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <div onClick={handleOpen} className="cursor-pointer">
            {children}
        </div>
      <DialogContent className="h-screen w-screen max-w-none border-0 bg-black/90 p-0 sm:h-[90vh] sm:max-w-md sm:rounded-lg">
        <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
            <div className="absolute top-0 left-0 right-0 z-20 p-4">
                <div className="flex items-center gap-2">
                    {stories.map((_, index) => (
                        <div key={stories[index].id} className="relative h-1 flex-1 rounded-full bg-white/30">
                            <div
                                className="absolute left-0 top-0 h-full rounded-full bg-white"
                                style={{ width: `${index < currentIndex ? 100 : index === currentIndex ? progress : 0}%` }}
                            />
                        </div>
                    ))}
                </div>
                 <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href={`/profile/${user.id}`} onClick={() => setIsOpen(false)}>
                            <Avatar className="h-9 w-9 border-2 border-white">
                                <AvatarImage src={user.avatarUrl} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </Link>
                        <div className="text-sm text-white">
                            <Link href={`/profile/${user.id}`} onClick={() => setIsOpen(false)} className="font-semibold hover:underline">
                                {user.name}
                            </Link>
                            <span className="ml-2 text-white/80">
                                {formatDistanceToNow(currentStory.createdAt, { addSuffix: true })}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            
            <img
                src={currentStory.mediaUrl}
                alt={`Story by ${user.name}`}
                className="pointer-events-none h-full w-full select-none object-contain"
            />
            
            <div className="absolute top-4 right-4 z-20">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20 hover:text-white" onClick={() => setIsOpen(false)}>
                    <X/>
                </Button>
            </div>

            <div className="absolute inset-0 z-10 flex justify-between">
                <div className="h-full w-1/3 cursor-pointer" onClick={handlePrevStory}></div>
                <div className="h-full w-1/3 cursor-pointer" onClick={handleNextStory}></div>
            </div>
            {currentIndex > 0 && (
                <Button variant="ghost" size="icon" className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 text-white hover:bg-black/50 hover:text-white" onClick={handlePrevStory}>
                    <ChevronLeft/>
                </Button>
            )}
             {currentIndex < stories.length - 1 && (
                <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 text-white hover:bg-black/50 hover:text-white" onClick={handleNextStory}>
                    <ChevronRight />
                </Button>
            )}

        </div>
      </DialogContent>
    </Dialog>
  );
}
