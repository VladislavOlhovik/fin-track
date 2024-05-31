import { Metadata } from 'next';

import { Breadcrumbs } from '@/components';
import { EditTransForm } from '@/components/transactions';
import { fetchTransactionById } from '@/dbAPI/data';

export const metadata: Metadata = {
  title: 'Edit Transaction',
};

interface PageProps {
  params: { id: string };
}

export default async function Page({
  params: { id },
}: PageProps) {
  const transactionsPath = '/dashboard/transactions';
  const transaction = await fetchTransactionById(id);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: 'Transactions',
            href: transactionsPath,
          },
          {
            label: 'Edit Transactions',
            href: `/dashboard/transactions/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditTransForm
        backPath={transactionsPath}
        transaction={transaction}
      />
    </main>
  );
}
