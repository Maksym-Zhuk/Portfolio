'use client';
import { Button } from '@/components/ui/button';
import type { IMenu } from '@/types/menu';
import { Menu } from '@/constants/menu';
import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="md:flex hidden">
      <ul className="flex lg:gap-10 gap-5">
        {Menu.map((item: IMenu) => (
          <li key={item.id}>
            <Button variant={'link'} className="text-base">
              <Link href={item.link}>{`<${item.title}\ />`}</Link>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
