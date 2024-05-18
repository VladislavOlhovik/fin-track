import {
  CreateButton,
  Pagination,
  Search,
} from '@/components';
import { AccountsTable } from '@/components/accounts';
import { fetchAccountsPages } from '@/dbAPI/data';
// import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
// import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accounts',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
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
      {/* <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}> */}
      <AccountsTable
        query={query}
        currentPage={currentPage}
      />
      {/* </Suspense> */}
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
