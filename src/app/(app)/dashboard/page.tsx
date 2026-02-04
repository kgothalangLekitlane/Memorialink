import { getMemories, getUsers } from "@/lib/actions";
import { CreateMemoryDialog } from "@/components/memories/CreateMemoryDialog";
import { MemoryCard } from "@/components/memories/MemoryCard";

export default async function DashboardPage() {
  const memories = await getMemories();
  const users = await getUsers();
  const user = users.find(u => u.id === '1'); // Mock getting current user

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
            <h1 className="font-headline text-4xl font-bold">Your Memories</h1>
            <p className="mt-2 text-muted-foreground">
                A collection of your most cherished moments.
            </p>
        </div>
        <CreateMemoryDialog />
      </div>

      {memories.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {memories.map((memory) => (
            <MemoryCard key={memory.id} memory={memory} />
          ))}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center justify-center text-center">
            <div className="rounded-full border-4 border-dashed border-muted p-8">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M20.55 13.43a.5.5 0 1 0-.6-..86 8.5 8.5 0 1 1-13.9 0 .5.5 0 1 0-.6.86 9.5 9.5 0 1 0 15.1 0Z"/><path d="M18 19H6"/><path d="M15 22H9"/></svg>
            </div>
            <h2 className="mt-6 font-headline text-2xl font-semibold">No Memories Yet</h2>
            <p className="mt-2 max-w-sm text-muted-foreground">
                It looks like your memory book is empty. Click the button above to add your first memory!
            </p>
        </div>
      )}
    </div>
  );
}
