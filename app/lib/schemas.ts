import { z } from 'zod';

export const AccountFormSchema = z.object({
  bank_name: z.string().min(1, 'Please enter a Bank Name'),
  account_name: z
    .string()
    .min(1, 'Please enter an Account Name'),
  account_type: z.string({
    invalid_type_error: 'Please choose an Account Type',
  }),
  currency: z.string().min(1, 'Please enter a currency'),
  balance: z.coerce.number(),
});

export const TransactionFormSchema = z.object({
  account_id: z.string({
    invalid_type_error: 'Please choose an Account',
  }),
  amount: z.coerce.number().nonnegative(),
  transaction_type: z.enum(['expense', 'income'], {
    invalid_type_error: 'Please choose a Type',
  }),
  description: z
    .string()
    .min(1, 'Please enter a Description'),
  category: z.string().min(1, 'Please choose a Category'),
});

export const TransactionUpadateSchema =
  TransactionFormSchema.pick({
    category: true,
    description: true,
  });

export const TransferFormSchema = z.object({
  account_id_from: z.string(),
  account_id_to: z.string(),
  description: z
    .string()
    .min(1, 'Please enter a description'),
  amount: z.coerce.number().nonnegative(),
});

export const NewUserSchema = z.object({
  name: z.string().min(1, 'Please enter a user name.'),
  email: z
    .string({
      invalid_type_error: 'Please enter a valid email.',
    })
    .email(),
  password: z
    .string({
      invalid_type_error: 'Please enter a valid password.',
    })
    .min(6),
});
