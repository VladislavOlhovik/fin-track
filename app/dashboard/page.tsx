import { Metadata } from 'next';

import {
  CardWrapper,
  LatestTransactions,
  MainCurrencyInput,
  AmountByAccauntChart,
} from '@/components/dashboard';
import { auth } from '@/auth';
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
  const { cardData, chartData } =
    await getDashboardData(currency);

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
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardWrapper cardData={cardData} />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <AmountByAccauntChart data={chartData} />
        <LatestTransactions />
      </div>
    </main>
  );
}
