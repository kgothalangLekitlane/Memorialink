import type { Conversation, User } from '@/lib/types';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { formatDistanceToNow } from 'date-fns';

interface ChatListItemProps {
    conversation: Conversation;
    allUsers: User[];
    currentUserId: string;
}

export function ChatListItem({ conversation, allUsers, currentUserId }: ChatListItemProps) {
    const lastMessage = conversation.messages[0];

    let chatPartner: User | undefined;
    let title: string;
    let avatarUrl: string | undefined;

    if (conversation.isGroup) {
        title = conversation.groupName || 'Group Chat';
        avatarUrl = conversation.groupAvatar;
    } else {
        const partnerId = conversation.participantIds.find(id => id !== currentUserId);
        chatPartner = allUsers.find(u => u.id === partnerId);
        title = chatPartner?.name || 'Unknown User';
        avatarUrl = chatPartner?.avatarUrl;
    }

    const lastMessageSender = allUsers.find(u => u.id === lastMessage.senderId);
    const lastMessagePrefix = lastMessage.senderId === currentUserId ? 'You: ' : `${lastMessageSender?.name.split(' ')[0]}: `;


    return (
        <Link href={`/messages/${conversation.id}`} className="block border-b transition-colors hover:bg-muted/50">
            <div className="flex items-center gap-4 p-4">
                <Avatar className="h-12 w-12 border">
                    {avatarUrl && <AvatarImage src={avatarUrl} alt={title} />}
                    <AvatarFallback>{title.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                    <div className="flex items-baseline justify-between">
                        <p className="truncate font-semibold">{title}</p>
                        <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(lastMessage.createdAt, { addSuffix: true })}
                        </p>
                    </div>
                    <p className="truncate text-sm text-muted-foreground">
                        <span className="text-foreground/80">{lastMessage.senderId === currentUserId ? 'You: ' : ''}</span>
                        {lastMessage.content || 'Sent an image'}
                    </p>
                </div>
            </div>
        </Link>
    )
}
