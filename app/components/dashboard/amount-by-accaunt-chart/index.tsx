import { TotalAmountIcon } from '@/components/icons';
import { DonutChart } from '@/components/charts';

export async function AmountByAccauntChart({
  data,
}: {
  data: { value: number; name: string }[];
}) {
  return (
    <div className="w-full md:col-span-4">
      <h2 className="mb-4 text-xl md:text-2xl">
        Total Amount of Money by Accounts
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
            <TotalAmountIcon className="h-8 w-8" />
          </div>
          <h3 className="ml-2 text-sm text-gray-500 ">
            The donut chart above shows the distribution of
            total funds across various accounts. Each
            segment represents a specific account.
          </h3>
        </div>
      </div>
    </div>
  );
}
