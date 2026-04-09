'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import type { Organization, GithubOrg } from '@/db/schema';

// ── Featured Orgs schema ──────────────────────────────────────────────────────

const orgSchema = z.object({
  name: z.string().min(1, 'Name required'),
  slug: z.string().min(1, 'Slug required'),
  description: z.string(),
  githubUrl: z.string().url('Must be a valid URL'),
  websiteUrl: z.string().url().optional().or(z.literal('')).nullable(),
  roleBadge: z.string().optional().nullable(),
  version: z.string().optional().nullable(),
  languageName: z.string().optional().nullable(),
  languagePct: z.number().int().min(0).max(100).optional().nullable(),
  releasesCount: z.number().int().min(0).optional().nullable(),
  license: z.string().optional().nullable(),
  status: z.string().optional().nullable(),
  tags: z.string().optional(), // comma-separated in form
  sortOrder: z.number().int(),
});
type OrgFormData = z.infer<typeof orgSchema>;

// ── GitHub Orgs schema ────────────────────────────────────────────────────────

const githubOrgSchema = z.object({
  orgLogin: z.string().min(1, 'Org login required'),
  displayName: z.string().min(1, 'Display name required'),
  enabled: z.boolean(),
});
type GithubOrgFormData = z.infer<typeof githubOrgSchema>;

// ── Fetch helpers ─────────────────────────────────────────────────────────────

async function fetchOrgs(): Promise<Organization[]> {
  const res = await fetch('/api/admin/organizations');
  if (!res.ok) throw new Error('Failed');
  return res.json();
}

