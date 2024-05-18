import { RefreshIcon } from '@/components/icons';
import { fetchLatestTransactions } from '@/dbAPI/data';

export async function LatestTransactions() {
  const transactions = await fetchLatestTransactions();
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className="mb-4 text-xl md:text-2xl">
        Latest Transactions
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-200 p-4">
        <div className="bg-white  overflow-y-scroll h-96">
          {transactions.map((transaction, i) => {
            return (
              <div
                key={transaction.transaction_id}
                className={`flex flex-row items-center justify-between py-4 px-6
                  ${i !== 0 ? 'border-t' : ''}
                  ${transaction.amount[0] === '-' ? 'bg-red-50' : 'bg-green-50'}`}
              >
                <div className="flex-1">
                  {transaction.account_name}
                </div>
                <div className="flex flex-1 items-center">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {transaction.transaction_type}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {transaction.description}
                    </p>
                  </div>
                </div>
                <p className="flex justify-end flex-1 truncate text-sm font-medium md:text-base">
                  {transaction.amount}{' '}
                  {transaction.currency}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <RefreshIcon className="h-8" />
          <h3 className="ml-2 text-sm text-gray-500 ">
            Updated just now
          </h3>
        </div>
      </div>
    </div>
  );
}
