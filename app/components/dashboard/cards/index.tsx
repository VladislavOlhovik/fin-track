import { getTotalAmount } from '@/API';
import {
  CashIcon,
  TotalAmountIcon,
  InvestmentIcon,
  CreditIcon,
} from '@/components/icons';
import { lusitana } from '@/fonts';

const iconMap = {
  totalAmount: <TotalAmountIcon className="h-6" />,
  availableCash: <CashIcon className="h-6" />,
  investment: <InvestmentIcon className="h-6" />,
  creditDebt: <CreditIcon className="h-6" />,
};

export async function CardWrapper() {
  return (
    <>
      <Card
        title="Total Amount"
        value={getTotalAmount()}
        type="totalAmount"
      />
      <Card
        title="Available Cash"
        value={1}
        type="availableCash"
      />
      <Card
        title="Investment"
        value={2}
        type="investment"
      />
      <Card
        title="Credit Debt"
        value={3}
        type="creditDebt"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type:
    | 'totalAmount'
    | 'availableCash'
    | 'investment'
    | 'creditDebt';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-200 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon}
        <h3 className="ml-2 text-sm font-medium">
          {title}
        </h3>
      </div>
      <p
        className={`${lusitana.className}
            truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
