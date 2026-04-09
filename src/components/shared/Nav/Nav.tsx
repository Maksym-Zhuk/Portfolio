'use client';

import type { IMenu } from '@/types/menu';
import { Menu } from '@/constants/menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="md:flex hidden" aria-label="Main navigation">
      <ul className="flex items-center gap-1">
        {Menu.map((item: IMenu) => {
          const isActive =
            item.link === '/'
              ? pathname === '/'
              : pathname === item.link || pathname.startsWith(item.link + '/');

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
