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
  BankIcon,
  CategoryIcon,
  CoinIcon,
  DescriptionIcon,
} from '@/components/icons';
import { createTransaction } from '@/dbAPI/actions';
import {
  AccountType,
  TransactionStateType,
  categoryOptions,
} from '@/lib/definitions';

interface CreateTransFormProps {
  accounts: AccountType[];
  backPath: string;
}

export function CreateTransForm({
  accounts,
  backPath,
}: CreateTransFormProps) {
  const initialState: TransactionStateType = {
    message: null,
    errors: {},
  };

  const [state, dispatch] = useFormState(
    createTransaction.bind(null, backPath),
    initialState
  );

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-100 p-4 md:p-6">
        {/* Account */}
        <SelectInput
          title="Choose Account"
          selectName="account_id"
          placeholder="Select Account"
          options={accounts}
          icon={
            <BankIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          }
          errorNode={
            <ErrorMessage
              errors={state.errors?.account_id}
            />
          }
        />
        {/* Category */}
        <DataListInput
          title="Category"
          inputName="category"
          defaultValue=""
          placeholder="Enter category"
          options={categoryOptions}
          icon={
            <CategoryIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          }
          errorNode={
            <ErrorMessage errors={state.errors?.category} />
          }
        />
        {/* Description */}
        <Input
          title="Description"
          inputName="description"
          type="text"
          placeholder="Enter a description"
          icon={
            <DescriptionIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          }
          errorNode={
            <ErrorMessage
              errors={state.errors?.description}
            />
          }
        />
        {/* Transaction type */}
        <fieldset className="mb-4">
          <legend className="mb-2 block text-sm font-medium">
            Transaction type
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="expense"
                  name="transaction_type"
                  type="radio"
                  value="expense"
                  aria-describedby="customer-error"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="expense"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-200 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Expense <CoinIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="income"
                  name="transaction_type"
                  type="radio"
                  value="income"
                  aria-describedby="customer-error"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="income"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Income <CoinIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <ErrorMessage
            errors={state.errors?.transaction_type}
          />
        </fieldset>
        {/* Amount */}
        <Input
          title="Amount"
          placeholder="Enter amount"
          inputName="amount"
          type="number"
          step="0.01"
          icon={
            <CoinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          }
          errorNode={
            <ErrorMessage errors={state.errors?.amount} />
          }
        />
        <ErrorMessage errorMessage={state.message} />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={backPath}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Transaction</Button>
      </div>
    </form>
  );
}
