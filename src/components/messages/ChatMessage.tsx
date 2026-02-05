import type { Message, User } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ChatMessageProps {
    message: Message;
    author: User;
    isCurrentUser: boolean;
}

export function ChatMessage({ message, author, isCurrentUser }: ChatMessageProps) {
    return (
        <div className={cn("flex items-end gap-2", isCurrentUser && "self-end flex-row-reverse")}>
             <Avatar className={cn("h-8 w-8 border", isCurrentUser && "hidden")}>
                {author?.avatarUrl && <AvatarImage src={author.avatarUrl} alt={author.name} />}
                <AvatarFallback>{author?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div 
                className={cn(
                    "max-w-xs rounded-lg px-3 py-2 text-sm sm:max-w-md", 
                    isCurrentUser 
                        ? "rounded-br-none bg-primary text-primary-foreground" 
                        : "rounded-bl-none bg-muted"
                )}
            >
                {message.content && <p className="whitespace-pre-wrap">{message.content}</p>}
                {message.imageUrl && (
                    <div className={cn("relative mt-2 aspect-video w-56 overflow-hidden rounded-md", !message.content && "mt-0")}>
                        <Image src={message.imageUrl} alt="Shared image" fill className="object-cover" />
                    </div>
                )}
            </div>
        </div>
    )
}
