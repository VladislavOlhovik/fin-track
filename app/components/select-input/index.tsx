import { ReactNode } from 'react';

interface SelectInputProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  title: string;
  selectName: string;
  placeholder: string;
  options:
    | string[]
    | {
        account_id: string;
        bank_name: string;
        account_name: string;
        account_type: string;
        currency: string;
      }[];
  errorNode?: ReactNode;
  icon: ReactNode;
}

export const SelectInput = ({
  title,
  selectName,
  options,
  placeholder,
  icon,
  errorNode,
  ...props
}: SelectInputProps) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={selectName}
        className="mb-2 block text-sm font-medium"
      >
        {title}
      </label>
      <div className="relative">
        <select
          id={selectName}
          name={selectName}
          className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          style={{ WebkitPaddingStart: '2.5rem' }}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map(option => {
            if (typeof option !== 'string') {
              const {
                account_id,
                account_name,
                account_type,
                bank_name,
                currency,
              } = option;
              return (
                <option key={account_id} value={account_id}>
                  {bank_name} - {account_type} -{' '}
                  {account_name} - {currency}
                </option>
              );
            }
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          })}
        </select>
        {icon}
      </div>
      {errorNode}
    </div>
  );
};
