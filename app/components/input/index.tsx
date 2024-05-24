import { ReactNode } from 'react';

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  inputName: string;
  icon: ReactNode;
  errorNode?: ReactNode;
}

export const Input = ({
  title,
  inputName,
  icon,
  errorNode,
  ...props
}: InputProps) => {
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
            {...props}
            id={inputName}
            name={inputName}
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
