'use client';

import { useState, useEffect, type ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SharePostDialogProps {
  postId: string;
  children?: ReactNode;
}

export function SharePostDialog({ postId, children }: SharePostDialogProps) {
  const [shareUrl, setShareUrl] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // This ensures window is available
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/post/${postId}`;
      setShareUrl(url);
    }
  }, [postId]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: 'Copied to clipboard!',
      description: 'You can now share this link.',
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children ?? (
          <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline">Share Post</DialogTitle>
          <DialogDescription>
            Anyone with this link will be able to view this post.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={shareUrl} readOnly />
          </div>
          <Button type="button" size="sm" className="px-3" onClick={copyToClipboard}>
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
