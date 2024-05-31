'use client';

import Link from 'next/link';
import {
  usePathname,
  useSearchParams,
} from 'next/navigation';

import { generatePagination } from '@/lib/utils';
import { LeftArrowIcon, RightArrowIcon } from '../icons';

interface PaginationProps {
  totalPages: number;
}

export function Pagination({
  totalPages,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const allPages = generatePagination(
    currentPage,
    totalPages
  );
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  return (
    <>
      <div className="inline-flex">
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />

        <div className="flex -space-x-px">
          {allPages.map((page, index) => {
            let position:
              | 'first'
              | 'last'
              | 'single'
              | 'middle'
              | undefined;

            if (index === 0) position = 'first';
            if (index === allPages.length - 1)
              position = 'last';
            if (allPages.length === 1) position = 'single';
            if (page === '...') position = 'middle';

            return (
              <PaginationNumber
                key={page}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            );
          })}
        </div>

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </>
  );
}

interface PaginationNumberProps {
  page: number | string;
  href: string;
  position?: 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: PaginationNumberProps) {
  const className = `flex h-10 w-10 items-center justify-center text-sm border 
  ${
    position === 'first' || position === 'single'
      ? 'rounded-l-md '
      : ''
  }
  ${
    position === 'last' || position === 'single'
      ? 'rounded-r-md '
      : ''
  }
  ${
    isActive
      ? 'z-10 bg-blue-600 border-blue-600 text-white '
      : !isActive && position !== 'middle'
        ? 'hover:bg-gray-100 '
        : position === 'middle'
          ? 'text-gray-300 '
          : ''
  }`;

  return isActive || position === 'middle' ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

interface PaginationArrowProps {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: PaginationArrowProps) {
  const className = `
    flex h-10 w-10 items-center justify-center rounded-md border
    ${isDisabled ? 'pointer-events-none text-gray-300' : ''}
    ${!isDisabled ? 'hover:bg-gray-100' : ''}
    ${direction === 'left' ? 'mr-2 md:mr-4' : 'ml-2 md:ml-4'}`;

  const icon =
    direction === 'left' ? (
      <LeftArrowIcon className="w-4" />
    ) : (
      <RightArrowIcon className="w-4" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}
