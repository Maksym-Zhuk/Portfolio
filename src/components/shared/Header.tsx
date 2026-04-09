'use client';

import Image from 'next/image';
import Link from 'next/link';
import Nav from './Nav/Nav';
import FullScreenNav from './Nav/FullScreenNav';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useBodyScrollLock(isOpen);

  return (
    <header
      className={`w-full sticky top-0 z-30 px-3 sm:px-10 xl:px-20 pt-3 ${
        isOpen ? 'bg-background' : 'bg-transparent'
      }`}
    >
      <div className="w-full bg-card border border-border rounded-2xl flex justify-between items-center px-4 h-14">
        {/* Logo + full name → home */}
        <Link
          href="/"
          aria-label="Go to home page"
          className="flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-primary rounded-lg"
        >
          <div className="w-8 h-8 rounded border border-primary/40 flex items-center justify-center bg-primary/10 shrink-0">
            <Image
              src={'/Maksym Zhuk.png'}
              alt=""
              aria-hidden="true"
              width={24}
              height={24}
              className="rounded-sm"
            />
          </div>
          <span className="font-mono text-sm text-foreground font-semibold tracking-tight">
            Maksym Zhuk
          </span>
        </Link>

        {/* Desktop nav */}
        <Nav />

        {/* Mobile hamburger */}
        <FullScreenNav isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </header>
  );
}
