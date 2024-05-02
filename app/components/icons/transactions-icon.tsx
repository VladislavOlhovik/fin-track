import { SVGProps } from 'react';

export const TransactionIcon = (
  props: SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: 'evenodd',
      clipRule: 'evenodd',
      strokeLinejoin: 'round',
      strokeMiterlimit: 2,
    }}
    viewBox="0 0 32 32"
    {...props}
  >
    <path d="M15.003 11H15a3.001 3.001 0 0 0 0 6h2a1 1 0 0 1 0 2h-3a1 1 0 0 0 0 2h1.003v1a1.001 1.001 0 0 0 2 0v-1A3.001 3.001 0 0 0 17 15h-2a1 1 0 0 1 0-2h3a1 1 0 0 0 0-2h-.997v-1a1 1 0 0 0-2 0v1Z" />
    <path d="M9.227 27c6.773.084 18.785-.012 18.785-.012a1 1 0 0 0 0-2H9.263v-2.547c0-.466-.886-.573-1.343-.271l-4.237 2.805c-.22.082-.404.239-.52.44a.976.976 0 0 0 .274 1.358l4.444 2.95c.454.301 1.346.192 1.346-.276V27ZM22.785 7C16.012 7.084 4 6.988 4 6.988a1 1 0 0 1 0-2h18.749V2.441c0-.466.886-.573 1.343-.271l4.237 2.805c.22.082.404.239.52.44a.976.976 0 0 1-.274 1.358l-4.444 2.95c-.453.301-1.346.192-1.346-.276V7Z" />
  </svg>
);
