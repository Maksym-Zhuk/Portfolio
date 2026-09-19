import {
  LayoutDashboard,
  UserRound,
  Wrench,
  AtSign,
  FolderGit2,
  Building2,
} from 'lucide-react';

export const ADMIN_NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/about', label: 'About Me', icon: UserRound },
  { href: '/admin/skills', label: 'Skills', icon: Wrench },
  { href: '/admin/contacts', label: 'Contacts', icon: AtSign },
  { href: '/admin/projects', label: 'Projects', icon: FolderGit2 },
  { href: '/admin/organizations', label: 'Organizations', icon: Building2 },
];
