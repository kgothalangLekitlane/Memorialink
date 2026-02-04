'use client';

import { useState, useRef, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Loader2, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { createMemory } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';

const initialState = {
  errors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="bg-accent text-accent-foreground hover:bg-accent/90">
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Save Memory
    </Button>
  );
}

export function CreateMemoryDialog() {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useFormState(createMemory, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      toast({
        title: 'Success!',
        description: 'Your memory has been saved.',
      });
      setOpen(false);
      formRef.current?.reset();
    } else if (state.errors) {
      // Potentially show a toast for general errors if any
    }
  }, [state, toast]);


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Plus className="mr-2 h-4 w-4" />
          Create Memory
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">New Memory</DialogTitle>
          <DialogDescription>
            Add a new memory to your collection. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} action={formAction} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="content">Memory</Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Tell us about your memory..."
              className="min-h-[120px]"
            />
            {state?.errors?.content && <p className="text-sm text-destructive">{state.errors.content[0]}</p>}
          </div>

          <div className="grid gap-2">
            <Label>Date</Label>
            <DateInput />
             {state?.errors?.date && <p className="text-sm text-destructive">{state.errors.date[0]}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="linkUrl">Related Link (Optional)</Label>
            <Input
              id="linkUrl"
              name="linkUrl"
              placeholder="https://example.com"
            />
             {state?.errors?.linkUrl && <p className="text-sm text-destructive">{state.errors.linkUrl[0]}</p>}
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}


function DateInput() {
    const [date, setDate] = useState<Date>();
    
    return (
        <>
            <input type="hidden" name="date" value={date?.toISOString()} />
            <Popover>
                <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                />
                </PopoverContent>
            </Popover>
        </>
    )
}
