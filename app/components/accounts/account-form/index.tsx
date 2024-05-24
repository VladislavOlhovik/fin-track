'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';

import {
  Button,
  DataListInput,
  ErrorMessage,
  Input,
  SelectInput,
} from '@/components';
import {
  AccountIcon,
  AccountTypeIcon,
  BankIcon,
  CashIcon,
  CoinIcon,
} from '@/components/icons';
import {
  createAccount,
  updateAccount,
} from '@/dbAPI/actions';
import {
  AccountKind,
  AccountStateType,
  AccountType,
  majorCurrencies,
} from '@/lib/definitions';

export function AccountForm({
  account,
}: {
  account?: AccountType;
}) {
  const initialState: AccountStateType = {
    message: null,
    errors: {},
  };
  const isActionCreate = !account;
  const accountAction = isActionCreate
    ? createAccount
    : updateAccount.bind(null, account.account_id);

  const [state, dispatch] = useFormState(
    accountAction,
    initialState
  );

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-100 p-4 md:p-6">
        {/* Bank Name */}
        <Input
          title="Bank Name"
          inputName="bank_name"
          type="text"
          placeholder="Enter Bank Name"
          defaultValue={
            isActionCreate ? '' : account.bank_name
          }
          icon={
            <BankIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          }
          errorNode={
            <ErrorMessage
              errors={state.errors?.bank_name}
            />
          }
        />
        {/* Account Name */}
        <Input
          title="Account Name"
          inputName="account_name"
          type="text"
          placeholder="Enter Account Name"
          defaultValue={
            isActionCreate ? '' : account.account_name
          }
          icon={
            <AccountIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          }
          errorNode={
            <ErrorMessage
              errors={state.errors?.account_name}
            />
          }
        />
        {/* Account type */}
        <SelectInput
          title="Account type"
          selectName="account_type"
          placeholder="Choose Account type"
          options={AccountKind}
          defaultValue={
            isActionCreate ? '' : account.account_type
          }
          icon={
            <AccountTypeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          }
          errorNode={
            <ErrorMessage
              errors={state.errors?.account_type}
            />
          }
        />
        {/* Currency */}
        <DataListInput
          title="Currency"
          inputName="currency"
          placeholder="Currency"
          options={majorCurrencies}
          defaultValue={
            isActionCreate ? '' : account.currency
          }
          icon={
            <CashIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          }
          errorNode={
            <ErrorMessage errors={state.errors?.currency} />
          }
        />
        {/* Balance */}
        <Input
          title="Balance"
          inputName="balance"
          placeholder="Enter amount"
          type="number"
          step="0.01"
          defaultValue={
            isActionCreate ? '' : account.balance
          }
          icon={
            <CoinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          }
          errorNode={
            <ErrorMessage errors={state.errors?.balance} />
          }
        />
        <ErrorMessage errorMessage={state.message} />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/accounts"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">
          {isActionCreate ? 'Create' : 'Edit'} Account
        </Button>
      </div>
    </form>
  );
}
