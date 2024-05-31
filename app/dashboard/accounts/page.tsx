import { Metadata } from 'next';
import { Suspense } from 'react';

import {
  CreateButton,
  Pagination,
  Search,
  AccountTableSkeleton,
} from '@/components';
import { AccountsTable } from '@/components/accounts';
import { fetchAccountsPages } from '@/dbAPI/data';

export const metadata: Metadata = {
  title: 'Accounts',
};

interface PageProps {
  searchParams?: {
    query?: string;
    page?: string;
  };
}

export default async function Page({
  searchParams,
}: PageProps) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchAccountsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Accounts</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search accounts..." />
        <CreateButton
          title="Create Account"
          href="/dashboard/accounts/create"
        />
      </div>
      <Suspense
        key={query + currentPage}
        fallback={<AccountTableSkeleton />}
      >
        <AccountsTable
          query={query}
          currentPage={currentPage}
        />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
