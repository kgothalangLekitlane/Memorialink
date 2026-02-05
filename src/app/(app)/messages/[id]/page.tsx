import { getConversation, getUsers } from "@/lib/actions";
import { notFound } from "next/navigation";
import Link from 'next/link';
import { ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageInput } from "@/components/messages/MessageInput";
import { ChatMessage } from "@/components/messages/ChatMessage";

interface ChatPageProps {
  params: {
    id: string;
  };
}

export default async function ChatPage({ params }: ChatPageProps) {
  const currentUserId = '1'; // Mocked current user
  const conversation = await getConversation(params.id);

  if (!conversation || !conversation.participantIds.includes(currentUserId)) {
    notFound();
  }
  
  const allUsers = await getUsers();
  const participants = allUsers.filter(u => conversation.participantIds.includes(u.id));
  const usersById = Object.fromEntries(allUsers.map(u => [u.id, u]));

  let chatPartner;
  let title;
  let avatarUrl;

  if (conversation.isGroup) {
      title = conversation.groupName;
      avatarUrl = conversation.groupAvatar;
  } else {
      chatPartner = participants.find(p => p.id !== currentUserId);
      title = chatPartner?.name;
      avatarUrl = chatPartner?.avatarUrl;
  }


  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
        {/* Header */}
        <header className="sticky top-16 z-10 flex items-center gap-4 border-b bg-card p-3">
            <Button variant="ghost" size="icon" asChild className="h-9 w-9">
                <Link href="/messages">
                    <ArrowLeft />
                </Link>
            </Button>
            <Avatar className="h-9 w-9 border">
                {avatarUrl && <AvatarImage src={avatarUrl} />}
                <AvatarFallback>{title?.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="font-semibold">{title}</h2>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
            <div className="mx-auto flex max-w-2xl flex-col gap-4">
                {conversation.messages.map(message => (
                    <ChatMessage 
                        key={message.id}
                        message={message}
                        author={usersById[message.senderId]}
                        isCurrentUser={message.senderId === currentUserId}
                    />
                ))}
            </div>
        </div>

        {/* Input */}
        <footer className="sticky bottom-0 border-t bg-background p-2">
            <div className="mx-auto max-w-2xl">
                <MessageInput conversationId={conversation.id} />
            </div>
        </footer>
    </div>
  );
}
