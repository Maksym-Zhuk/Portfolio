'use client';

import { startTransition, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  UserRound,
  Wrench,
  AtSign,
  FolderGit2,
  Building2,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/about', label: 'About Me', icon: UserRound },
  { href: '/admin/skills', label: 'Skills', icon: Wrench },
  { href: '/admin/contacts', label: 'Contacts', icon: AtSign },
  { href: '/admin/projects', label: 'Projects', icon: FolderGit2 },
  { href: '/admin/organizations', label: 'Organizations', icon: Building2 },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  async function handleLogout() {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    startTransition(() => {
      router.replace('/admin/login');
      router.refresh();
    });
  }

  const navItems = (
    <nav className="flex-1 flex flex-col gap-0.5 p-2 pt-4">
      {NAV.map(({ href, label, icon: Icon }) => {
        const active = href === '/admin' ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-mono transition-colors duration-150',
              active
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted',
            )}
          >
            <Icon className="size-4 shrink-0" />
            {label}
          </Link>
        );
      })}
    </nav>
  );

  const logoutButton = (
    <div className="p-2 border-t border-border">
      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-mono text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors duration-150 text-left"
      >
        <LogOut className="size-4 shrink-0" />
        Sign out
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <header className="md:hidden flex items-center justify-between px-4 h-14 border-b border-border bg-card sticky top-0 z-30">
        <span className="font-mono text-sm font-bold text-primary">/ admin</span>
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="p-2 -mr-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <Menu className="size-5" />
        </button>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50 animate-in fade-in-0"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-dvh w-64 border-r border-border flex flex-col bg-card animate-in slide-in-from-left">
            <div className="px-4 h-14 flex items-center justify-between border-b border-border">
              <span className="font-mono text-sm font-bold text-primary">/ admin</span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="p-2 -mr-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>
            {navItems}
            {logoutButton}
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-52 shrink-0 border-r border-border flex-col min-h-dvh bg-card sticky top-0 self-start h-dvh">
        <div className="px-4 py-5 border-b border-border">
          <span className="font-mono text-sm font-bold text-primary">/ admin</span>
        </div>
        {navItems}
        {logoutButton}
      </aside>
    </>
  );
}
