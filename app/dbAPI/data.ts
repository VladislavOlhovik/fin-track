import { unstable_noStore as noStore } from 'next/cache';
import { sql } from '@vercel/postgres';

import {
  AccountType,
  ITEMS_PER_PAGE,
  TransactionForTableType,
  TransactionType,
} from '@/lib/definitions';
import {
  aggregateBalancesByBank,
  formatCurrency,
  transformDataForCard,
} from '@/lib/utils';
import { auth } from '@/auth';

export const getUserId = async () => {
  const data = await auth();
  return data?.user?.id;
};

export async function fetchLatestTransactions() {
  const user_id = await getUserId();
  noStore();
  try {
    const data = await sql<TransactionForTableType>`
    SELECT t.*, a.account_name, a.bank_name, a.currency
    FROM transactions t
    JOIN accounts a ON t.account_id = a.account_id
    WHERE a.user_id = ${user_id}
    ORDER BY t.transaction_date DESC
    LIMIT 20;
        `;

    const transactions = data.rows.map(transaction => {
      return {
        ...transaction,
        amount: formatCurrency(
          transaction.amount,
          transaction.currency
        ),
      };
    });
    return transactions;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch Latest transactions.');
  }
}

export async function fetchFilteredAccounts(
  query: string,
  currentPage: number
) {
  noStore();
  const user_id = await getUserId();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const data = await sql<AccountType>`
    SELECT
    accounts.account_id,
    accounts.user_id,
    accounts.bank_name,
    accounts.account_name,
    accounts.account_type,
    accounts.currency,
    accounts.balance
  FROM accounts
  WHERE
    accounts.user_id = ${user_id} AND (
    accounts.bank_name ILIKE ${`%${query}%`} OR
    accounts.account_name ILIKE ${`%${query}%`} OR
    accounts.account_type ILIKE ${`%${query}%`} OR
    accounts.currency ILIKE ${`%${query}%`} OR
    accounts.balance::text ILIKE ${`%${query}%`}
    )
  ORDER BY accounts.bank_name
  LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `;

    const accounts = data.rows.map(account => {
      return {
        ...account,
        balance: formatCurrency(
          account.balance,
          account.currency
        ),
      };
    });
    return accounts;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch filtered accounts.');
  }
}

export async function fetchAccountsPages(query: string) {
  noStore();
  const user_id = await getUserId();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM accounts
    WHERE
      accounts.user_id = ${user_id} AND (
      accounts.bank_name ILIKE ${`%${query}%`} OR
      accounts.account_name ILIKE ${`%${query}%`} OR
      accounts.account_type ILIKE ${`%${query}%`} OR
      accounts.currency ILIKE ${`%${query}%`} OR
      accounts.balance::text ILIKE ${`%${query}%`}
      )
  `;
    const totalPages = Math.ceil(
      Number(count.rows[0].count) / ITEMS_PER_PAGE
    );
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(
      'Failed to fetch total number of accounts.'
    );
  }
}

export async function fetchAccountById(account_id: string) {
  noStore();
  const user_id = await getUserId();
  try {
    const data = await sql<AccountType>`
    SELECT
    accounts.account_id,
    accounts.user_id,
    accounts.bank_name,
    accounts.account_name,
    accounts.account_type,
    accounts.currency,
    accounts.balance
  FROM accounts
  WHERE
    accounts.user_id = ${user_id} AND 
    accounts.account_id = ${account_id}
        `;

    const account = data.rows.map(account => {
      return {
        ...account,
        balance: account.balance / 100,
      };
    });
    return account[0];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch account by id.');
  }
}
export async function fetchAccounts() {
  noStore();
  const user_id = await getUserId();

  try {
    const data = await sql<AccountType>`
    SELECT
    accounts.account_id,
    accounts.bank_name,
    accounts.account_name,
    accounts.account_type,
    accounts.currency,
    accounts.balance
  FROM accounts
  WHERE
    accounts.user_id = ${user_id}
        `;

    const accounts = data.rows;
    return accounts;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch accounts.');
  }
}

export async function fetchFilteredTransactions(
  query: string,
  currentPage: number
) {
  noStore();
  const user_id = await getUserId();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await sql<TransactionForTableType>`
    SELECT
       t.transaction_id,
       t.account_id,
       t.amount,
       t.transaction_type,
       t.transaction_date,
       t.description,
       t.category,
       a.account_name,
       a.bank_name,
       a.currency
    FROM transactions t
    JOIN accounts a ON t.account_id = a.account_id
    WHERE
       a.user_id = ${user_id} AND (
       t.transaction_type ILIKE ${`%${query}%`} OR
       t.transaction_date::text ILIKE ${`%${query}%`} OR
       t.description ILIKE ${`%${query}%`} OR
       t.category ILIKE ${`%${query}%`} OR
       t.amount::text ILIKE ${`%${query}%`} OR
       a.account_name ILIKE ${`%${query}%`} OR
       a.currency ILIKE ${`%${query}%`} OR
       a.bank_name ILIKE ${`%${query}%`}
       )
    ORDER BY t.transaction_date DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
`;

    const transactions = data.rows.map(transaction => {
      return {
        ...transaction,
        amount: formatCurrency(
          transaction.amount,
          transaction.currency
        ),
      };
    });
    return transactions;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error(
      'Failed to fetch Filtered transactions.'
    );
  }
}

export async function fetchTransactionsPages(
  query: string
) {
  noStore();
  const user_id = await getUserId();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM transactions t
    JOIN accounts a ON t.account_id = a.account_id
    WHERE
      a.user_id = ${user_id} AND (
        t.transaction_type ILIKE ${`%${query}%`} OR
        t.transaction_date::text ILIKE ${`%${query}%`} OR
        t.description ILIKE ${`%${query}%`} OR
        t.category ILIKE ${`%${query}%`} OR
        t.amount::text ILIKE ${`%${query}%`}
      )
  `;
    const totalPages = Math.ceil(
      Number(count.rows[0].count) / ITEMS_PER_PAGE
    );

    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(
      'Failed to fetch total number of transactions.'
    );
  }
}

export const fetchTransactionById = async (
  transaction_id: string
) => {
  noStore();
  try {
    const data = await sql<TransactionType>`
    SELECT
    transactions.transaction_id,
    transactions.account_id,
    transactions.amount,
    transactions.transaction_type,
    transactions.description,
    transactions.category
  FROM transactions
  WHERE
  transactions.transaction_id = ${transaction_id}
        `;

    const transaction = data.rows.map(tr => {
      return {
        ...tr,
        amount: tr.amount / 100,
      };
    });
    return transaction[0];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch transaction by id.');
  }
};

export const fetchCurrencyRate = async (
  currency: string
) => {
  try {
    const data = await fetch(
      `https://open.er-api.com/v6/latest/${currency}`
    );
    const rate = await data.json();
    if (rate.result === 'success') {
      return rate.rates;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getDashboardData = async (
  currency: string
) => {
  noStore();
  const ratesByCurrency = await fetchCurrencyRate(currency);
  const accounts = await fetchAccounts();

  return {
    cardData: transformDataForCard(
      accounts,
      ratesByCurrency,
      currency
    ),
    chartData: aggregateBalancesByBank(
      accounts,
      ratesByCurrency
    ),
  };
};
