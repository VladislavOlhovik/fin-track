import { DeleteButton, LinkButton } from '@/components';
import { EditIcon } from '@/components/icons';

import {
  fetchFilteredTransactions,
  fetchFilteredTransactionsByAcc,
} from '@/dbAPI/data';
import { deleteTransaction } from '@/dbAPI/actions';
import { transactionsTableColumns } from '@/lib/definitions';

interface AllTransactionsTableProps {
  query: string;
  currentPage: number;
  editPath: string;
}

export async function AllTransactionsTable({
  query,
  currentPage,
  editPath,
}: AllTransactionsTableProps) {
  const transactions = await fetchFilteredTransactions(
    query,
    currentPage
  );
  return (
    <TransactionTableView
      editPath={editPath}
      transactions={transactions}
    />
  );
}

interface TransactionsByAccTableProps
  extends AllTransactionsTableProps {
  account_id: string;
  editPath: string;
}

export async function TransactionsByAccTable({
  query,
  currentPage,
  account_id,
  editPath,
}: TransactionsByAccTableProps) {
  const transactions = await fetchFilteredTransactionsByAcc(
    query,
    currentPage,
    account_id
  );
  return (
    <TransactionTableView
      transactions={transactions}
      editPath={editPath}
    />
  );
}

interface TransactionTableViewProps {
  transactions: {
    amount: string;
    transaction_date: string;
    transaction_id: string;
    account_id: string;
    transaction_type: string;
    description: string;
    category: string;
    bank_name: string;
    account_name: string;
    currency: string;
  }[];
  editPath: string;
}

const TransactionTableView = ({
  transactions,
  editPath,
}: TransactionTableViewProps) => {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-200 p-2 md:pt-0">
          <div className="md:hidden">
            {transactions.map(
              ({
                account_id,
                account_name,
                amount,
                bank_name,
                currency,
                description,
                transaction_id,
              }) => (
                <div
                  key={transaction_id}
                  className={`mb-2 w-full rounded-md p-4
                ${amount[0] === '-' ? 'bg-red-50' : 'bg-green-50'}`}
                >
                  <div className="flex w-full items-center justify-between border-b pb-4">
                    <div className="w-full">
                      <div className="mb-2 flex items-center">
                        <p>{bank_name}</p>
                      </div>
                      <div className="flex w-full justify-between">
                        <p className="text-sm text-gray-500">
                          {account_name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between pt-4">
                    <div>
                      <p className="text-xl font-medium">
                        {amount}
                      </p>
                      <p>{currency}</p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <LinkButton
                        href={`${editPath}/${transaction_id}/edit`}
                      >
                        <EditIcon className="h-5" />
                      </LinkButton>
                      <DeleteButton
                        action={deleteTransaction.bind(
                          null,
                          transaction_id,
                          account_id
                        )}
                      />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                {transactionsTableColumns.map(
                  (colunm, index) => {
                    return (
                      <th
                        key={index}
                        scope="col"
                        className={`${index === 0 ? 'px-4 sm:pl-6' : 'px-3'} py-5 font-medium`}
                      >
                        {colunm}
                      </th>
                    );
                  }
                )}
                <th
                  scope="col"
                  className="relative py-3 pl-6 pr-3"
                >
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {transactions.map(
                ({
                  account_id,
                  account_name,
                  amount,
                  bank_name,
                  category,
                  currency,
                  description,
                  transaction_date,
                  transaction_id,
                  transaction_type,
                }) => (
                  <tr
                    key={transaction_id}
                    className={`w-full border-b py-3 text-sm last-of-type:border-none 
                  [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg 
                  [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg
                  ${amount[0] === '-' ? 'bg-red-50' : 'bg-green-50'}`}
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <p>{bank_name}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {account_name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {category}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {description}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {transaction_date}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {transaction_type}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {amount}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {currency}
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <LinkButton
                          href={`${editPath}/${transaction_id}/edit`}
                        >
                          <EditIcon className="h-5" />
                        </LinkButton>
                        <DeleteButton
                          action={deleteTransaction.bind(
                            null,
                            transaction_id,
                            account_id
                          )}
                        />
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
