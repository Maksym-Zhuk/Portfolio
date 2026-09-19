import { Wrench, AtSign, Building2, Github, FolderGit2, ImageIcon } from 'lucide-react';

export const ADMIN_DASHBOARD_CARDS = [
  { label: 'Skills', key: 'skills' as const, href: '/admin/skills', icon: Wrench },
  { label: 'Contacts', key: 'contacts' as const, href: '/admin/contacts', icon: AtSign },
  { label: 'Feat. Orgs', key: 'organizations' as const, href: '/admin/organizations', icon: Building2 },
  { label: 'GitHub Orgs', key: 'githubOrgs' as const, href: '/admin/organizations', icon: Github },
  { label: 'Custom Projects', key: 'customProjects' as const, href: '/admin/projects', icon: FolderGit2 },
  { label: 'Project Images', key: 'projectImages' as const, href: '/admin/projects', icon: ImageIcon },
];
