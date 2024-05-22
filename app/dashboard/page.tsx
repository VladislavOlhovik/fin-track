import { Metadata } from 'next';
import { Suspense } from 'react';

import { auth } from '@/auth';
import {
  CardWrapper,
  LatestTransactions,
  MainCurrencyInput,
  BalancesByBankChart,
} from '@/components/dashboard';
import { DashboardSkeleton } from '@/components';
import { getDashboardData } from '@/dbAPI/data';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: { currency?: string };
}) {
  const currency = searchParams?.currency || 'USD';

  const userData = await auth();

  return (
    <main>
      <div className="flex justify-between">
        <h1 className={`mb-4 text-xl md:text-2xl`}>
          Dashboard
        </h1>
        <div className="flex items-center">
          <h1 className={`mb-4 mr-4 text-xl md:text-2xl`}>
            Hi, {userData?.user?.name}
          </h1>
          <MainCurrencyInput currency={currency} />
        </div>
      </div>
      <Suspense
        key={currency}
        fallback={<DashboardSkeleton />}
      >
        <Dashboard currency={currency} />
      </Suspense>
    </main>
  );
}

const Dashboard = async ({
  currency,
}: {
  currency: string;
}) => {
  const { cardData, chartData } =
    await getDashboardData(currency);
  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardWrapper cardData={cardData} />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <BalancesByBankChart data={chartData} />
        <LatestTransactions />
      </div>
    </>
  );
};
