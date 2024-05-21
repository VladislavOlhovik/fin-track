import type { Metadata } from 'next';

import { inter } from '@/fonts';

import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | FinTrack',
    default: 'FinTrack App',
  },
  description: 'Keep your money ander control',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
