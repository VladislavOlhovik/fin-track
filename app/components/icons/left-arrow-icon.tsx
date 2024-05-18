import { SVGProps } from 'react';

export const LeftArrowIcon = (
  props: SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    {...props}
  >
    <title />
    <g data-name="Layer 2">
      <path d="M13 26a1 1 0 0 1-.71-.29l-9-9a1 1 0 0 1 0-1.42l9-9a1 1 0 1 1 1.42 1.42L5.41 16l8.3 8.29a1 1 0 0 1 0 1.42A1 1 0 0 1 13 26Z" />
      <path d="M28 17H4a1 1 0 0 1 0-2h24a1 1 0 0 1 0 2Z" />
    </g>
    <path
      d="M0 0h32v32H0z"
      style={{
        fill: 'none',
      }}
    />
  </svg>
);
