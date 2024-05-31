import { Metadata } from 'next';

import { Breadcrumbs } from '@/components';
import { EditTransForm } from '@/components/transactions';
import {
  fetchAccountById,
  fetchTransactionById,
} from '@/dbAPI/data';

export const metadata: Metadata = {
  title: 'Edit Transaction',
};

interface PageProps {
  params: { id: string; transaction_id: string };
}

export default async function Page({
  params: { id, transaction_id },
}: PageProps) {
  const accountPath = `/dashboard/accounts/${id}`;
  const [{ account_name }, transaction] = await Promise.all(
    [
      fetchAccountById(id),
      fetchTransactionById(transaction_id),
    ]
  );

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: 'Accounts',
            href: '/dashboard/accounts',
          },
          {
            label: `${account_name}`,
            href: accountPath,
          },
          {
            label: 'Edit Transactions',
            href: `/dashboard/accounts/${id}/${transaction_id}/edit`,
            active: true,
          },
        ]}
      />
      <EditTransForm
        backPath={accountPath}
        transaction={transaction}
      />
    </main>
  );
}
