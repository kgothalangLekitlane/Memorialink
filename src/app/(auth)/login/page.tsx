import { LoginForm } from '@/components/auth/LoginForm';
import { Logo } from '@/components/shared/Logo';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center gap-6">
       <div className="flex items-center gap-4">
          <Logo className="h-12 w-12" />
          <h1 className="font-headline text-5xl font-bold text-foreground">
            MemoriaLink
          </h1>
        </div>
        <p className="max-w-md text-center text-muted-foreground">
            Welcome back! Log in to see what's new.
        </p>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline hover:text-accent-foreground">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
