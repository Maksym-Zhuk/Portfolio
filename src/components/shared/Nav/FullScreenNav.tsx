'use client';
import { Divide as Hamburger } from 'hamburger-react';
import { Menu } from '@/constants/menu';
import type { IMenu } from '@/types/menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export default function FullScreenNav({ isOpen, setIsOpen }: Props) {
  const pathname = usePathname();

  return (
    <div>
      <div className="md:hidden flex">
        <Hamburger
          toggled={isOpen}
          toggle={() => setIsOpen(!isOpen)}
          size={20}
          color="currentColor"
          label={isOpen ? 'Close menu' : 'Open menu'}
        />
      </div>

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`absolute w-full top-14 left-0 bg-background border-t border-border ${
          isOpen ? 'flex' : 'hidden'
        }`}
        style={{ height: 'calc(100dvh - 3.5rem)' }}
      >
        <nav
          className="w-full h-full flex justify-center items-center"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col items-center gap-6 mb-[10dvh]">
            {Menu.map((item: IMenu) => {
              const isActive =
                item.link === '/'
                  ? pathname === '/'
                  : pathname === item.link ||
                    pathname.startsWith(item.link + '/');

              return (
                <li key={item.id}>
                  <Link
                    href={item.link}
                    onClick={() => setIsOpen(false)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex items-center gap-1 font-mono text-2xl transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-primary ${
                      isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span className="text-primary/50 select-none">~/</span>
                    {item.title.toLowerCase()}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
