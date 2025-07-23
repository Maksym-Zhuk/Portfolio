'use client';

import Image from 'next/image';
import Nav from './Nav/Nav';
import FullScreenNav from './Nav/FullScreenNav';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useBodyScrollLock(isOpen);

  return (
    <header
      className={`w-full h-[8dvh] sticky top-0 flex justify-center items-center xl:px-20 px-3 sm:px-10 pt-3 z-3 ${isOpen ? 'bg-[#171717]' : 'bg-transparent'} `}
    >
      <div className="w-full h-full bg-[#262626] rounded-3xl flex md:justify-center justify-end items-center px-4 relative">
        <div className="absolute left-5">
          <Image
            src={'/Maksym Zhuk.png'}
            alt="Logo"
            width={50}
            height={50}
            className="rounded-sm"
          />
        </div>
        <Nav />
        <FullScreenNav isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </header>
  );
}
