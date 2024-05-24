'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';

import {
  AuthButton,
  ErrorMessage,
  Input,
} from '@/components';
import {
  EmailIcon,
  PasswordIcon,
  RightArrowIcon,
  UserIcon,
} from '@/components/icons';
import { UserStateType } from '@/lib/definitions';
import { createUser } from '@/dbAPI/actions';

export function SignUpForm() {
  const initialState: UserStateType = {
    message: null,
    errors: {},
  };
  const [errorMessage, dispatch] = useFormState(
    createUser,
    initialState
  );

  return (
    <>
      <form action={dispatch} className="space-y-3">
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
          <h1 className="mb-3 text-2xl">
            Please create user to continue.
          </h1>
          <Link className="underline" href="/signin">
            Or Sign In
          </Link>
          <div className="w-full mt-4">
            <Input
              title="User Name"
              placeholder="Enter your name"
              type="name"
              inputName="name"
              icon={
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              }
              errorNode={
                <ErrorMessage
                  errors={errorMessage.errors?.name}
                />
              }
            />
            <Input
              title="Email"
              inputName="email"
              placeholder="Enter your email address"
              autoComplete="username"
              type="email"
              icon={
                <EmailIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              }
              errorNode={
                <ErrorMessage
                  errors={errorMessage.errors?.email}
                />
              }
            />
            <Input
              title="Password"
              inputName="password"
              type="password"
              placeholder="Enter password"
              autoComplete="current-password"
              minLength={6}
              icon={
                <PasswordIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              }
              errorNode={
                <ErrorMessage
                  errors={errorMessage.errors?.password}
                />
              }
            />
          </div>
          <AuthButton>
            <p>Create user</p>
            <RightArrowIcon className="ml-auto h-5 w-5 fill-white" />
          </AuthButton>
          <div
            className="flex h-12 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            <ErrorMessage
              errorMessage={errorMessage.message}
            />
          </div>
        </div>
      </form>
    </>
  );
}
