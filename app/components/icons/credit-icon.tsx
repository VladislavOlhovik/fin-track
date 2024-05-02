import { SVGProps } from 'react';

export const CreditIcon = (
  props: SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={2}
      d="M20 14h0c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h0c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2z"
    />
    <circle cx={25.5} cy={6.5} r={1.5} />
    <circle cx={29.5} cy={13.5} r={1.5} />
    <path
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={2}
      d="m30 6-5 8M15 6H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h24c1.1 0 2-.9 2-2v-7M6 20h2M12 20h2M18 20h2M24 20h2M2 10h13"
    />
  </svg>
);
