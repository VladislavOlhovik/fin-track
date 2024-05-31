import {
  AccountKindType,
  AccountType,
  ExchangeRatesType,
  TransactionType,
} from './definitions';

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US'
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(
    locale,
    options
  );
  return formatter.format(date);
};

export const formatDateTimeToLocal = (
  dateStr: string,
  locale: string = 'en-US'
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  };
  const formatter = new Intl.DateTimeFormat(
    locale,
    options
  );
  return formatter.format(date);
};

export const generatePagination = (
  currentPage: number,
  totalPages: number
) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from(
      { length: totalPages },
      (_, i) => i + 1
    );
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [
      1,
      2,
      '...',
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export const formatCurrency = (
  amount: number,
  currency: string
) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: currency,
  });
};

export const amountToCents = (num: number) => {
  return Number((num * 100).toFixed(2));
};

export const exchangeCurrency = (
  balance: number,
  currency: string,
  rates: ExchangeRatesType
): number => {
  const rate = rates[currency];
  if (!rate)
    throw new Error(
      `No exchange rate found for currency: ${currency}`
    );
  return balance / rate;
};

const findAccountsByType = (
  accounts: AccountType[],
  type: AccountKindType
) => {
  return accounts.filter(
    account =>
      account.account_type.toLocaleLowerCase() === type
  );
};

const countTotalAmount = (
  accounts: AccountType[],
  rates: ExchangeRatesType,
  currency: string
) => {
  return formatCurrency(
    accounts.reduce((acc, { balance, currency }) => {
      return (acc =
        acc + exchangeCurrency(balance, currency, rates));
    }, 0),
    currency
  );
};

export const transformDataForCard = (
  accounts: AccountType[],
  rates: ExchangeRatesType,
  currency: string
) => {
  return {
    total_amount: countTotalAmount(
      accounts,
      rates,
      currency
    ),
    cash_amount: countTotalAmount(
      findAccountsByType(accounts, 'cash'),
      rates,
      currency
    ),
    investment_amount: countTotalAmount(
      findAccountsByType(accounts, 'investment'),
      rates,
      currency
    ),
    credit_amount: countTotalAmount(
      findAccountsByType(accounts, 'credit'),
      rates,
      currency
    ),
  };
};

export const aggregateBalancesByBank = (
  accounts: AccountType[],
  ratesByCurrency: ExchangeRatesType
) => {
  const banks = accounts.reduce<Record<string, number>>(
    (acc, { bank_name, balance, currency }) => {
      if (!acc[bank_name]) {
        acc[bank_name] = 0;
      }
      acc[bank_name] += exchangeCurrency(
        balance,
        currency,
        ratesByCurrency
      );
      return acc;
    },
    {}
  );
  return Object.entries(banks).map(([name, value]) => ({
    name,
    value: Number((value / 100).toFixed(2)),
  }));
};

export const aggregateAccountChangeData = (
  transactions: TransactionType[],
  account: AccountType
) => {
  const result = transactions.reduce<{
    dates: string[];
    values: number[];
  }>(
    (acc, el) => {
      const newBalance = acc.values[0] - el.amount;
      acc.values.unshift(newBalance);
      acc.dates.unshift(
        formatDateTimeToLocal(el.transaction_date)
      );
      return acc;
    },
    {
      dates: [],
      values: [amountToCents(account.balance)],
    }
  );
  result.dates.unshift(
    formatDateTimeToLocal(account.created_at)
  );

  return {
    ...result,
    values: result.values.map(el => el / 100),
    account,
  };
};

type DebounceFunction = (...args: any[]) => void;

export function debounce<F extends DebounceFunction>(
  func: F,
  wait: number
): F {
  let timeoutId: ReturnType<typeof setTimeout> | null =
    null;

  const debouncedFunction = function (
    this: any,
    ...args: Parameters<F>
  ) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };

  return debouncedFunction as F;
}
