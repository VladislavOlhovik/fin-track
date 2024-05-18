import { Metadata } from 'next';

import { Breadcrumbs } from '@/components';
import { AccountForm } from '@/components/accounts';
import { fetchAccountById } from '@/dbAPI/data';

export const metadata: Metadata = {
  title: 'Edit Account',
};

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const account = await fetchAccountById(id);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: 'Accounts',
            href: '/dashboard/accounts',
          },
          {
            label: 'Edit Account',
            href: `/dashboard/accounts/${id}/edit`,
            active: true,
          },
        ]}
      />
      <AccountForm account={account} />
    </main>
  );
}
