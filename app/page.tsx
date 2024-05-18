import { Button } from '@/components';
import {
  CoinIcon,
  RightArrowIcon,
} from './components/icons';
import { DonutChart } from './components/charts';
import Link from 'next/link';

const exampleDate = [
  { value: 240000, name: 'Bank of America' },
  { value: 300000, name: 'Chase Bank' },
  { value: 200000, name: 'Wells Fargo' },
  { value: 150000, name: 'Citi Bank' },
  { value: 100000, name: 'Capital One' },
];

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
          FinTrack app
        </h1>
        <h2 className="text-center text-2xl">
          keep your money ander control
        </h2>
        {/* <WaterfallChart /> */}
        <DonutChart data={exampleDate} name="example" />
        <div className="flex justify-around">
          <Link href={'/signup'}>
            <Button>
              Sign Up{' '}
              <RightArrowIcon className="ml-auto h-5 w-5 fill-white" />
            </Button>
          </Link>
          <Link href={'/signin'}>
            <Button>
              {' '}
              Sign In{' '}
              <RightArrowIcon className="ml-auto h-5 w-5 fill-white" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
