import { getConversations, getUsers } from "@/lib/actions";
import { ChatListItem } from "@/components/messages/ChatListItem";
import { MessageSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function MessagesPage() {
  // We assume the current user is '1' for this mock implementation
  const currentUserId = '1';
  const conversations = await getConversations(currentUserId);
  const users = await getUsers();

  return (
    <div className="flex h-[calc(100vh-4rem)] border-x">
      <div className="flex w-full flex-col md:w-[380px] md:border-r">
          <header className="flex items-center justify-between border-b p-4">
              <h1 className="font-headline text-2xl font-bold">Messages</h1>
              <Button variant="ghost" size="icon">
                  <Plus />
                   <span className="sr-only">New Message</span>
              </Button>
          </header>
          <div className="flex-1 overflow-y-auto">
            {conversations.length > 0 ? (
              <div>
                {conversations.map((convo) => (
                  <ChatListItem 
                    key={convo.id} 
                    conversation={convo} 
                    allUsers={users}
                    currentUserId={currentUserId}
                  />
                ))}
              </div>
            ) : (
               <div className="flex h-full flex-col items-center justify-center p-12 text-center text-muted-foreground">
                    <MessageSquare className="h-16 w-16" />
                    <h3 className="mt-4 text-xl font-semibold">No Messages</h3>
                    <p className="mt-1">You have no conversations yet.</p>
                </div>
            )}
          </div>
      </div>
      <div className="hidden flex-1 flex-col items-center justify-center bg-muted/50 text-center md:flex">
          <div className="rounded-full border-4 border-dashed border-muted bg-background p-8">
              <MessageSquare className="h-16 w-16 text-muted-foreground" />
          </div>
          <h2 className="mt-6 font-headline text-2xl font-semibold">Your Messages</h2>
          <p className="mt-2 max-w-xs text-muted-foreground">
              Select a conversation to start chatting.
          </p>
      </div>
    </div>
  );
}
