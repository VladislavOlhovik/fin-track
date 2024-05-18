import { ReactNode } from 'react';

export const SelectInput = ({
  title,
  placeholder,
  options,
  errorNode,
  selectName,
  icon,
  defaultValue,
}: {
  title: string;
  placeholder: string;
  defaultValue?: any;
  options:
    | string[]
    | {
        account_id: string;
        bank_name: string;
        account_name: string;
        account_type: string;
        currency: string;
      }[];
  selectName: string;
  errorNode?: ReactNode;
  icon: ReactNode;
}) => {
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
          defaultValue={defaultValue}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map(option => {
            if (typeof option !== 'string') {
              return (
                <option
                  key={option.account_id}
                  value={option.account_id}
                >
                  {option?.bank_name} -{' '}
                  {option?.account_type} -{' '}
                  {option?.account_name} -{' '}
                  {option?.currency}
                </option>
              );
            } else {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            }
          })}
        </select>
        {icon}
      </div>
      {errorNode}
    </div>
  );
};
