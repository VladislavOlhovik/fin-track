import { Metadata } from 'next';

import { Breadcrumbs } from '@/components';
import { CreateTransForm } from '@/components/transactions';
import { fetchAccountById } from '@/dbAPI/data';

export const metadata: Metadata = {
  title: 'Create transaction',
};

interface PageProps {
  params: { id: string };
}

export default async function Page({
  params: { id },
}: PageProps) {
  const account = await fetchAccountById(id);
  const accountPath = `/dashboard/accounts/${id}`;
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: 'Accounts',
            href: '/dashboard/accounts',
          },
          {
            label: `${account.account_name}`,
            href: accountPath,
          },
          {
            label: 'Create Transaction',
            href: `/dashboard/accounts/${id}/create_transaction`,
            active: true,
          },
        ]}
      />
      <CreateTransForm
        accounts={[account]}
        backPath={accountPath}
      />
    </main>
  );
}
