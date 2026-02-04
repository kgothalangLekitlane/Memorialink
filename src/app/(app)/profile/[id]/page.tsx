import { getPostsByUserId, getUserById } from "@/lib/actions";
import { notFound } from 'next/navigation';
import { PostCard } from "@/components/posts/PostCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link as LinkIcon, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
    <div className="container mx-auto max-w-4xl px-4 py-8">
        <header className="mb-8 grid grid-cols-1 items-center gap-8 md:grid-cols-3">
            <div className="flex justify-center md:col-span-1">
                <Avatar className="h-32 w-32 border md:h-40 md:w-40">
                    {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
                    <AvatarFallback className="text-6xl">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
            </div>
            <div className="col-span-2 flex flex-col gap-4 text-center md:text-left">
                <h1 className="text-3xl font-light">{user.name}</h1>
                <div className="flex justify-center gap-8 text-sm md:justify-start">
                    <p><span className="font-semibold">{posts.length}</span> posts</p>
                </div>
                <div className="text-sm">
                    {user.bio && <p className="max-w-prose">{user.bio}</p>}
                    <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-muted-foreground md:justify-start">
                        {user.location && (
                            <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{user.location}</span>
                            </div>
                        )}
                        {user.website && (
                            <div className="flex items-center gap-1">
                                <LinkIcon className="h-4 w-4" />
                                <a href={user.website} target="_blank" rel="noopener noreferrer" className="font-medium text-foreground hover:underline">
                                    {user.website.replace(/^(https?:\/\/)?(www\.)?/, '')}
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>

        <Separator />
        
        <div className="mt-8">
             <div className="mx-auto max-w-xl">
                <div className="flex flex-col gap-8">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <PostCard key={post.id} post={post} author={user} />
                        ))
                    ) : (
                        <div className="mt-16 flex flex-col items-center justify-center rounded-lg py-12 text-center">
                            <h3 className="text-xl font-semibold">No posts yet</h3>
                            <p className="mt-2 text-muted-foreground">This user hasn't shared anything.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
}
