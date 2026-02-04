import { getPosts, getUsers } from "@/lib/actions";
import { CreatePostDialog } from "@/components/posts/CreatePostDialog";
import { PostCard } from "@/components/posts/PostCard";
import type { User } from "@/lib/types";

export default async function DashboardPage() {
  const posts = await getPosts();
  const users = await getUsers();

  const usersById = users.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {} as Record<string, User>);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
            <h1 className="font-headline text-4xl font-bold">Home Feed</h1>
            <p className="mt-2 text-muted-foreground">
                See what others are sharing.
            </p>
        </div>
        <CreatePostDialog />
      </div>

      {posts.length > 0 ? (
        <div className="mt-8 flex flex-col gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} author={usersById[post.authorId]} />
          ))}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center justify-center text-center">
            <div className="rounded-full border-4 border-dashed border-muted p-8">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M20.55 13.43a.5.5 0 1 0-.6-..86 8.5 8.5 0 1 1-13.9 0 .5.5 0 1 0-.6.86 9.5 9.5 0 1 0 15.1 0Z"/><path d="M18 19H6"/><path d="M15 22H9"/></svg>
            </div>
            <h2 className="mt-6 font-headline text-2xl font-semibold">No Posts Yet</h2>
            <p className="mt-2 max-w-sm text-muted-foreground">
                It looks like the feed is empty. Why not create the first post?
            </p>
        </div>
      )}
    </div>
  );
}
