import { DeleteButton, UpdateButton } from '@/components';
import { fetchFilteredTransactions } from '@/dbAPI/data';
import { formatDateToLocal } from '@/lib/utils';
import { deleteTransaction } from '@/dbAPI/actions';

export async function TransactionsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const transactions = await fetchFilteredTransactions(
    query,
    currentPage
  );
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-200 p-2 md:pt-0">
          <div className="md:hidden">
            {transactions.map(transaction => (
              <div
                key={transaction.transaction_id}
                className={`mb-2 w-full rounded-md p-4
                ${transaction.amount[0] === '-' ? 'bg-red-50' : 'bg-green-50'}`}
              >
                <div className="flex w-full items-center justify-between border-b pb-4">
                  <div className="w-full">
                    <div className="mb-2 flex items-center">
                      <p>{transaction.bank_name}</p>
                    </div>
                    <div className="flex w-full justify-between">
                      <p className="text-sm text-gray-500">
                        {transaction.account_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {transaction.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {transaction.amount}
                    </p>
                    <p>{transaction.currency}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateButton
                      href={`/dashboard/transactions/${transaction.transaction_id}/edit`}
                    />
                    <DeleteButton
                      action={deleteTransaction.bind(
                        null,
                        transaction.transaction_id,
                        transaction.account_id
                      )}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-5 font-medium sm:pl-6"
                >
                  Bank
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium"
                >
                  Account
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium"
                >
                  Currency
                </th>
                <th
                  scope="col"
                  className="relative py-3 pl-6 pr-3"
                >
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {transactions.map(transaction => (
                <tr
                  key={transaction.transaction_id}
                  className={`w-full border-b py-3 text-sm last-of-type:border-none 
                  [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg 
                  [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg
                  ${transaction.amount[0] === '-' ? 'bg-red-50' : 'bg-green-50'}`}
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{transaction.bank_name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {transaction.account_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {transaction.category}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {transaction.description}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(
                      transaction.transaction_date
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {transaction.transaction_type}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {transaction.amount}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {transaction.currency}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateButton
                        href={`/dashboard/transactions/${transaction.transaction_id}/edit`}
                      />
                      <DeleteButton
                        action={deleteTransaction.bind(
                          null,
                          transaction.transaction_id,
                          transaction.account_id
                        )}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
