const data = {
    accounts: [
        {
          account_id: 1,
          user_id: 1,
          bank_name: "Santander",
          account_name: "Santander USD",
          account_type: "checking",
          currency: "USD",
          balance: 1000.00
        },
        {
          account_id: 2,
          user_id: 1,
          bank_name: "BofA",
          account_name: "BofA Personal",
          account_type: "savings",
          currency: "EUR",
          balance: 1500.00
        },
        {
          account_id: 3,
          user_id: 2,
          bank_name: "Revolut",
          account_name: "Revolut",
          account_type: "checking",
          currency: "GBP",
          balance: 2000.00
        }
      ],
      transactions : [
        {
          transaction_id: 1,
          account_id: 1,
          amount: -200.00,
          transaction_type: "withdrawal",
          transaction_date: "2022-05-01T10:00:00Z",
          description: "ATM withdrawal",
          category: "Cash Withdrawal"
        },
        {
          transaction_id: 2,
          account_id: 1,
          amount: 500.00,
          transaction_type: "deposit",
          transaction_date: "2022-05-02T15:00:00Z",
          description: "Paycheck deposit",
          category: "Income"
        },
        {
          transaction_id: 3,
          account_id: 2,
          amount: -150.00,
          transaction_type: "transfer",
          transaction_date: "2022-05-03T20:00:00Z",
          description: "Transfer to savings",
          category: "Savings"
        },
        {
          transaction_id: 4,
          account_id: 2,
          amount: -80.00,
          transaction_type: "payment",
          transaction_date: "2022-05-04T12:00:00Z",
          description: "Grocery shopping",
          category: "Groceries"
        },
        {
          transaction_id: 5,
          account_id: 3,
          amount: -120.00,
          transaction_type: "payment",
          transaction_date: "2022-05-05T17:30:00Z",
          description: "Electricity bill",
          category: "Utilities"
        },
        {
          transaction_id: 1,
          account_id: 1,
          amount: -200.00,
          transaction_type: "withdrawal",
          transaction_date: "2022-05-01T10:00:00Z",
          description: "ATM withdrawal",
          category: "Cash Withdrawal"
        },
        {
          transaction_id: 2,
          account_id: 1,
          amount: 500.00,
          transaction_type: "deposit",
          transaction_date: "2022-05-02T15:00:00Z",
          description: "Paycheck deposit",
          category: "Income"
        },
        {
          transaction_id: 3,
          account_id: 2,
          amount: -150.00,
          transaction_type: "transfer",
          transaction_date: "2022-05-03T20:00:00Z",
          description: "Transfer to savings",
          category: "Savings"
        },
        {
          transaction_id: 4,
          account_id: 2,
          amount: -80.00,
          transaction_type: "payment",
          transaction_date: "2022-05-04T12:00:00Z",
          description: "Grocery shopping",
          category: "Groceries"
        },
        {
          transaction_id: 5,
          account_id: 3,
          amount: -120.00,
          transaction_type: "payment",
          transaction_date: "2022-05-05T17:30:00Z",
          description: "Electricity bill",
          category: "Utilities"
        },
        {
          transaction_id: 1,
          account_id: 1,
          amount: -200.00,
          transaction_type: "withdrawal",
          transaction_date: "2022-05-01T10:00:00Z",
          description: "ATM withdrawal",
          category: "Cash Withdrawal"
        },
        {
          transaction_id: 2,
          account_id: 1,
          amount: 500.00,
          transaction_type: "deposit",
          transaction_date: "2022-05-02T15:00:00Z",
          description: "Paycheck deposit",
          category: "Income"
        },
        {
          transaction_id: 3,
          account_id: 2,
          amount: -150.00,
          transaction_type: "transfer",
          transaction_date: "2022-05-03T20:00:00Z",
          description: "Transfer to savings",
          category: "Savings"
        },
        {
          transaction_id: 4,
          account_id: 2,
          amount: -80.00,
          transaction_type: "payment",
          transaction_date: "2022-05-04T12:00:00Z",
          description: "Grocery shopping",
          category: "Groceries"
        },
        {
          transaction_id: 5,
          account_id: 3,
          amount: -120.00,
          transaction_type: "payment",
          transaction_date: "2022-05-05T17:30:00Z",
          description: "Electricity bill",
          category: "Utilities"
        },
        {
          transaction_id: 1,
          account_id: 1,
          amount: -200.00,
          transaction_type: "withdrawal",
          transaction_date: "2022-05-01T10:00:00Z",
          description: "ATM withdrawal",
          category: "Cash Withdrawal"
        },
        {
          transaction_id: 2,
          account_id: 1,
          amount: 500.00,
          transaction_type: "deposit",
          transaction_date: "2022-05-02T15:00:00Z",
          description: "Paycheck deposit",
          category: "Income"
        },
        {
          transaction_id: 3,
          account_id: 2,
          amount: -150.00,
          transaction_type: "transfer",
          transaction_date: "2022-05-03T20:00:00Z",
          description: "Transfer to savings",
          category: "Savings"
        },
        {
          transaction_id: 4,
          account_id: 2,
          amount: -80.00,
          transaction_type: "payment",
          transaction_date: "2022-05-04T12:00:00Z",
          description: "Grocery shopping",
          category: "Groceries"
        },
        {
          transaction_id: 5,
          account_id: 3,
          amount: -120.00,
          transaction_type: "payment",
          transaction_date: "2022-05-05T17:30:00Z",
          description: "Electricity bill",
          category: "Utilities"
        },
        {
          transaction_id: 1,
          account_id: 1,
          amount: -200.00,
          transaction_type: "withdrawal",
          transaction_date: "2022-05-01T10:00:00Z",
          description: "ATM withdrawal",
          category: "Cash Withdrawal"
        },
        {
          transaction_id: 2,
          account_id: 1,
          amount: 500.00,
          transaction_type: "deposit",
          transaction_date: "2022-05-02T15:00:00Z",
          description: "Paycheck deposit",
          category: "Income"
        },
        {
          transaction_id: 3,
          account_id: 2,
          amount: -150.00,
          transaction_type: "transfer",
          transaction_date: "2022-05-03T20:00:00Z",
          description: "Transfer to savings",
          category: "Savings"
        },
        {
          transaction_id: 4,
          account_id: 2,
          amount: -80.00,
          transaction_type: "payment",
          transaction_date: "2022-05-04T12:00:00Z",
          description: "Grocery shopping",
          category: "Groceries"
        },
        {
          transaction_id: 5,
          account_id: 3,
          amount: -120.00,
          transaction_type: "payment",
          transaction_date: "2022-05-05T17:30:00Z",
          description: "Electricity bill",
          category: "Utilities"
        },
        {
          transaction_id: 1,
          account_id: 1,
          amount: -200.00,
          transaction_type: "withdrawal",
          transaction_date: "2022-05-01T10:00:00Z",
          description: "ATM withdrawal",
          category: "Cash Withdrawal"
        },
        {
          transaction_id: 2,
          account_id: 1,
          amount: 500.00,
          transaction_type: "deposit",
          transaction_date: "2022-05-02T15:00:00Z",
          description: "Paycheck deposit",
          category: "Income"
        },
        {
          transaction_id: 3,
          account_id: 2,
          amount: -150.00,
          transaction_type: "transfer",
          transaction_date: "2022-05-03T20:00:00Z",
          description: "Transfer to savings",
          category: "Savings"
        },
        {
          transaction_id: 4,
          account_id: 2,
          amount: -80.00,
          transaction_type: "payment",
          transaction_date: "2022-05-04T12:00:00Z",
          description: "Grocery shopping",
          category: "Groceries"
        },
        {
          transaction_id: 5,
          account_id: 3,
          amount: -120.00,
          transaction_type: "payment",
          transaction_date: "2022-05-05T17:30:00Z",
          description: "Electricity bill",
          category: "Utilities"
        },
        {
          transaction_id: 1,
          account_id: 1,
          amount: -200.00,
          transaction_type: "withdrawal",
          transaction_date: "2022-05-01T10:00:00Z",
          description: "ATM withdrawal",
          category: "Cash Withdrawal"
        },
        {
          transaction_id: 2,
          account_id: 1,
          amount: 500.00,
          transaction_type: "deposit",
          transaction_date: "2022-05-02T15:00:00Z",
          description: "Paycheck deposit",
          category: "Income"
        },
        {
          transaction_id: 3,
          account_id: 2,
          amount: -150.00,
          transaction_type: "transfer",
          transaction_date: "2022-05-03T20:00:00Z",
          description: "Transfer to savings",
          category: "Savings"
        },
        {
          transaction_id: 4,
          account_id: 2,
          amount: -80.00,
          transaction_type: "payment",
          transaction_date: "2022-05-04T12:00:00Z",
          description: "Grocery shopping",
          category: "Groceries"
        },
        {
          transaction_id: 5,
          account_id: 3,
          amount: -120.00,
          transaction_type: "payment",
          transaction_date: "2022-05-05T17:30:00Z",
          description: "Electricity bill",
          category: "Utilities"
        },
      ],
}
export const getLatestTransactions = () => {
  return data.transactions.map((el, i) => {
    const account = data.accounts.find(acc=> acc.account_id===el.account_id)
    return {...el, account_name: account.account_name, currency:account.currency}
  })
}

export const getTotalAmount = () => {
  return data.accounts.reduce((acc,el)=>{
    return acc+el.balance
  },0)
}
export const getAccounts = () => {
  return data.accounts
}