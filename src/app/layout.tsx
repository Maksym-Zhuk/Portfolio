import type { Metadata } from 'next';
import './globals.css';
import { Syne, JetBrains_Mono } from 'next/font/google';
import { Providers } from '@/providers/providers';
import { Toaster } from '@/components/ui/sonner';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  icons: '/Maksym_Zhuk.svg',
  title: 'Maksym Zhuk — Backend Engineer',
  description:
    'Backend-first developer building high-performance, scalable systems. Rust enthusiast and lead developer at Oxide.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${syne.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
