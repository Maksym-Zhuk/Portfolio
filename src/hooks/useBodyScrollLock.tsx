'use client';
import { useEffect } from 'react';

export function useBodyScrollLock(lock: boolean) {
  useEffect(() => {
    if (lock) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [lock]);
}
