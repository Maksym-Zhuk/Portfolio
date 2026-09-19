import type { IMenu } from '../types/menu';

export const Menu: IMenu[] = [
  {
    id: 1,
    title: 'Home',
    link: '/',
  },
  {
    id: 2,
    title: 'Skills',
    link: '/#skills',
  },
  {
    id: 3,
    title: 'Projects',
    link: '/#projects',
  },
  {
    id: 4,
    title: 'Contacts',
    link: '/#contacts',
  },
];

export const SECTION_IDS = Menu.filter((item) => item.link.startsWith('/#')).map(
  (item) => item.link.slice(2),
);
