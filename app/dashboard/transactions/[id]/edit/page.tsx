import { Metadata } from 'next';

import { Breadcrumbs } from '@/components';
import { EditTransForm } from '@/components/transactions';
import { fetchTransactionById } from '@/dbAPI/data';

export const metadata: Metadata = {
  title: 'Edit Transaction',
};

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const transaction = await fetchTransactionById(id);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: 'Transactions',
            href: '/dashboard/transactions',
          },
          {
            label: 'Edit Transactions',
            href: `/dashboard/transactions/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditTransForm transaction={transaction} />
    </main>
  );
}
