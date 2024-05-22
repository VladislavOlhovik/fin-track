import { Metadata } from 'next';
import { Suspense } from 'react';

import {
  CreateButton,
  Pagination,
  Search,
  TransactionsTableSkeleton,
} from '@/components';
import { TransactionsTable } from '@/components/transactions';
import { fetchTransactionsPages } from '@/dbAPI/data';

export const metadata: Metadata = {
  title: 'Transactions',
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
  const totalPages = await fetchTransactionsPages(query);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Transactions</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search transactions..." />
        <CreateButton
          title="Create Transaction"
          href="/dashboard/transactions/create"
        />
      </div>
      <Suspense
        key={query + currentPage}
        fallback={<TransactionsTableSkeleton />}
      >
        <TransactionsTable
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
