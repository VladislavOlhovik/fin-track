import { ReactNode } from 'react';

interface DataListInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  inputName: string;
  options: string[];
  icon: ReactNode;
  errorNode: ReactNode;
}

export const DataListInput = ({
  title,
  inputName,
  options,
  icon,
  errorNode,
  ...props
}: DataListInputProps) => {
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
            list="input_list"
            type="text"
            aria-describedby="customer--error"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          />
          <datalist id="input_list">
            {options.map(el => {
              return <option key={el} value={el} />;
            })}
          </datalist>
          {icon}
        </div>
        {errorNode}
      </div>
    </div>
  );
};
