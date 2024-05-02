'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import {
  AccountIcon,
  HomeIcon,
  TransactionIcon,
} from '@/components/icons';

const links = [
  {
    name: 'Home',
    href: '/dashboard',
    icon: <HomeIcon className="h-5" />,
  },
  {
    name: 'Transactions',
    href: '/dashboard/transactions',
    icon: <TransactionIcon className="h-5" />,
  },
  {
    name: 'Accounts',
    href: '/dashboard/accounts',
    icon: <AccountIcon className="h-5" />,
  },
];

export default function NavLinks() {
  const path = usePathname();

  return (
    <>
      {links.map(link => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex h-[48px] grow items-center 
            justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium 
            hover:bg-sky-100 hover:text-blue-600
            md:flex-none md:justify-start md:p-2 md:px-3
              ${path === link.href ? 'bg-sky-100 text-blue-600' : ''}
            `}
          >
            {link.icon}
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
