import { SVGProps } from 'react';

export const DescriptionIcon = (
  props: SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#212121"
      d="M2.5 5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-15ZM2.5 8a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-15ZM2 11.5a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 0 1h-15a.5.5 0 0 1-.5-.5ZM2.5 14a.5.5 0 0 0 0 1h10a.5.5 0 0 0 0-1h-10Z"
    />
  </svg>
);
