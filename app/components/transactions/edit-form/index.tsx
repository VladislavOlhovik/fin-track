'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';

import {
  Button,
  DataListInput,
  ErrorMessage,
  Input,
} from '@/components';
import {
  CategoryIcon,
  DescriptionIcon,
} from '@/components/icons';
import { updateTransaction } from '@/dbAPI/actions';
import {
  TransactionType,
  TransactionUpdateStateType,
  categoryOptions,
} from '@/lib/definitions';

interface EditTransFormProps {
  transaction: TransactionType;
  backPath: string;
}

export function EditTransForm({
  transaction,
  backPath,
}: EditTransFormProps) {
  const initialState: TransactionUpdateStateType = {
    message: null,
    errors: {},
  };

  const [state, dispatch] = useFormState(
    updateTransaction.bind(
      null,
      transaction.transaction_id,
      backPath
    ),
    initialState
  );

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-100 p-4 md:p-6">
        {/* Category */}
        <DataListInput
          title="Category"
          inputName="category"
          defaultValue={transaction.category}
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
          defaultValue={transaction.description}
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
        <ErrorMessage errorMessage={state.message} />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={backPath}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Transaction</Button>
      </div>
    </form>
  );
}
