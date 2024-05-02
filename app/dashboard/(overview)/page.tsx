import { Chart } from '@/components';
import {
  CardWrapper,
  LatestTransactions,
} from '@/components/dashboard';
// import RevenueChart from '@/app/ui/dashboard/revenue-chart';
// import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
// import { lusitana } from '@/app/ui/fonts';
// import { Suspense } from 'react';
// import {
//   LatestInvoicesSkeleton,
//   RevenueChartSkeleton,
//   CardsSkeleton,
// } from '@/app/ui/skeletons';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page() {
  return (
    <main>
      <h1 className={`mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* <Suspense fallback={<CardsSkeleton />}> */}
        <CardWrapper />
        {/* </Suspense> */}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* <Suspense fallback={<RevenueChartSkeleton />}> */}
        <Chart />
        {/* </Suspense> */}
        {/* <Suspense fallback={<LatestInvoicesSkeleton />}> */}
        <LatestTransactions />
        {/* </Suspense> */}
      </div>
    </main>
  );
}
