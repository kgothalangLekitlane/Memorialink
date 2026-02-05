'use client';

import { useState, useRef, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { createStory } from '@/lib/actions';
import { Camera, Loader2, VideoOff } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const initialState = { errors: {} };

function SubmitButton({ isPictureTaken }: { isPictureTaken: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending || !isPictureTaken}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Share Story
    </Button>
  );
}

export function CreateStoryDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const [state, formAction] = useFormState(createStory, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);

  useEffect(() => {
    if (state.success) {
      toast({
        title: 'Success!',
        description: 'Your story has been shared.',
      });
      onOpenChange(false);
      setImageDataUrl(null);
      formRef.current?.reset();
    }
  }, [state, toast, onOpenChange]);

  useEffect(() => {
    async function setupCamera() {
      if (open && hasCameraPermission === null) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          setHasCameraPermission(true);
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
        }
      }
    }
    setupCamera();
  }, [open, hasCameraPermission]);

  useEffect(() => {
    // Cleanup camera stream
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setImageDataUrl(dataUrl);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Create a Story</DialogTitle>
          <DialogDescription>
            Capture a moment to share. Video support is coming soon!
          </DialogDescription>
        </DialogHeader>
        
        <div className="relative aspect-[9/16] w-full overflow-hidden rounded-md bg-muted">
            {hasCameraPermission === true && !imageDataUrl && (
                <video ref={videoRef} className="h-full w-full object-cover" autoPlay muted playsInline />
            )}
            {imageDataUrl && (
                <img src={imageDataUrl} alt="Captured story" className="h-full w-full object-cover" />
            )}
            {hasCameraPermission === false && (
                <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
                    <VideoOff className="h-12 w-12" />
                    <p className="mt-4">Camera access is required to create a story.</p>
                </div>
            )}
        </div>

        {hasCameraPermission === false && (
            <Alert variant="destructive">
                <AlertTitle>Camera Access Denied</AlertTitle>
                <AlertDescription>
                Please enable camera permissions in your browser settings.
                </AlertDescription>
            </Alert>
        )}

        <form ref={formRef} action={formAction}>
           <input type="hidden" name="imageUrl" value={imageDataUrl || ''} />
           {state?.errors?.imageUrl && <p className="text-sm text-destructive">{state.errors.imageUrl[0]}</p>}

            <DialogFooter className="mt-4 sm:justify-between">
                <div>
                {imageDataUrl ? (
                    <Button variant="outline" onClick={() => setImageDataUrl(null)}>Retake</Button>
                ) : (
                    <Button type="button" onClick={handleCapture} disabled={!hasCameraPermission}>
                        <Camera className="mr-2 h-4 w-4" />
                        Take Picture
                    </Button>
                )}
                </div>
                <div className="flex gap-2">
                    <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
                    <SubmitButton isPictureTaken={!!imageDataUrl} />
                </div>
            </DialogFooter>
        </form>
        <canvas ref={canvasRef} className="hidden"></canvas>
      </DialogContent>
    </Dialog>
  );
}