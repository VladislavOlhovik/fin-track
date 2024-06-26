import Link from 'next/link';

import { CoinIcon, PowerIcon } from '@/components/icons';

import { logOut } from '@/dbAPI/actions';

import NavLinks from '../nav-links';

export function Sidebar() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-40 justify-center rounded-md p-4  bg-gray-200 sm:bg-transparent"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <CoinIcon className="h-32 mx-auto my-0" />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-100 md:block"></div>
        <form action={logOut}>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-100 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="h-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
