import { UpdateButton } from '@/components';
import { fetchFilteredAccounts } from '@/dbAPI/data';
import { accountsTableColumns } from '@/lib/definitions';

interface AccountsTableProps {
  query: string;
  currentPage: number;
}

export async function AccountsTable({
  query,
  currentPage,
}: AccountsTableProps) {
  const accounts = await fetchFilteredAccounts(
    query,
    currentPage
  );
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-200 p-2 md:pt-0">
          <div className="md:hidden">
            {accounts.map(
              ({
                account_id,
                account_name,
                balance,
                bank_name,
                currency,
              }) => (
                <div
                  key={account_id}
                  className={`mb-2 w-full rounded-md ${balance[0] === '-' ? 'bg-red-50' : 'bg-white'} p-4`}
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <p>{bank_name}</p>
                      </div>
                      <p className="text-sm text-gray-500">
                        {account_name}
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between pt-4">
                    <div>
                      <p className="text-xl font-medium">
                        {balance}
                      </p>
                      <p>{currency}</p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <UpdateButton
                        href={`/dashboard/accounts/${account_id}/edit`}
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
                {accountsTableColumns.map(
                  (column, index) => {
                    return (
                      <th
                        scope="col"
                        className={`${index === 0 ? 'px-4 sm:pl-6' : 'px-3'} py-5 font-medium`}
                      >
                        {column}
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
              {accounts.map(
                ({
                  account_id,
                  account_name,
                  account_type,
                  balance,
                  bank_name,
                  currency,
                }) => (
                  <tr
                    key={account_id}
                    className={`w-full border-b py-3 text-sm last-of-type:border-none 
                  ${balance[0] === '-' ? 'bg-red-50' : 'bg-white'}
                  [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg 
                  [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg`}
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      {bank_name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {account_name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {account_type}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {balance}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {currency}
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <UpdateButton
                          href={`/dashboard/accounts/${account_id}/edit`}
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
}
