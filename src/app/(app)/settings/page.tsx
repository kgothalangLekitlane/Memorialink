'use client';

import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormState, useFormStatus } from 'react-dom';
import { updateUser } from '@/lib/actions';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const initialState = {
  errors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Save Changes
    </Button>
  );
}

export default function SettingsPage() {
  const { user } = useAuth();
  const [state, formAction] = useFormState(updateUser, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      toast({
        title: 'Profile updated!',
        description: 'Your changes have been saved successfully.',
      });
    }
  }, [state, toast]);

  if (!user) return null;

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <h1 className="mb-6 font-headline text-3xl font-bold">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Public Profile</CardTitle>
          <CardDescription>
            This information will be displayed on your public profile.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} action={formAction} className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" defaultValue={user.name} />
              {state?.errors?.name && <p className="text-sm text-destructive">{state.errors.name[0]}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" name="bio" defaultValue={user.bio} className="min-h-24" />
               {state?.errors?.bio && <p className="text-sm text-destructive">{state.errors.bio[0]}</p>}
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" name="location" defaultValue={user.location} />
                     {state?.errors?.location && <p className="text-sm text-destructive">{state.errors.location[0]}</p>}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" name="website" type="url" defaultValue={user.website} />
                     {state?.errors?.website && <p className="text-sm text-destructive">{state.errors.website[0]}</p>}
                </div>
            </div>
            <div className="flex justify-end">
              <SubmitButton />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
