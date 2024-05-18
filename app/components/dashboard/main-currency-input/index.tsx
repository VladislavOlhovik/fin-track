'use client';
import {
  usePathname,
  useSearchParams,
  useRouter,
} from 'next/navigation';
import { ChangeEvent } from 'react';

import { CoinIcon } from '@/components/icons';
import { majorCurrencies } from '@/lib/definitions';

export const MainCurrencyInput = ({
  currency,
}: {
  currency: string;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const currency = e.currentTarget.value;
    const params = new URLSearchParams(searchParams);
    params.set('currency', currency);
    replace(`${pathname}?${params}`);
  };

  return (
    <div className="mb-4">
      <div className="relative">
        <select
          id="currency"
          name="currency"
          onChange={handleChange}
          className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          defaultValue={currency}
        >
          {majorCurrencies.map(currency => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <CoinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
      </div>
    </div>
  );
};
