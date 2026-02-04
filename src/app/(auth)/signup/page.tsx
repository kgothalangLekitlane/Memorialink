import { SignUpForm } from '@/components/auth/SignUpForm';
import { Logo } from '@/components/shared/Logo';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-4">
            <Logo className="h-12 w-12" />
            <h1 className="font-headline text-5xl font-bold text-foreground">
                MemoriaLink
            </h1>
        </div>
        <p className="max-w-md text-center text-muted-foreground">
            Join the community. Create an account to start sharing.
        </p>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline hover:text-accent-foreground">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
