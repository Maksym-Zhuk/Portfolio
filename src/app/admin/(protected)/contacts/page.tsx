'use client';

import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import Image from 'next/image';
import type { Contact } from '@/db/schema';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  iconUrl: z.string().min(1, 'Icon is required'),
  link: z.string().url('Must be a valid URL'),
  handle: z.string().optional().nullable(),
  sortOrder: z.number().int(),
});
type FormData = z.infer<typeof schema>;

async function fetchContacts(): Promise<Contact[]> {
  const res = await fetch('/api/admin/contacts');
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export default function ContactsPage() {
  const qc = useQueryClient();
  const { data: contactList = [], isLoading } = useQuery({ queryKey: ['admin-contacts'], queryFn: fetchContacts });
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Contact | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { title: '', iconUrl: '', link: '', handle: '', sortOrder: 0 },
  });

  const iconUrl = watch('iconUrl');

  function openAdd() {
    setEditing(null);
    reset({ title: '', iconUrl: '', link: '', handle: '', sortOrder: contactList.length });
    setOpen(true);
  }

  function openEdit(c: Contact) {
    setEditing(c);
    reset({ title: c.title, iconUrl: c.iconUrl, link: c.link, handle: c.handle ?? '', sortOrder: c.sortOrder });
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
      setValue('iconUrl', url, { shouldDirty: true });
    } catch {
      toast.error('Image upload failed.');
    } finally {
      setUploading(false);
    }
  }

  const saveMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const url = editing ? `/api/admin/contacts/${editing.id}` : '/api/admin/contacts';
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error('Save failed');
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-contacts'] });
      setOpen(false);
      toast.success(editing ? 'Contact updated.' : 'Contact added.');
    },
    onError: () => toast.error('Failed to save contact.'),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/admin/contacts/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-contacts'] });
      toast.success('Contact deleted.');
    },
    onError: () => toast.error('Failed to delete.'),
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-mono">Contacts</h1>
          <p className="text-sm text-muted-foreground mt-1">{contactList.length} contacts</p>
        </div>
        <Button onClick={openAdd}>Add contact</Button>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground font-mono text-sm">Loading…</p>
      ) : (
        <div className="border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-mono text-xs text-muted-foreground">Contact</th>
                <th className="text-left px-4 py-3 font-mono text-xs text-muted-foreground hidden sm:table-cell">Handle</th>
                <th className="w-24" />
              </tr>
            </thead>
            <tbody>
              {contactList.map((item) => (
                <tr key={item.id} className="border-b border-border/50 last:border-0 hover:bg-muted/20">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 relative shrink-0">
                        <Image src={item.iconUrl} alt="" fill className="object-contain" unoptimized />
                      </div>
                      <span className="font-medium">{item.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground font-mono text-xs">{item.handle ?? '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 justify-end">
                      <Button size="sm" variant="ghost" onClick={() => openEdit(item)}>Edit</Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                        onClick={() => { if (confirm(`Delete "${item.title}"?`)) deleteMutation.mutate(item.id); }}
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
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-mono">{editing ? 'Edit contact' : 'Add contact'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit((d) => saveMutation.mutate(d))} className="flex flex-col gap-4 pt-2">
            <div className="flex flex-col gap-1.5">
              <Label>Icon</Label>
              <div className="flex items-center gap-3">
                {iconUrl && (
                  <div className="w-8 h-8 relative shrink-0">
                    <Image src={iconUrl} alt="" fill className="object-contain" unoptimized />
                  </div>
                )}
                <Button type="button" variant="outline" size="sm" onClick={() => fileRef.current?.click()} disabled={uploading}>
                  {uploading ? 'Uploading…' : 'Upload icon'}
                </Button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadFile(f); }} />
              </div>
              <Input placeholder="or paste URL" {...register('iconUrl')} className="font-mono text-xs" />
              {errors.iconUrl && <p className="text-xs text-destructive">{errors.iconUrl.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ct-title">Title</Label>
              <Input id="ct-title" {...register('title')} />
              {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ct-link">Link</Label>
              <Input id="ct-link" type="url" {...register('link')} className="font-mono text-xs" />
              {errors.link && <p className="text-xs text-destructive">{errors.link.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ct-handle">Handle (optional)</Label>
              <Input id="ct-handle" placeholder="@username" {...register('handle')} className="font-mono" />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ct-sort">Sort order</Label>
              <Input id="ct-sort" type="number" {...register('sortOrder', { valueAsNumber: true })} className="font-mono w-24" />
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting || uploading}>{isSubmitting ? 'Saving…' : 'Save'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
