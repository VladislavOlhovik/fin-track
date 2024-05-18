import { Metadata } from 'next';

import { CoinIcon } from '@/components/icons';
import { SignInForm } from '@/components/signin';

export const metadata: Metadata = {
  title: 'SignIn',
};

export default function Page() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex justify-center h-36 w-full items-center rounded-lg bg-gray-200 p-3 md:h-36">
          <div className="w-32 text-white md:w-32 ">
            <CoinIcon />
          </div>
        </div>
        <SignInForm />
      </div>
    </main>
  );
}
