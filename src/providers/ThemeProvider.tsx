'use client';
import { ThemeProvider } from 'next-themes';
import React, { useEffect, useState } from 'react';

export default function ThemesProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
