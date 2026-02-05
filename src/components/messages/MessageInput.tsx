'use client';

import { sendMessage } from "@/lib/actions";
import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Loader2, Paperclip, SendHorizonal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const initialState = { errors: {} };

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
         <Button type="submit" size="icon" disabled={pending}>
            {pending ? <Loader2 className="animate-spin" /> : <SendHorizonal />}
            <span className="sr-only">Send Message</span>
        </Button>
    )
}

interface MessageInputProps {
    conversationId: string;
}

export function MessageInput({ conversationId }: MessageInputProps) {
    const [state, formAction] = useFormState(sendMessage, initialState);
    const formRef = useRef<HTMLFormElement>(null);
    const { toast } = useToast();
    
    // Hidden input state for mocked image URL
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if(state.success) {
            formRef.current?.reset();
            setImageUrl('');
        }
        if (state?.errors?.content) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: state.errors.content[0]
            })
        }
    }, [state, toast]);

    // Mock image selection
    const handleAttachImage = () => {
        // In a real app, this would open a file picker.
        // Here, we just set a random placeholder image URL.
        const randomSeed = Math.floor(Math.random() * 1000);
        setImageUrl(`https://picsum.photos/seed/${randomSeed}/400/300`);
        toast({
            title: 'Image Attached',
            description: 'A placeholder image has been attached. Click send to share it.'
        })
    }

    return (
        <form 
            ref={formRef} 
            action={formAction}
            className="flex items-center gap-2"
        >
            <input type="hidden" name="conversationId" value={conversationId} />
            <input type="hidden" name="imageUrl" value={imageUrl} />
            
            <Button type="button" variant="ghost" size="icon" onClick={handleAttachImage}>
                <Paperclip />
                <span className="sr-only">Attach Image</span>
            </Button>
            <Input 
                name="content"
                type="text"
                placeholder={imageUrl ? "Image attached. Add a caption..." : "Type a message..."}
                autoComplete="off"
            />
            <SubmitButton />
        </form>
    );
}
