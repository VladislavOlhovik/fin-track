'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';

import {
  EmailIcon,
  PasswordIcon,
  RightArrowIcon,
  UserIcon,
} from '@/components/icons';
import { AuthButton, Input } from '@/components';
import { authenticate } from '@/dbAPI/actions';

export function SignInForm() {
  const [errorMessage, dispatch] = useFormState(
    authenticate,
    undefined
  );

  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-100 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">
          Please Sign in to continue.
        </h1>
        <Link className="underline" href="/signup">
          Or create New Account
        </Link>
        <div className="w-full mt-4">
          <Input
            title="Email"
            inputName="email"
            type="email"
            placeholder="Enter your email address"
            autoComplete="username"
            required={true}
            icon={
              <EmailIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            }
          />
          <Input
            title="Password"
            inputName="password"
            type="password"
            placeholder="Enter password"
            autoComplete="current-password"
            minLength={6}
            required={true}
            icon={
              <PasswordIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            }
          />
        </div>
        <AuthButton>
          <p>Sign in</p>
          <RightArrowIcon className="ml-auto h-5 w-5 fill-white" />
        </AuthButton>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <UserIcon className="h-5 w-5 fill-red-500" />
              <p className="text-sm text-red-500">
                {errorMessage}
              </p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
