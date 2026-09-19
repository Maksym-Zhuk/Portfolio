'use client';

import type { IMenu } from '@/types/menu';
import { Menu } from '@/constants/menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useActiveSection } from '@/hooks/useActiveSection';

const SECTION_IDS = Menu.filter((item) => item.link.startsWith('/#')).map(
  (item) => item.link.slice(2),
);

export default function Nav() {
  const pathname = usePathname();
  const activeSection = useActiveSection(SECTION_IDS);

  return (
    <nav className="md:flex hidden" aria-label="Main navigation">
      <ul className="flex items-center gap-1">
        {Menu.map((item: IMenu) => {
          const isActive =
            item.link === '/'
              ? pathname === '/' && activeSection === ''
              : pathname === '/' && activeSection === item.link.slice(2);

          return (
            <li key={item.id}>
              <Link
                href={item.link}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-mono text-sm transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-primary ${
                  isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                <span className="text-primary/60 select-none">~/</span>
                {item.title.toLowerCase()}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
