import { getPostsByUserId, getUserById } from "@/lib/actions";
import { notFound } from 'next/navigation';
import { PostCard } from "@/components/posts/PostCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ProfilePageProps {
  params: {
    id: string;
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const user = await getUserById(params.id);
  
  if (!user) {
    notFound();
  }
  
  const posts = await getPostsByUserId(user.id);

  return (
    <>
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <div className="mb-8 flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
          <Avatar className="h-24 w-24 border-4 border-primary">
            {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
            <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-headline text-4xl font-bold">{user.name}</h1>
            <p className="mt-1 text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <h2 className="font-headline text-3xl font-bold">Posts</h2>

        {posts.length > 0 ? (
          <div className="mt-6 flex flex-col gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} author={user} />
            ))}
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/50 py-12 text-center">
            <h3 className="text-xl font-semibold">No posts yet</h3>
            <p className="mt-2 text-muted-foreground">This user hasn't shared anything.</p>
          </div>
        )}
      </div>
    </>
  );
}
