import { BankIcon } from '@/components/icons';
import { DonutChart } from '@/components/charts';

interface BalancesByBankChartProps {
  data: { value: number; name: string }[];
}

export async function BalancesByBankChart({
  data,
}: BalancesByBankChartProps) {
  return (
    <div className="w-full md:col-span-4">
      <h2 className="mb-4 text-xl md:text-2xl">
        Balances by Bank
      </h2>
      <div className="rounded-xl bg-gray-200 p-4">
        <div className="mt-0  rounded-md bg-white md:gap-4">
          <DonutChart
            data={data}
            name="Total Amount by Accounts"
          />
        </div>
        <div className="flex items-center pb-2 pt-6">
          <div>
            <BankIcon className="h-8 w-8" />
          </div>
          <h3 className="ml-2 text-sm text-gray-500 ">
            The donut chart above shows the distribution of
            total funds across various banks. Each segment
            represents a specific bank.
          </h3>
        </div>
      </div>
    </div>
  );
}
