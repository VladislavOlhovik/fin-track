import { Metadata } from 'next';

import { SignInForm } from '@/components/signin';
import { SignPage } from '@/components';

export const metadata: Metadata = {
  title: 'SignIn',
};

export default function Page() {
  return (
    <SignPage>
      <SignInForm />
    </SignPage>
  );
}
