'use client';

import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import Image from 'next/image';
import type { Skill } from '@/db/schema';

const CATEGORIES = ['Language', 'Backend', 'Database', 'Fullstack', 'DevOps', 'Frontend'] as const;

const schema = z.object({
  logoUrl: z.string().min(1, 'Logo is required'),
  title: z.string().min(1, 'Title is required'),
  firstTried: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be YYYY-MM-DD'),
  category: z.enum(CATEGORIES),
  description: z.string().min(1, 'Description is required'),
  docsUrl: z.string().url('Must be a valid URL'),
  sortOrder: z.number().int(),
});
type FormData = z.infer<typeof schema>;

async function fetchSkills(): Promise<Skill[]> {
  const res = await fetch('/api/admin/skills');
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export default function SkillsPage() {
  const qc = useQueryClient();
  const { data: skills = [], isLoading } = useQuery({ queryKey: ['admin-skills'], queryFn: fetchSkills });
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { logoUrl: '', title: '', firstTried: '', category: 'Backend', description: '', docsUrl: '', sortOrder: 0 },
  });

  const logoUrl = watch('logoUrl');
  const category = watch('category');

  function openAdd() {
    setEditing(null);
    reset({ logoUrl: '', title: '', firstTried: '', category: 'Backend', description: '', docsUrl: '', sortOrder: skills.length });
    setOpen(true);
  }

  function openEdit(skill: Skill) {
    setEditing(skill);
    reset({
      logoUrl: skill.logoUrl,
      title: skill.title,
      firstTried: skill.firstTried,
      category: skill.category as typeof CATEGORIES[number],
      description: skill.description,
      docsUrl: skill.docsUrl,
      sortOrder: skill.sortOrder,
    });
    setOpen(true);
  }

  async function uploadFile(file: File) {
    setUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
      if (!res.ok) throw new Error('Upload failed');
      const { url } = await res.json();
      setValue('logoUrl', url, { shouldDirty: true });
    } catch {
      toast.error('Image upload failed.');
    } finally {
      setUploading(false);
    }
  }

  const saveMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const url = editing ? `/api/admin/skills/${editing.id}` : '/api/admin/skills';
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error('Save failed');
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-skills'] });
      setOpen(false);
      toast.success(editing ? 'Skill updated.' : 'Skill added.');
    },
    onError: () => toast.error('Failed to save skill.'),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/admin/skills/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-skills'] });
      toast.success('Skill deleted.');
    },
    onError: () => toast.error('Failed to delete skill.'),
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-mono">Skills</h1>
          <p className="text-sm text-muted-foreground mt-1">{skills.length} skills</p>
        </div>
        <Button onClick={openAdd}>Add skill</Button>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground font-mono text-sm">Loading…</p>
      ) : (
        <div className="border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-mono text-xs text-muted-foreground w-10">#</th>
                <th className="text-left px-4 py-3 font-mono text-xs text-muted-foreground">Skill</th>
                <th className="text-left px-4 py-3 font-mono text-xs text-muted-foreground hidden sm:table-cell">Category</th>
                <th className="text-left px-4 py-3 font-mono text-xs text-muted-foreground hidden md:table-cell">Since</th>
                <th className="w-24" />
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr key={skill.id} className="border-b border-border/50 last:border-0 hover:bg-muted/20">
                  <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{skill.sortOrder}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 relative shrink-0">
                        <Image src={skill.logoUrl} alt="" fill className="object-contain" unoptimized />
                      </div>
                      <span className="font-medium">{skill.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <Badge variant="outline" className="font-mono text-xs">{skill.category}</Badge>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-muted-foreground font-mono text-xs">{skill.firstTried}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 justify-end">
                      <Button size="sm" variant="ghost" onClick={() => openEdit(skill)}>Edit</Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                        onClick={() => {
                          if (confirm(`Delete "${skill.title}"?`)) deleteMutation.mutate(skill.id);
                        }}
                      >
                        Del
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-mono">{editing ? 'Edit skill' : 'Add skill'}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit((d) => saveMutation.mutate(d))} className="flex flex-col gap-4 pt-2">
            {/* Logo */}
            <div className="flex flex-col gap-1.5">
              <Label>Logo</Label>
              <div className="flex items-center gap-3">
                {logoUrl && (
                  <div className="w-8 h-8 relative shrink-0">
                    <Image src={logoUrl} alt="" fill className="object-contain" unoptimized />
                  </div>
                )}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                >
                  {uploading ? 'Uploading…' : 'Upload image'}
                </Button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadFile(file);
                  }}
                />
              </div>
              <Input placeholder="or paste URL" {...register('logoUrl')} className="font-mono text-xs" />
              {errors.logoUrl && <p className="text-xs text-destructive">{errors.logoUrl.message}</p>}
            </div>

            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...register('title')} />
              {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
            </div>

            {/* Category */}
            <div className="flex flex-col gap-1.5">
              <Label>Category</Label>
              <Select value={category} onValueChange={(v) => setValue('category', v as typeof CATEGORIES[number], { shouldDirty: true })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            {/* First tried */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="firstTried">First tried (YYYY-MM-DD)</Label>
              <Input id="firstTried" placeholder="2025-01-15" {...register('firstTried')} className="font-mono" />
              {errors.firstTried && <p className="text-xs text-destructive">{errors.firstTried.message}</p>}
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" rows={4} {...register('description')} />
              {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
            </div>

            {/* Docs URL */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="docsUrl">Docs URL</Label>
              <Input id="docsUrl" type="url" {...register('docsUrl')} className="font-mono text-xs" />
              {errors.docsUrl && <p className="text-xs text-destructive">{errors.docsUrl.message}</p>}
            </div>

            {/* Sort order */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="sortOrder">Sort order</Label>
              <Input id="sortOrder" type="number" {...register('sortOrder', { valueAsNumber: true })} className="font-mono w-24" />
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting || uploading}>
                {isSubmitting ? 'Saving…' : 'Save'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
