import Link from 'next/link';
import { DeleteIcon, EditIcon, PlusIcon } from '../icons';

export function CreateButton({
  title,
  href,
}: {
  title: string;
  href: string;
}) {
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

export function UpdateButton({
  href,
}: {
  id?: number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-md border p-2 hover:bg-blue-200"
    >
      <EditIcon className="h-5" />
    </Link>
  );
}

export function DeleteButton({ id }: { id?: number }) {
  return (
    <form action={'deleteInvoiceWithId'}>
      <button className="rounded-md border p-2 hover:bg-red-200">
        <span className="sr-only">Delete</span>
        <DeleteIcon className="h-5" />
      </button>
    </form>
  );
}
