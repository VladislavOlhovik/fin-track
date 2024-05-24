'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { AuthError } from 'next-auth';

import { amountToCents } from '@/lib/utils';
import {
  AccountStateType,
  TransactionStateType,
  TransactionUpdateStateType,
  TransferStateType,
  UserStateType,
} from '@/lib/definitions';
import {
  AccountFormSchema,
  NewUserSchema,
  TransactionFormSchema,
  TransactionUpadateSchema,
  TransferFormSchema,
} from '@/lib/schemas';
import { signIn } from '@/auth';

import { getUserId } from './data';

export async function createAccount(
  prevState: AccountStateType,
  formData: FormData
) {
  const user_id = await getUserId();
  const validatedFields = AccountFormSchema.safeParse({
    bank_name: formData.get('bank_name'),
    account_name: formData.get('account_name'),
    account_type: formData.get('account_type'),
    currency: formData.get('currency'),
    balance: formData.get('balance'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Fill to proceed',
    };
  }

  const {
    account_name,
    account_type,
    balance,
    bank_name,
    currency,
  } = validatedFields.data;
  const balanceInCents = amountToCents(balance);

  const currencyInUC = currency.toUpperCase();

  try {
    await sql`
      INSERT INTO accounts (user_id, bank_name, account_name, account_type,currency, balance)
      VALUES (${user_id}, ${bank_name}, ${account_name}, ${account_type}, ${currencyInUC},${balanceInCents})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Account.',
    };
  }
  revalidatePath('/dashboard/accounts');
  redirect('/dashboard/accounts');
}

export async function updateAccount(
  account_id: string,
  prevState: AccountStateType,
  formData: FormData
) {
  const validatedFields = AccountFormSchema.safeParse({
    bank_name: formData.get('bank_name'),
    account_name: formData.get('account_name'),
    account_type: formData.get('account_type'),
    currency: formData.get('currency'),
    balance: formData.get('balance'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Account.',
    };
  }

  const {
    account_name,
    account_type,
    balance,
    bank_name,
    currency,
  } = validatedFields.data;

  const balanceInCents = amountToCents(balance);
  const currencyInUC = currency.toUpperCase();

  try {
    await sql`
    UPDATE accounts
    SET 
    account_name = ${account_name},
    account_type = ${account_type},
    balance = ${balanceInCents},
    bank_name = ${bank_name}, 
    currency = ${currencyInUC}
    WHERE account_id = ${account_id}
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Account.',
    };
  }
  revalidatePath('/dashboard/accounts');
  redirect('/dashboard/accounts');
}

export const deleteAccount = async (account_id: string) => {
  // transactions will be deleted by sql automatically
  try {
    await sql`
      DELETE FROM accounts WHERE account_id = ${account_id};
      `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Delete Accounts.',
    };
  }
  revalidatePath('/dashboard/accounts');
  redirect('/dashboard/accounts');
};

export const deleteTransaction = async (
  transaction_id: string,
  account_id: string
) => {
  try {
    await sql`BEGIN;`;

    const { rows } = await sql`
            SELECT amount
            FROM transactions
            WHERE transaction_id = ${transaction_id};
        `;
    if (rows.length === 0) {
      throw new Error('Transaction not found');
    }
    const amountInCents = rows[0].amount;

    await sql`
      UPDATE accounts
      SET balance = balance - ${amountInCents}
      WHERE account_id = ${account_id};
    `;
    await sql`
      DELETE FROM transactions WHERE transaction_id = ${transaction_id};
    `;

    await sql`COMMIT;`;
  } catch (error) {
    await sql`ROLLBACK;`;
    return {
      message:
        'Database Error: Failed to Delete Transaction.',
    };
  }
  revalidatePath('/dashboard/transactions');
};

