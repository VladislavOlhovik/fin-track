import { ReactNode } from 'react';

import {
  CashIcon,
  TotalAmountIcon,
  InvestmentIcon,
  CreditIcon,
} from '@/components/icons';
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

interface CardProps {
  title: string;
  value: string;
  icon: ReactNode;
}

export function Card({ title, value, icon }: CardProps) {
  return (
    <div className="rounded-xl bg-gray-200 p-2 shadow-sm">
      <div className="flex p-4">
        {icon}
        <h3 className="ml-2 text-sm font-medium">
          {title}
        </h3>
      </div>
      <p
        className={`truncate rounded-xl ${value[0] === '-' ? 'bg-red-100' : 'bg-white'} px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
