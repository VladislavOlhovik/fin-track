import { Metadata } from 'next';

import { Breadcrumbs, DeleteButton } from '@/components';
import { AccountForm } from '@/components/accounts';
import { fetchAccountById } from '@/dbAPI/data';
import { deleteAccount } from '@/dbAPI/actions';

export const metadata: Metadata = {
  title: 'Edit Account',
};

interface PageProps {
  params: { id: string };
}

export default async function Page({
  params: { id },
}: PageProps) {
  const account = await fetchAccountById(id);
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
              label: 'Edit Account',
              href: `/dashboard/accounts/${id}/edit`,
              active: true,
            },
          ]}
        />
        <DeleteButton
          className="bg-red-200 hover:bg-red-400"
          action={deleteAccount.bind(
            null,
            account.account_id
          )}
        />
      </div>
      <AccountForm account={account} />
    </main>
  );
}
