'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';

import {
  Button,
  ErrorMessage,
  Input,
  SelectInput,
} from '@/components';
import {
  BankIcon,
  CoinIcon,
  DescriptionIcon,
} from '@/components/icons';

import {
  AccountType,
  TransferStateType,
} from '@/lib/definitions';
import { makeTransfer } from '@/dbAPI/actions';

interface TransferFormProps {
  accounts: AccountType[];
}

export function TransferForm({
  accounts,
}: TransferFormProps) {
  const initialState: TransferStateType = {
    message: null,
    errors: {},
  };

  const [state, dispatch] = useFormState(
    makeTransfer,
    initialState
  );
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-100 p-4 md:p-6">
        {/* Account from */}
        <SelectInput
          title="Account from"
          placeholder="Select Account"
          selectName="account_id_from"
          options={accounts}
          icon={
            <BankIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          }
          errorNode={
            <ErrorMessage
              errors={state.errors?.account_id_from}
            />
          }
        />
        {/* Account to */}
        <SelectInput
          title="Account to"
          placeholder="Select Account"
          selectName="account_id_to"
          options={accounts}
          icon={
            <BankIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          }
          errorNode={
            <ErrorMessage
              errors={state.errors?.account_id_to}
            />
          }
        />
        {/* Description */}
        <Input
          title="Description"
          placeholder="Enter a description"
          type="text"
          inputName="description"
          icon={
            <DescriptionIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          }
          errorNode={
            <ErrorMessage
              errors={state.errors?.description}
            />
          }
        />
        {/* Amount */}
        <Input
          title="Amount"
          placeholder="Enter an amount"
          type="number"
          inputName="amount"
          step="0.01"
          icon={
            <CoinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          }
          errorNode={
            <ErrorMessage errors={state.errors?.amount} />
          }
        />
        <ErrorMessage errorMessage={state.message} />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Make transfer</Button>
      </div>
    </form>
  );
}
