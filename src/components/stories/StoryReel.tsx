'use client';

import { getStories, getUsers } from '@/lib/actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StoryViewer } from './StoryViewer';
import type { User, Story } from '@/lib/types';
import { useAuth } from '@/lib/auth';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CreateStoryDialog } from './CreateStoryDialog';

export function StoryReel() {
  const { user: currentUser } = useAuth();
  const [usersWithStories, setUsersWithStories] = useState<{ user: User; stories: Story[] }[]>([]);
  const [createOpen, setCreateOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const allUsers = await getUsers();
      const allStories = await getStories();

      const storiesByAuthor = allStories.reduce((acc, story) => {
        if (!acc[story.authorId]) {
          acc[story.authorId] = [];
        }
        acc[story.authorId].push(story);
        return acc;
      }, {} as Record<string, Story[]>);

      const combined = allUsers
        .filter(user => storiesByAuthor[user.id] && storiesByAuthor[user.id].length > 0)
        .map(user => ({
          user,
          stories: storiesByAuthor[user.id],
        }))
        .sort((a,b) => b.stories[b.stories.length-1].createdAt.getTime() - a.stories[a.stories.length-1].createdAt.getTime());
      
      setUsersWithStories(combined);
    }
    fetchData();
  }, []);

  if (!currentUser) return null;

  return (
    <div className="relative mb-4 w-full overflow-x-auto border-b">
        <CreateStoryDialog open={createOpen} onOpenChange={setCreateOpen} />
        <div className="flex gap-4 p-4">
            <div className="flex flex-col items-center gap-2 text-center" onClick={() => setCreateOpen(true)}>
                <button className="relative flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-secondary">
                    <Avatar className="h-16 w-16 border-2 border-dashed">
                        {currentUser.avatarUrl && <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />}
                        <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-card bg-primary text-primary-foreground">
                        <Plus className="h-4 w-4" />
                    </div>
                </button>
                 <span className="w-16 truncate text-xs font-medium">Your Story</span>
            </div>
            
            {usersWithStories.map(({ user, stories }) => (
                <StoryViewer key={user.id} user={user} stories={stories}>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <button className="h-16 w-16 cursor-pointer rounded-full p-0.5 bg-gradient-to-br from-yellow-400 via-red-500 to-purple-500">
                             <div className="rounded-full bg-background p-0.5">
                                <Avatar className="h-full w-full">
                                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </div>
                        </button>
                        <span className="w-16 truncate text-xs">{user.name}</span>
                    </div>
                </StoryViewer>
            ))}
        </div>
    </div>
  );
}
