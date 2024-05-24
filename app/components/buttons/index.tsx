'use client';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';

import {
  DeleteIcon,
  EditIcon,
  PlusIcon,
} from '@/components/icons';

interface CreateButtonProps {
  title: string;
  href: string;
}

export function CreateButton({
  title,
  href,
}: CreateButtonProps) {
  return (
    <Link
      href={href}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">{title}</span>{' '}
      <PlusIcon className="h-6" fill="white" />
    </Link>
  );
}

export function UpdateButton({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="rounded-md border p-2 hover:bg-blue-200"
    >
      <EditIcon className="h-5" />
    </Link>
  );
}

interface DeleteButtonProps {
  action?: () => void;
  className?: string;
}

export function DeleteButton({
  action,
  className,
}: DeleteButtonProps) {
  return (
    <form action={action}>
      <button
        className={`rounded-md border p-2 hover:bg-red-200 ${className}`}
      >
        <span className="sr-only">Delete</span>
        <DeleteIcon className="h-5" />
      </button>
    </form>
  );
}

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({
  children,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={`flex h-10 items-center rounded-lg bg-blue-500 
      px-4 text-sm font-medium text-white transition-colors 
      hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 
      focus-visible:outline-offset-2 focus-visible:outline-blue-500 
      active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50
      ${className}`}
    >
      {children}
    </button>
  );
}

export const AuthButton = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { pending } = useFormStatus();
  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      {children}
    </Button>
  );
};
