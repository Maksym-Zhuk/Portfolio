'use client';

import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const schema = z.object({
  rustCode: z.string(),
  tsCode: z.string(),
  nestCode: z.string(),
});
type FormData = z.infer<typeof schema>;

async function fetchAbout(): Promise<FormData> {
  const res = await fetch('/api/admin/about');
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

async function saveAbout(data: FormData): Promise<FormData> {
  const res = await fetch('/api/admin/about', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to save');
  return res.json();
}

export default function AboutPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['admin-about'], queryFn: fetchAbout });

  const { register, handleSubmit, reset, formState: { isDirty, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { rustCode: '', tsCode: '', nestCode: '' },
  });

  useEffect(() => {
    if (data) reset(data);
  }, [data, reset]);

  const mutation = useMutation({
    mutationFn: saveAbout,
    onSuccess: (saved) => {
      qc.setQueryData(['admin-about'], saved);
      reset(saved);
      toast.success('About Me saved.');
    },
    onError: () => toast.error('Failed to save.'),
  });

  if (isLoading) {
    return <p className="text-muted-foreground font-mono text-sm">Loading…</p>;
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold font-mono">About Me</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Edit the three code editor tabs shown on the home page.
        </p>
      </div>

      <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="flex flex-col gap-6">
        {(
          [
            { name: 'rustCode', label: 'Rust tab (about_me.rs)', rows: 28 },
            { name: 'tsCode', label: 'TypeScript tab (AboutMe.tsx)', rows: 28 },
            { name: 'nestCode', label: 'NestJS tab (developer.controller.ts)', rows: 28 },
          ] as const
        ).map(({ name, label, rows }) => (
          <div key={name} className="flex flex-col gap-1.5">
            <Label htmlFor={name} className="font-mono text-xs text-muted-foreground">
              {label}
            </Label>
            <Textarea
              id={name}
              rows={rows}
              className="font-mono text-xs resize-y"
              {...register(name)}
            />
          </div>
        ))}

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={!isDirty || isSubmitting}>
            {isSubmitting ? 'Saving…' : 'Save changes'}
          </Button>
          {isDirty && (
            <span className="text-xs text-muted-foreground font-mono">Unsaved changes</span>
          )}
        </div>
      </form>
    </div>
  );
}
