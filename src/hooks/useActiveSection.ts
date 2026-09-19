'use client';

import { useEffect, useState } from 'react';

const HEADER_OFFSET = 120;

export function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      let current = '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - HEADER_OFFSET <= 0) {
          current = id;
        }
      }

      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (scrolledToBottom && ids.length > 0) {
        current = ids[ids.length - 1];
      }

      setActiveId(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [ids]);

  return activeId;
}
