import { Metadata } from 'next';

import { Breadcrumbs } from '@/components';
import { AccountForm } from '@/components/accounts';

export const metadata: Metadata = {
  title: 'Create Account',
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: 'Accounts',
            href: '/dashboard/accounts',
          },
          {
            label: 'Create Account',
            href: '/dashboard/accounts/create',
            active: true,
          },
        ]}
      />
      <AccountForm />
    </main>
  );
}
