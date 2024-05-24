import { Metadata } from 'next';

import { SignUpForm } from '@/components/signup';
import { SignPage } from '@/components';

export const metadata: Metadata = {
  title: 'SignUp',
};

export default function Page() {
  return (
    <SignPage>
      <SignUpForm />
    </SignPage>
  );
}
