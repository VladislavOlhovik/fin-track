import { SVGProps } from 'react';

export const TransferIcon = (
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
    <path d="M14.995 11h-.003a3.001 3.001 0 0 0 0 6h2a1 1 0 0 1 0 2h-3a1 1 0 0 0 0 2h1.003v1a1 1 0 0 0 2 0v-1a3.001 3.001 0 0 0-.003-6h-2a1 1 0 0 1 0-2h3a1 1 0 0 0 0-2h-.997v-1a1 1 0 0 0-2 0v1Z" />
    <path d="M25.536 26.938c.221-.082.404-.239.52-.44a.978.978 0 0 0-.273-1.357l-4.445-2.95c-.453-.301-1.345-.192-1.345.275v2.531l-15.486.001L4.44 25H4a.997.997 0 0 1-1-1V6a1 1 0 0 0-2 0v18c0 .796.316 1.559.879 2.121A2.996 2.996 0 0 0 4 27l15.956.048v2.424c0 .466.887.574 1.343.271l4.237-2.805ZM6.473 3.959c-.22.082-.404.239-.52.44a.977.977 0 0 0 .274 1.358l4.444 2.949c.453.301 1.346.193 1.346-.275V5.9l15.485-.001c.023 0 .045 0 .067-.002h.44a1 1 0 0 1 1 1v18a1 1 0 0 0 2 0v-18a3.001 3.001 0 0 0-3-3l-15.956-.048V1.425c0-.466-.886-.574-1.343-.271L6.473 3.959Z" />
  </svg>
);
