'use client';
import { Divide as Hamburger } from 'hamburger-react';
import { Menu } from '@/constants/menu';
import type { IMenu } from '@/types/menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export default function FullScreenNav({ isOpen, setIsOpen }: Props) {
  return (
    <div>
      <div className="md:hidden flex">
        <Hamburger toggled={isOpen} toggle={() => setIsOpen(!isOpen)} />
      </div>
      <div
        className={`absolute w-full h-[100dvh] top-14.5 left-0 bg-[#171717] ${isOpen ? 'flex' : 'hidden'}`}
      >
        <nav className="w-full h-full flex justify-center items-center">
          <ul className="flex flex-col justify-center items-center gap-10 mb-[10dvh]">
            {Menu.map((item: IMenu) => (
              <li key={item.id}>
                <Button
                  variant={'link'}
                  className="text-2xl"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href={item.link}>{`<${item.title}\ />`}</Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