async function fetchGithubOrgs(): Promise<GithubOrg[]> {
  const res = await fetch('/api/admin/github-orgs');
  if (!res.ok) throw new Error('Failed');
  return res.json();
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function OrganizationsPage() {
  const qc = useQueryClient();
  const { data: orgs = [], isLoading: loadingOrgs } = useQuery({ queryKey: ['admin-orgs'], queryFn: fetchOrgs });
  const { data: githubOrgs = [], isLoading: loadingGithubOrgs } = useQuery({ queryKey: ['admin-github-orgs'], queryFn: fetchGithubOrgs });

  const [orgOpen, setOrgOpen] = useState(false);
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null);
  const [githubOrgOpen, setGithubOrgOpen] = useState(false);

  const orgForm = useForm<OrgFormData>({
    resolver: zodResolver(orgSchema),
    defaultValues: { name: '', slug: '', description: '', githubUrl: '', websiteUrl: '', roleBadge: '', version: '', languageName: '', languagePct: undefined, releasesCount: undefined, license: '', status: '', tags: '', sortOrder: 0 },
  });

  const githubOrgForm = useForm<GithubOrgFormData>({
    resolver: zodResolver(githubOrgSchema),
    defaultValues: { orgLogin: '', displayName: '', enabled: true },
  });

  function openAddOrg() {
    setEditingOrg(null);
    orgForm.reset({ name: '', slug: '', description: '', githubUrl: '', websiteUrl: '', roleBadge: '', version: '', languageName: '', languagePct: undefined, releasesCount: undefined, license: '', status: '', tags: '', sortOrder: orgs.length });
    setOrgOpen(true);
  }

  function openEditOrg(o: Organization) {
    setEditingOrg(o);
    orgForm.reset({
      name: o.name, slug: o.slug, description: o.description,
      githubUrl: o.githubUrl, websiteUrl: o.websiteUrl ?? '', roleBadge: o.roleBadge ?? '',
      version: o.version ?? '', languageName: o.languageName ?? '',
      languagePct: o.languagePct ?? undefined, releasesCount: o.releasesCount ?? undefined,
      license: o.license ?? '', status: o.status ?? '',
      tags: o.tags?.join(', ') ?? '', sortOrder: o.sortOrder,
    });
    setOrgOpen(true);
  }

  const saveOrgMutation = useMutation({
    mutationFn: async (data: OrgFormData) => {
      const payload = {
        ...data,
        tags: data.tags ? data.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
        websiteUrl: data.websiteUrl || null,
        roleBadge: data.roleBadge || null,
        version: data.version || null,
        languageName: data.languageName || null,
        languagePct: data.languagePct ?? null,
        releasesCount: data.releasesCount ?? null,
        license: data.license || null,
        status: data.status || null,
      };
      const url = editingOrg ? `/api/admin/organizations/${editingOrg.id}` : '/api/admin/organizations';
      const method = editingOrg ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error();
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-orgs'] }); setOrgOpen(false); toast.success(editingOrg ? 'Updated.' : 'Added.'); },
    onError: () => toast.error('Failed to save.'),
  });

  const deleteOrgMutation = useMutation({
    mutationFn: async (id: number) => { await fetch(`/api/admin/organizations/${id}`, { method: 'DELETE' }); },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-orgs'] }); toast.success('Deleted.'); },
  });

  const saveGithubOrgMutation = useMutation({
    mutationFn: async (data: GithubOrgFormData) => {
      const res = await fetch('/api/admin/github-orgs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error();
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-github-orgs'] }); setGithubOrgOpen(false); githubOrgForm.reset(); toast.success('GitHub org added.'); },
    onError: () => toast.error('Failed to add.'),
  });

  const toggleGithubOrgMutation = useMutation({
    mutationFn: async ({ id, org }: { id: number; org: GithubOrg }) => {
      const res = await fetch(`/api/admin/github-orgs?id=${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ orgLogin: org.orgLogin, displayName: org.displayName, enabled: !org.enabled }) });
      if (!res.ok) throw new Error();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-github-orgs'] }),
    onError: () => toast.error('Failed to toggle.'),
  });

  const deleteGithubOrgMutation = useMutation({
    mutationFn: async (id: number) => { await fetch(`/api/admin/github-orgs?id=${id}`, { method: 'DELETE' }); },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-github-orgs'] }); toast.success('Removed.'); },
  });

  return (
    <div className="flex flex-col gap-10 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold font-mono">Organizations</h1>
        <p className="text-sm text-muted-foreground mt-1">Featured org cards and GitHub organizations to pull repos from.</p>
      </div>

      {/* ── Featured orgs ──────────────────────────────────────────────────── */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold font-mono">Featured organizations</h2>
          <Button size="sm" onClick={openAddOrg}>Add org</Button>
        </div>

        {loadingOrgs ? <p className="text-muted-foreground font-mono text-sm">Loading…</p> : (
          <div className="flex flex-col gap-3">
            {orgs.map((o) => (
              <div key={o.id} className="border border-border rounded-xl p-4 bg-card flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{o.name}</span>
                    {o.roleBadge && <Badge variant="outline" className="font-mono text-xs">{o.roleBadge}</Badge>}
                    {o.status && <Badge variant="secondary" className="font-mono text-xs">{o.status}</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground">{o.description}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {o.tags?.map((tag) => <Badge key={tag} variant="outline" className="text-xs font-mono">{tag}</Badge>)}
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button size="sm" variant="ghost" onClick={() => openEditOrg(o)}>Edit</Button>
                  <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => { if (confirm(`Delete "${o.name}"?`)) deleteOrgMutation.mutate(o.id); }}>Del</Button>
                </div>
              </div>
            ))}
            {orgs.length === 0 && <p className="text-muted-foreground text-sm">No featured orgs yet.</p>}
          </div>
        )}
      </section>

      <Separator />

      {/* ── GitHub orgs ────────────────────────────────────────────────────── */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold font-mono">GitHub organizations</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Enabled orgs will have their repos fetched on the projects page.</p>
          </div>
          <Button size="sm" onClick={() => setGithubOrgOpen(true)}>Add org</Button>
        </div>

        {loadingGithubOrgs ? <p className="text-muted-foreground font-mono text-sm">Loading…</p> : (
          <div className="border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left px-4 py-3 font-mono text-xs text-muted-foreground">Org login</th>
                  <th className="text-left px-4 py-3 font-mono text-xs text-muted-foreground hidden sm:table-cell">Display name</th>
                  <th className="text-center px-4 py-3 font-mono text-xs text-muted-foreground">Enabled</th>
                  <th className="w-16" />
                </tr>
              </thead>
              <tbody>
                {githubOrgs.map((go) => (
                  <tr key={go.id} className="border-b border-border/50 last:border-0 hover:bg-muted/20">
                    <td className="px-4 py-3 font-mono text-xs">{go.orgLogin}</td>
                    <td className="px-4 py-3 hidden sm:table-cell">{go.displayName}</td>
                    <td className="px-4 py-3 text-center">
                      <Switch
                        checked={go.enabled}
                        onCheckedChange={() => toggleGithubOrgMutation.mutate({ id: go.id, org: go })}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => { if (confirm(`Remove "${go.orgLogin}"?`)) deleteGithubOrgMutation.mutate(go.id); }}>Del</Button>
                    </td>
                  </tr>
                ))}
                {githubOrgs.length === 0 && (
                  <tr><td colSpan={4} className="px-4 py-6 text-center text-muted-foreground text-sm">No GitHub orgs configured.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ── Featured org dialog ───────────────────────────────────────────────── */}
      <Dialog open={orgOpen} onOpenChange={setOrgOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="font-mono">{editingOrg ? 'Edit organization' : 'Add organization'}</DialogTitle></DialogHeader>
          <form onSubmit={orgForm.handleSubmit((d) => saveOrgMutation.mutate(d))} className="flex flex-col gap-4 pt-2">
            {[
              { name: 'name' as const, label: 'Name', placeholder: 'Oxide' },
              { name: 'slug' as const, label: 'Slug', placeholder: 'oxide-cli' },
              { name: 'githubUrl' as const, label: 'GitHub URL', placeholder: 'https://github.com/oxide-cli' },
              { name: 'websiteUrl' as const, label: 'Website URL (optional)', placeholder: 'https://...' },
              { name: 'roleBadge' as const, label: 'Role badge (optional)', placeholder: 'Lead Developer' },
              { name: 'version' as const, label: 'Version (optional)', placeholder: 'v0.4.0' },
              { name: 'languageName' as const, label: 'Primary language (optional)', placeholder: 'Rust' },
              { name: 'license' as const, label: 'License (optional)', placeholder: 'MIT / Apache-2.0' },
              { name: 'status' as const, label: 'Status (optional)', placeholder: 'Active' },
              { name: 'tags' as const, label: 'Tags (comma-separated)', placeholder: 'rust, cli, tooling' },
            ].map(({ name, label, placeholder }) => (
              <div key={name} className="flex flex-col gap-1.5">
                <Label htmlFor={`org-${name}`}>{label}</Label>
                <Input id={`org-${name}`} placeholder={placeholder} {...orgForm.register(name)} className={name.includes('Url') || name === 'slug' || name === 'tags' ? 'font-mono text-xs' : ''} />
                {orgForm.formState.errors[name] && <p className="text-xs text-destructive">{(orgForm.formState.errors[name] as { message?: string })?.message}</p>}
              </div>
            ))}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="org-desc">Description</Label>
              <Textarea id="org-desc" rows={2} {...orgForm.register('description')} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="org-lang-pct">Language % (optional)</Label>
                <Input id="org-lang-pct" type="number" min={0} max={100} {...orgForm.register('languagePct', { valueAsNumber: true })} className="font-mono" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="org-releases">Releases count (optional)</Label>
                <Input id="org-releases" type="number" min={0} {...orgForm.register('releasesCount', { valueAsNumber: true })} className="font-mono" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="org-sort">Sort order</Label>
              <Input id="org-sort" type="number" {...orgForm.register('sortOrder')} className="font-mono w-24" />
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <Button type="button" variant="ghost" onClick={() => setOrgOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={orgForm.formState.isSubmitting}>{orgForm.formState.isSubmitting ? 'Saving…' : 'Save'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* ── GitHub org dialog ─────────────────────────────────────────────────── */}
      <Dialog open={githubOrgOpen} onOpenChange={setGithubOrgOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle className="font-mono">Add GitHub organization</DialogTitle></DialogHeader>
          <form onSubmit={githubOrgForm.handleSubmit((d) => saveGithubOrgMutation.mutate(d))} className="flex flex-col gap-4 pt-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="go-login">Org login (GitHub username)</Label>
              <Input id="go-login" placeholder="oxide-cli" {...githubOrgForm.register('orgLogin')} className="font-mono" />
              {githubOrgForm.formState.errors.orgLogin && <p className="text-xs text-destructive">{githubOrgForm.formState.errors.orgLogin.message}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="go-display">Display name</Label>
              <Input id="go-display" placeholder="Oxide" {...githubOrgForm.register('displayName')} />
              {githubOrgForm.formState.errors.displayName && <p className="text-xs text-destructive">{githubOrgForm.formState.errors.displayName.message}</p>}
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <Button type="button" variant="ghost" onClick={() => setGithubOrgOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={githubOrgForm.formState.isSubmitting}>Add</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
