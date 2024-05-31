import { Metadata } from 'next';
import { Suspense } from 'react';

import {
  Breadcrumbs,
  CreateButton,
  Pagination,
  Search,
  TransactionsTableSkeleton,
} from '@/components';
import { ChartIcon } from '@/components/icons';
import { LineChart } from '@/components/charts';
import { TransactionsByAccTable } from '@/components/transactions';
import {
  fetchTransactionsByAccPages,
  fetchAccountData,
} from '@/dbAPI/data';

export const metadata: Metadata = {
  title: 'Account info',
};

interface PageProps {
  params: { id: string };
  searchParams?: {
    query?: string;
    page?: string;
  };
}

export default async function Page({
  params: { id },
  searchParams,
}: PageProps) {
  const { dates, values, account } =
    await fetchAccountData(id);

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchTransactionsByAccPages(
    query,
    id
  );
  return (
    <main>
      <div className="flex justify-between">
        <Breadcrumbs
          breadcrumbs={[
            {
              label: 'Accounts',
              href: '/dashboard/accounts',
            },
            {
              label: `${account.account_name}`,
              href: `/dashboard/accounts/${id}`,
              active: true,
            },
          ]}
        />
      </div>
      <div className="w-full md:col-span-4">
        <div className="rounded-xl bg-gray-200 p-4">
          <div className="mt-0  rounded-md bg-white md:gap-4">
            <LineChart
              title={`${account.bank_name} ${account.currency}`}
              name={account.account_name}
              xAxisData={dates}
              yAxisData={values}
            />
          </div>
          <div className="flex items-center pb-2 pt-6">
            <div>
              <ChartIcon className="h-8 w-8" />
            </div>
            <h3 className="ml-2 text-sm text-gray-500 ">
              The line chart above illustrates the changes
              in account balances over time.
            </h3>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search transactions..." />
        <CreateButton
          title="Create Transaction"
          href={`/dashboard/accounts/${id}/create_transaction`}
        />
      </div>
      <Suspense
        key={query + currentPage}
        fallback={<TransactionsTableSkeleton />}
      >
        <TransactionsByAccTable
          editPath={`/dashboard/accounts/${id}`}
          account_id={id}
          query={query}
          currentPage={currentPage}
        />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  );
}
