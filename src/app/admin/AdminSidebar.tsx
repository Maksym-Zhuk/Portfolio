'use client';

import { startTransition } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/about', label: 'About Me' },
  { href: '/admin/skills', label: 'Skills' },
  { href: '/admin/contacts', label: 'Contacts' },
  { href: '/admin/projects', label: 'Projects' },
  { href: '/admin/organizations', label: 'Organizations' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    startTransition(() => {
      router.replace('/admin/login');
      router.refresh();
    });
  }

  return (
    <aside className="w-52 shrink-0 border-r border-border flex flex-col min-h-dvh bg-card">
      <div className="px-4 py-5 border-b border-border">
        <span className="font-mono text-sm font-bold text-primary">/ admin</span>
      </div>

      <nav className="flex-1 flex flex-col gap-0.5 p-2 pt-4">
        {NAV.map(({ href, label }) => {
          const active = href === '/admin' ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'px-3 py-2 rounded-lg text-sm font-mono transition-colors duration-150',
                active
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted',
              )}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-2 border-t border-border">
        <button
          onClick={handleLogout}
          className="w-full px-3 py-2 rounded-lg text-sm font-mono text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors duration-150 text-left"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
