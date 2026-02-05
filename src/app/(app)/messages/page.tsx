import { getConversations, getUsers } from "@/lib/actions";
import { ChatListItem } from "@/components/messages/ChatListItem";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export default async function MessagesPage() {
  // We assume the current user is '1' for this mock implementation
  const currentUserId = '1';
  const conversations = await getConversations(currentUserId);
  const users = await getUsers();

  return (
    <div className="container mx-auto max-w-xl py-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Messages</CardTitle>
        </CardHeader>
        <div className="border-t">
          {conversations.length > 0 ? (
            conversations.map((convo) => (
              <ChatListItem 
                key={convo.id} 
                conversation={convo} 
                allUsers={users}
                currentUserId={currentUserId}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
                <MessageSquare className="h-16 w-16" />
                <h3 className="mt-4 text-xl font-semibold">No Messages</h3>
                <p className="mt-1">You have no conversations yet.</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
