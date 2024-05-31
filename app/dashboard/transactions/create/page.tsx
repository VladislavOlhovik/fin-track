import { Metadata } from 'next';

import { Breadcrumbs } from '@/components';
import { CreateTransForm } from '@/components/transactions';
import { fetchAccounts } from '@/dbAPI/data';

export const metadata: Metadata = {
  title: 'Create transaction',
};

export default async function Page() {
  const accounts = await fetchAccounts();
  const transactionsPath = '/dashboard/transactions';
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: 'Transactions',
            href: transactionsPath,
          },
          {
            label: 'Create Transactions',
            href: '/dashboard/transactions/create',
            active: true,
          },
        ]}
      />
      <CreateTransForm
        accounts={accounts}
        backPath={transactionsPath}
      />
    </main>
  );
}