export async function createTransaction(
  prevState: TransactionStateType,
  formData: FormData
) {
  const date = new Date()
    .toISOString()
    .split('T')
    .join(' ');
  const validatedFields = TransactionFormSchema.safeParse({
    account_id: formData.get('account_id'),
    amount: formData.get('amount'),
    transaction_type: formData.get('transaction_type'),
    description: formData.get('description'),
    category: formData.get('category'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Fill to proceed',
    };
  }

  const {
    account_id,
    amount,
    category,
    description,
    transaction_type,
  } = validatedFields.data;

  let amountInCents = amountToCents(amount);
  if (transaction_type === 'expense') {
    amountInCents = -amountInCents;
  }

  try {
    await sql`BEGIN;`;

    await sql`
      INSERT INTO transactions (account_id, amount, transaction_type, transaction_date, description, category)
      VALUES (${account_id}, ${amountInCents}, ${transaction_type}, ${date}, ${description}, ${category});
    `;

    await sql`
      UPDATE accounts
      SET balance = balance + ${amountInCents}
      WHERE account_id = ${account_id};
    `;

    await sql`COMMIT;`;
  } catch (error) {
    await sql`ROLLBACK;`;
    return {
      message:
        'Database Error: Failed to Create Transaction.',
    };
  }
  revalidatePath('/dashboard/transactions');
  redirect('/dashboard/transactions');
}

export const updateTransaction = async (
  transaction_id: string,
  prevState: TransactionUpdateStateType,
  formData: FormData
) => {
  const validatedFields =
    TransactionUpadateSchema.safeParse({
      category: formData.get('category'),
      description: formData.get('description'),
    });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Fill to proceed',
    };
  }
  const { category, description } = validatedFields.data;
  try {
    await sql`
    UPDATE transactions
    SET 
    category = ${category},
    description = ${description}
    WHERE transaction_id = ${transaction_id};
    `;
  } catch (error) {
    return {
      message:
        'Database Error: Failed to Update Transaction.',
    };
  }
  revalidatePath('/dashboard/transactions');
  redirect('/dashboard/transactions');
};

export const makeTransfer = async (
  prevState: TransferStateType,
  formData: FormData
) => {
  const validatedFields = TransferFormSchema.safeParse({
    account_id_from: formData.get('account_id_from'),
    account_id_to: formData.get('account_id_to'),
    description: formData.get('description'),
    amount: formData.get('amount'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Fill to proceed',
    };
  }
  const {
    account_id_from,
    account_id_to,
    amount,
    description,
  } = validatedFields.data;

  if (Object.is(account_id_from, account_id_to)) {
    return {
      message: 'Choose different accounts',
    };
  }
  const date = new Date()
    .toISOString()
    .split('T')
    .join(' ');

  const amountInCents = amountToCents(amount);
  const negativeAmountInCents = -amountInCents;
  try {
    await sql`BEGIN;`;

    await sql`
      INSERT INTO transactions (account_id, amount, transaction_type, transaction_date, description, category)
      VALUES (${account_id_from}, ${negativeAmountInCents}, 'out', ${date}, ${description}, 'transfer');
    `;
    await sql`
      INSERT INTO transactions (account_id, amount, transaction_type, transaction_date, description, category)
      VALUES (${account_id_to}, ${amountInCents}, 'in', ${date}, ${description}, 'transfer');
    `;

    await sql`
      UPDATE accounts
      SET balance = balance - ${amountInCents}
      WHERE account_id = ${account_id_from};
    `;
    await sql`
      UPDATE accounts
      SET balance = balance + ${amountInCents}
      WHERE account_id = ${account_id_to};
    `;

    await sql`COMMIT;`;
  } catch (error) {
    await sql`ROLLBACK;`;
    return {
      message: 'Database Error: Failed to make transfer.',
    };
  }

  revalidatePath('/dashboard/transactions');
  redirect('/dashboard/transactions');
};

//-----------------auth actions-----------------

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function createUser(
  prevState: UserStateType,
  formData: FormData
) {
  const validatedFields = NewUserSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create User.',
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    const existingUser = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

    if (existingUser.rows.length > 0) {
      return {
        message: 'User already exists with this email.',
      };
    }
    const userCount = await sql`
      SELECT * FROM users
    `;
    if (userCount.rowCount > 3) {
      return {
        message:
          'Sorry, There is no extra space for you, Ask Vlad to make room for you',
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await sql`
        INSERT INTO users ( name, email, password)
        VALUES (${name}, ${email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create User.',
    };
  }
  redirect('/signin');
}
