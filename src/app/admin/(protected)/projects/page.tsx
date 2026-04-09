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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import type { ProjectImage, CustomProject } from '@/db/schema';

// ── Project Images ────────────────────────────────────────────────────────────

const imgSchema = z.object({
  repoName: z.string().min(1, 'Repo name required'),
  imageUrl: z.string().min(1, 'Image URL required'),
});
type ImgFormData = z.infer<typeof imgSchema>;

// ── Custom Projects ───────────────────────────────────────────────────────────

const projSchema = z.object({
  name: z.string().min(1, 'Name required'),
  description: z.string(),
  githubUrl: z.string().url().optional().or(z.literal('')).nullable(),
  homepageUrl: z.string().url().optional().or(z.literal('')).nullable(),
  topics: z.string().optional(), // comma-separated in the form
  language: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  sortOrder: z.number().int(),
});
type ProjFormData = z.infer<typeof projSchema>;

async function fetchImages(): Promise<ProjectImage[]> {
  const res = await fetch('/api/admin/project-images');
  if (!res.ok) throw new Error('Failed');
  return res.json();
}

async function fetchProjects(): Promise<CustomProject[]> {
  const res = await fetch('/api/admin/custom-projects');
  if (!res.ok) throw new Error('Failed');
  return res.json();
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const qc = useQueryClient();
  const { data: images = [], isLoading: loadingImages } = useQuery({ queryKey: ['admin-proj-images'], queryFn: fetchImages });
  const { data: projects = [], isLoading: loadingProjects } = useQuery({ queryKey: ['admin-custom-projects'], queryFn: fetchProjects });

  // Image mapping state
  const [imgOpen, setImgOpen] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const imgFileRef = useRef<HTMLInputElement>(null);

  const imgForm = useForm<ImgFormData>({ resolver: zodResolver(imgSchema), defaultValues: { repoName: '', imageUrl: '' } });

  // Custom project state
  const [projOpen, setProjOpen] = useState(false);
  const [editingProj, setEditingProj] = useState<CustomProject | null>(null);
  const [uploadingProj, setUploadingProj] = useState(false);
  const projFileRef = useRef<HTMLInputElement>(null);

  const projForm = useForm<ProjFormData>({ resolver: zodResolver(projSchema), defaultValues: { name: '', description: '', githubUrl: '', homepageUrl: '', topics: '', language: '', imageUrl: '', sortOrder: 0 } });

  async function uploadFile(ref: React.RefObject<HTMLInputElement | null>, setLoading: (v: boolean) => void, onUrl: (url: string) => void) {
    const file = ref.current?.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
      if (!res.ok) throw new Error();
      const { url } = await res.json();
      onUrl(url);
    } catch {
      toast.error('Upload failed.');
    } finally {
      setLoading(false);
    }
  }

  const saveImageMutation = useMutation({
    mutationFn: async (data: ImgFormData) => {
      const res = await fetch('/api/admin/project-images', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error();
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-proj-images'] }); setImgOpen(false); toast.success('Mapping saved.'); },
    onError: () => toast.error('Failed to save.'),
  });

  const deleteImageMutation = useMutation({
    mutationFn: async (id: number) => {
      await fetch(`/api/admin/project-images?id=${id}`, { method: 'DELETE' });
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-proj-images'] }); toast.success('Deleted.'); },
  });

  const saveProjMutation = useMutation({
    mutationFn: async (data: ProjFormData) => {
      const payload = {
        ...data,
        topics: data.topics ? data.topics.split(',').map((t) => t.trim()).filter(Boolean) : [],
        githubUrl: data.githubUrl || null,
        homepageUrl: data.homepageUrl || null,
        imageUrl: data.imageUrl || null,
        language: data.language || null,
      };
      const url = editingProj ? `/api/admin/custom-projects/${editingProj.id}` : '/api/admin/custom-projects';
      const method = editingProj ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error();
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-custom-projects'] }); setProjOpen(false); toast.success(editingProj ? 'Project updated.' : 'Project added.'); },
    onError: () => toast.error('Failed to save.'),
  });

  const deleteProjMutation = useMutation({
    mutationFn: async (id: number) => { await fetch(`/api/admin/custom-projects/${id}`, { method: 'DELETE' }); },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-custom-projects'] }); toast.success('Deleted.'); },
  });

  function openAddProj() {
    setEditingProj(null);
    projForm.reset({ name: '', description: '', githubUrl: '', homepageUrl: '', topics: '', language: '', imageUrl: '', sortOrder: projects.length });
    setProjOpen(true);
  }

  function openEditProj(p: CustomProject) {
    setEditingProj(p);
    projForm.reset({
      name: p.name,
      description: p.description,
      githubUrl: p.githubUrl ?? '',
      homepageUrl: p.homepageUrl ?? '',
      topics: p.topics?.join(', ') ?? '',
      language: p.language ?? '',
      imageUrl: p.imageUrl ?? '',
      sortOrder: p.sortOrder,
    });
    setProjOpen(true);
  }

  return (
    <div className="flex flex-col gap-10 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold font-mono">Projects</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage project screenshots and custom projects.</p>
      </div>

      {/* ── Project Images ──────────────────────────────────────────────────── */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold font-mono">GitHub repo screenshots</h2>
          <Button size="sm" onClick={() => { imgForm.reset(); setImgOpen(true); }}>Add mapping</Button>
        </div>
        <p className="text-xs text-muted-foreground">Maps a GitHub repo name to a screenshot URL. Used to show previews on the projects page.</p>

        {loadingImages ? <p className="text-muted-foreground font-mono text-sm">Loading…</p> : (
          <div className="border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left px-4 py-3 font-mono text-xs text-muted-foreground">Repo name</th>
                  <th className="text-left px-4 py-3 font-mono text-xs text-muted-foreground hidden sm:table-cell">Image URL</th>
                  <th className="w-16" />
                </tr>
              </thead>
              <tbody>
                {images.map((img) => (
                  <tr key={img.id} className="border-b border-border/50 last:border-0 hover:bg-muted/20">
                    <td className="px-4 py-3 font-mono text-xs">{img.repoName}</td>
                    <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground font-mono text-xs truncate max-w-[200px]">{img.imageUrl}</td>
                    <td className="px-4 py-3">
                      <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => { if (confirm('Delete?')) deleteImageMutation.mutate(img.id); }}>Del</Button>
                    </td>
                  </tr>
                ))}
                {images.length === 0 && (
                  <tr><td colSpan={3} className="px-4 py-6 text-center text-muted-foreground text-sm">No mappings yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <Separator />

      {/* ── Custom Projects ─────────────────────────────────────────────────── */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold font-mono">Custom projects</h2>
          <Button size="sm" onClick={openAddProj}>Add project</Button>
        </div>
        <p className="text-xs text-muted-foreground">Non-GitHub projects that appear alongside your repos.</p>

        {loadingProjects ? <p className="text-muted-foreground font-mono text-sm">Loading…</p> : (
          <div className="border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left px-4 py-3 font-mono text-xs text-muted-foreground">Name</th>
                  <th className="text-left px-4 py-3 font-mono text-xs text-muted-foreground hidden sm:table-cell">Language</th>
                  <th className="w-24" />
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.id} className="border-b border-border/50 last:border-0 hover:bg-muted/20">
                    <td className="px-4 py-3 font-medium">{p.name}</td>
                    <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground font-mono text-xs">{p.language ?? '—'}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 justify-end">
                        <Button size="sm" variant="ghost" onClick={() => openEditProj(p)}>Edit</Button>
                        <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => { if (confirm(`Delete "${p.name}"?`)) deleteProjMutation.mutate(p.id); }}>Del</Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {projects.length === 0 && (
                  <tr><td colSpan={3} className="px-4 py-6 text-center text-muted-foreground text-sm">No custom projects yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ── Image mapping dialog ──────────────────────────────────────────────── */}
      <Dialog open={imgOpen} onOpenChange={setImgOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle className="font-mono">Add / update screenshot</DialogTitle></DialogHeader>
          <form onSubmit={imgForm.handleSubmit((d) => saveImageMutation.mutate(d))} className="flex flex-col gap-4 pt-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="img-repo">GitHub repo name</Label>
              <Input id="img-repo" placeholder="my-repo" {...imgForm.register('repoName')} className="font-mono" />
              {imgForm.formState.errors.repoName && <p className="text-xs text-destructive">{imgForm.formState.errors.repoName.message}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Screenshot</Label>
              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" size="sm" disabled={uploadingImg}
                  onClick={() => imgFileRef.current?.click()}>
                  {uploadingImg ? 'Uploading…' : 'Upload image'}
                </Button>
                <input ref={imgFileRef} type="file" accept="image/*" className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) { imgFileRef.current!.value = ''; uploadFile(imgFileRef, setUploadingImg, (url) => imgForm.setValue('imageUrl', url, { shouldDirty: true })); } }} />
              </div>
              <Input placeholder="or paste URL" {...imgForm.register('imageUrl')} className="font-mono text-xs" />
              {imgForm.formState.errors.imageUrl && <p className="text-xs text-destructive">{imgForm.formState.errors.imageUrl.message}</p>}
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <Button type="button" variant="ghost" onClick={() => setImgOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={imgForm.formState.isSubmitting}>Save</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* ── Custom project dialog ─────────────────────────────────────────────── */}
      <Dialog open={projOpen} onOpenChange={setProjOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="font-mono">{editingProj ? 'Edit project' : 'Add project'}</DialogTitle></DialogHeader>
          <form onSubmit={projForm.handleSubmit((d) => saveProjMutation.mutate(d))} className="flex flex-col gap-4 pt-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="p-name">Name</Label>
              <Input id="p-name" {...projForm.register('name')} />
              {projForm.formState.errors.name && <p className="text-xs text-destructive">{projForm.formState.errors.name.message}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="p-desc">Description</Label>
              <Textarea id="p-desc" rows={3} {...projForm.register('description')} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="p-github">GitHub URL (optional)</Label>
              <Input id="p-github" type="url" {...projForm.register('githubUrl')} className="font-mono text-xs" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="p-home">Homepage URL (optional)</Label>
              <Input id="p-home" type="url" {...projForm.register('homepageUrl')} className="font-mono text-xs" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="p-topics">Topics (comma-separated)</Label>
              <Input id="p-topics" placeholder="rust, cli, tooling" {...projForm.register('topics')} className="font-mono text-xs" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="p-lang">Language</Label>
              <Input id="p-lang" placeholder="Rust" {...projForm.register('language')} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Screenshot</Label>
              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" size="sm" disabled={uploadingProj}
                  onClick={() => projFileRef.current?.click()}>
                  {uploadingProj ? 'Uploading…' : 'Upload image'}
                </Button>
                <input ref={projFileRef} type="file" accept="image/*" className="hidden"
                  onChange={() => uploadFile(projFileRef, setUploadingProj, (url) => projForm.setValue('imageUrl', url, { shouldDirty: true }))} />
              </div>
              <Input placeholder="or paste URL" {...projForm.register('imageUrl')} className="font-mono text-xs" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="p-sort">Sort order</Label>
              <Input id="p-sort" type="number" {...projForm.register('sortOrder')} className="font-mono w-24" />
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <Button type="button" variant="ghost" onClick={() => setProjOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={projForm.formState.isSubmitting || uploadingProj}>{projForm.formState.isSubmitting ? 'Saving…' : 'Save'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
