import { LineChartWithDiff } from '@/components/charts';
import { ChartIcon } from '@/components/icons';

interface BalancesOverTimeProps {
  data: {
    date: string;
    total: number;
    difference: number | null;
  }[];
  currency: string;
}

export async function BalancesOverTime({
  data,
  currency,
}: BalancesOverTimeProps) {
  return (
    <div className="w-full md:col-span-4">
      <h2 className="mb-4 text-xl md:text-2xl">
        Balance over time
      </h2>
      <div className="w-full md:col-span-4">
        <div className="rounded-xl bg-gray-200 p-4">
          <div className="mt-0  rounded-md bg-white md:gap-4">
            <LineChartWithDiff
              title={`${currency}`}
              name={'total amount'}
              data={data}
            />
          </div>
          <div className="flex items-center pb-2 pt-6">
            <div>
              <ChartIcon className="h-8 w-8" />
            </div>
            <h3 className="ml-2 text-sm text-gray-500 ">
              The line chart above illustrates the changes
              in total balances over time.
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
