export const majorCurrencies: string[] = [
  'USD',
  'EUR',
  'PLN',
  'RUB',
  'CAD',
  'JPY',
  'GBP',
  'AUD',
  'CHF',
  'CNY',
  'SEK',
  'NZD',
  'MXN',
  'SGD',
  'HKD',
  'NOK',
  'KRW',
  'TRY',
  'INR',
  'BRL',
  'ZAR',
];

export const ITEMS_PER_PAGE = 6;
export const getArrItemsPerPage = () => {
  const array = [];
  for (let i = 0; i < ITEMS_PER_PAGE; i++) {
    array.push(i);
  }
  return array;
};

export const AccountKind = [
  'cash',
  'investment',
  'credit',
  'debit',
];

export const categoryOptions = ['bussines', 'personal'];

export const accountsTableColumns = [
  'Bank',
  'Account Name',
  'Account type',
  'Balance',
  'Currency',
];

export const transactionsTableColumns = [
  'Bank',
  'Account',
  'Category',
  'Description',
  'Date',
  'Type',
  'Amount',
  'Currency',
];

export type UserType = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type CardDataType = {
  total_amount: string;
  cash_amount: string;
  investment_amount: string;
  credit_amount: string;
};

export type TransactionType = {
  transaction_id: string;
  account_id: string;
  amount: number;
  transaction_type: string;
  transaction_date: string;
  description: string;
  category: string;
};

export type TransactionForTableType = TransactionType & {
  bank_name: string;
  account_name: string;
  currency: string;
};

export type AccountKindType =
  | 'cash'
  | 'investment'
  | 'credit'
  | 'debit';

export type AccountType = {
  account_id: string;
  user_id: string;
  bank_name: string;
  account_name: string;
  account_type: AccountKindType;
  currency: string;
  balance: number;
};

export type ExchangeRatesType = {
  [key: string]: number;
};

//schemas types
export type UserStateType = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export type AccountStateType = {
  errors?: {
    bank_name?: string[];
    account_name?: string[];
    account_type?: string[];
    currency?: string[];
    balance?: string[];
  };
  message?: string | null;
};

export type TransactionStateType = {
  errors?: {
    account_id?: string[];
    amount?: string[];
    transaction_type?: string[];
    description?: string[];
    category?: string[];
  };
  message?: string | null;
};

export type TransactionUpdateStateType = {
  errors?: {
    description?: string[];
    category?: string[];
  };
  message?: string | null;
};

export type TransferStateType = {
  errors?: {
    account_id_from?: string[];
    account_id_to?: string[];
    description?: string[];
    amount?: string[];
  };
  message?: string | null;
};
