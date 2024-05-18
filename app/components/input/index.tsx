import { ReactNode } from 'react';

export const Input = ({
  title,
  errorNode,
  inputName,
  icon,
  inputType,
  ...rest
}: {
  title: string;
  placeholder: string;
  inputName: string;
  inputType:
    | 'number'
    | 'text'
    | 'name'
    | 'email'
    | 'password';
  icon: ReactNode;
  step?: string;
  errorNode?: ReactNode;
  defaultValue?: string | number;
  minLength?: number;
  required?: boolean;
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={inputName}
        className="mb-2 block text-sm font-medium"
      >
        {title}
      </label>
      <div className="relative mt-2 rounded-md">
        <div className="relative">
          <input
            id={inputName}
            name={inputName}
            type={inputType}
            {...rest}
            aria-describedby="customer-error"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          />
          {icon}
        </div>
        {errorNode}
      </div>
    </div>
  );
};
