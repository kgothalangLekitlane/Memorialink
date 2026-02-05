'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Phone, Video } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface ChatHeaderProps {
  title?: string;
  avatarUrl?: string;
  isGroup: boolean;
  partnerName?: string;
}

export function ChatHeader({ title, avatarUrl, isGroup, partnerName }: ChatHeaderProps) {
  const [callType, setCallType] = useState<'voice' | 'video' | null>(null);

  const partnerDisplayName = isGroup ? title : partnerName;

  return (
    <>
      <header className="sticky top-16 z-10 flex items-center justify-between border-b bg-card p-3">
        <div className="flex min-w-0 items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="h-9 w-9 flex-shrink-0">
            <Link href="/messages">
              <ArrowLeft />
            </Link>
          </Button>
          <Avatar className="h-9 w-9 flex-shrink-0 border">
            {avatarUrl && <AvatarImage src={avatarUrl} />}
            <AvatarFallback>{title?.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="truncate font-semibold">{title}</h2>
        </div>
        <div className="flex flex-shrink-0 items-center gap-1">
          <Button variant="ghost" size="icon" onClick={() => setCallType('voice')}>
            <Phone className="h-5 w-5" />
            <span className="sr-only">Voice Call</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setCallType('video')}>
            <Video className="h-5 w-5" />
            <span className="sr-only">Video Call</span>
          </Button>
        </div>
      </header>

      <AlertDialog open={!!callType} onOpenChange={() => setCallType(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {callType === 'video' ? 'Video' : 'Voice'} calling {partnerDisplayName}...
            </AlertDialogTitle>
            <AlertDialogDescription>
              This feature is coming soon! For now, how about sending a message instead?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setCallType(null)}>End Call</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
