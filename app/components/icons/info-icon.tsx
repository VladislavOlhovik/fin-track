import { SVGProps } from 'react';

export const InfoIcon = (
  props: SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    {...props}
  >
    <title />
    <path
      fillRule="evenodd"
      d="M9 15h2V9H9v6Zm1-15C4.5 0 0 4.5 0 10s4.5 10 10 10 10-4.5 10-10S15.5 0 10 0Zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8ZM9 7h2V5H9v2Z"
    />
  </svg>
);
