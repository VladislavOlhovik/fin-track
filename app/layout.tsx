import type { Metadata } from 'next';

import { inter } from '@/fonts';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(
    'https://fin-track-eosin.vercel.app'
  ),
  title: {
    template: '%s | FinTrack',
    default: 'FinTrack - Your Financial Dashboard',
  },
  description:
    'FinTrack - Consolidate all your bank accounts, transactions, income, and spendings in one place to easily track and manage your finances.',
  keywords: [
    'bank accounts',
    'transactions',
    'income',
    'spendings',
    'finance',
    'tracking',
    'management',
    'dashboard',
  ],
  authors: [
    {
      name: 'Uladzislau Alkhovik',
      url: 'https://vladislavolhovik.github.io/Portfolio/ ',
    },
  ],
  creator: 'Uladzislau Alkhovik',
  openGraph: {
    title: 'FinTrack - Your Financial Dashboard',
    description:
      'Consolidate all your bank accounts, transactions, income, and spendings in one place to easily track and manage your finances.',
    type: 'website',
    url: 'https://fin-track-eosin.vercel.app',
    images: [
      {
        url: '/coin.png',
        width: 800,
        height: 600,
        alt: 'FinTrack - Your Financial Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@olhovik44918',
    creator: '@olhovik44918',
    title: 'FinTrack - Your Financial Dashboard',
    description:
      'Consolidate all your bank accounts, transactions, income, and spendings in one place to easily track and manage your finances.',
    images: '/coin.png',
  },
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} md:overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
