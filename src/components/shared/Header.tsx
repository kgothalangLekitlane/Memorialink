'use client';

import Link from 'next/link';
import { Logo } from './Logo';
import { Button } from '../ui/button';
import { useAuth } from '@/lib/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { LogOut, User as UserIcon, Home, PlusSquare, Settings, MessageSquare } from 'lucide-react';
import { CreatePostDialog } from '../posts/CreatePostDialog';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-card">
      <div className="container mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center gap-3">
          <h1 className="font-headline text-3xl font-bold">MemoriaLink</h1>
        </Link>
        <div className="flex items-center gap-2">
          {user && (
            <>
              <Link href="/dashboard" passHref>
                <Button variant="ghost" size="icon"><Home /></Button>
              </Link>
              <CreatePostDialog>
                <Button variant="ghost" size="icon"><PlusSquare /></Button>
              </CreatePostDialog>
              <Link href="/messages" passHref>
                <Button variant="ghost" size="icon"><MessageSquare /></Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-8 w-8">
                      {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        {user.name ? user.name.charAt(0).toUpperCase() : <UserIcon />}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/profile/${user.id}`}>
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                   <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
