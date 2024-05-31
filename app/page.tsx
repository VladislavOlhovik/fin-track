import Link from 'next/link';

import { Button } from '@/components';
import {
  CoinIcon,
  RightArrowIcon,
} from '@/components/icons';
import { DonutChart } from '@/components/charts';
import { exampleData } from '@/lib/definitions';

export default function Home() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex justify-center h-36 w-full items-center rounded-lg bg-gray-200 p-3 md:h-36">
          <div className="w-32 text-white md:w-32 ">
            <CoinIcon />
          </div>
        </div>
        <h1 className="text-center text-4xl">
          FinTrack App
        </h1>
        <h2 className="text-center text-2xl">
          keep your money ander control
        </h2>
        <DonutChart data={exampleData} name="example" />
        <div className="flex justify-around">
          <Link href={'/signup'}>
            <Button>
              <p>Sign Up</p>
              <RightArrowIcon className="ml-auto h-5 w-5 fill-white" />
            </Button>
          </Link>
          <Link href={'/signin'}>
            <Button>
              <p>Sign In</p>
              <RightArrowIcon className="ml-auto h-5 w-5 fill-white" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
