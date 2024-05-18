import { Metadata } from 'next';

import { TransferForm } from '@/components/transfer';
import { fetchAccounts } from '@/dbAPI/data';

export const metadata: Metadata = {
  title: 'Transfer',
};

export default async function Page() {
  const accounts = await fetchAccounts();
  return (
    <div className="w-full">
      <div className="flex w-full mb-4 items-center justify-between">
        <h1 className="text-2xl">Make Transfer</h1>
      </div>
      <TransferForm accounts={accounts} />
    </div>
  );
}
