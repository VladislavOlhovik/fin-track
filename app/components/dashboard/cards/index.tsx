import {
  CashIcon,
  TotalAmountIcon,
  InvestmentIcon,
  CreditIcon,
} from '@/components/icons';
import { ReactNode } from 'react';
import { CardDataType } from '@/lib/definitions';

const cardsMap = [
  {
    title: 'Total Amount',
    icon: <TotalAmountIcon className="h-6" />,
    value: 'total_amount',
  },
  {
    title: 'Available Cash',
    icon: <CashIcon className="h-6" />,
    value: 'cash_amount',
  },
  {
    title: 'Investment',
    icon: <InvestmentIcon className="h-6" />,
    value: 'investment_amount',
  },
  {
    title: 'Credit Debt',
    icon: <CreditIcon className="h-6" />,
    value: 'credit_amount',
  },
];

export async function CardWrapper({
  cardData,
}: {
  cardData: CardDataType;
}) {
  return (
    <>
      {cardsMap.map(({ icon, title, value }) => {
        return (
          <Card
            key={value}
            title={title}
            value={cardData[value as keyof CardDataType]}
            icon={icon}
          />
        );
      })}
    </>
  );
}

export function Card({
  title,
  value,
  icon,
}: {
  title: string;
  value: number | string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-xl bg-gray-200 p-2 shadow-sm">
      <div className="flex p-4">
        {icon}
        <h3 className="ml-2 text-sm font-medium">
          {title}
        </h3>
      </div>
      <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">
        {value}
      </p>
    </div>
  );
}
