import { DeleteButton, UpdateButton } from '@/components';
import { deleteAccount } from '@/dbAPI/actions';
import { fetchFilteredAccounts } from '@/dbAPI/data';

export async function AccountsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const accounts = await fetchFilteredAccounts(
    query,
    currentPage
  );
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-200 p-2 md:pt-0">
          <div className="md:hidden">
            {accounts.map(account => (
              <div
                key={account.account_id}
                className={`mb-2 w-full rounded-md ${account.balance[0] === '-' ? 'bg-red-50' : 'bg-white'} p-4`}
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{account.bank_name}</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {account.account_name}
                    </p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {account.balance}
                    </p>
                    <p>{account.currency}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateButton
                      href={`/dashboard/account/${account.account_id}/edit`}
                    />
                    <DeleteButton
                      action={deleteAccount.bind(
                        null,
                        account.account_id
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
                  Account Name
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium"
                >
                  Account type
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium"
                >
                  Balance
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
              {accounts.map(account => (
                <tr
                  key={account.account_id}
                  className={`w-full border-b py-3 text-sm last-of-type:border-none 
                  ${account.balance[0] === '-' ? 'bg-red-50' : 'bg-white'}
                  [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg 
                  [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg`}
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{account.bank_name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {account.account_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {account.account_type}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {account.balance}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {account.currency}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateButton
                        href={`/dashboard/accounts/${account.account_id}/edit`}
                      />
                      <DeleteButton
                        action={deleteAccount.bind(
                          null,
                          account.account_id
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
