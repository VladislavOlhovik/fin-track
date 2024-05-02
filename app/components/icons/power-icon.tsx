import { SVGProps } from 'react';

export const PowerIcon = (
  props: SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    {...props}
  >
    <path d="M256 288c17.67 0 32-14.33 32-32V32c0-17.67-14.33-32-32-32s-32 14.33-32 32v224c0 17.7 14.3 32 32 32zM403.7 66.81c-13.92-10.84-34.03-8.406-44.92 5.5-10.89 13.94-8.438 34.03 5.484 44.94C407.3 150.9 432 201.5 432 256c0 97.03-78.95 176-176 176S80 353 80 256c0-54.53 24.69-105.1 67.72-138.8 13.92-10.91 16.38-31 5.484-44.94-10.91-13.91-31-16.34-44.92-5.5C49.64 112.7 16 181.7 16 256c0 132.3 107.7 240 240 240s240-107.7 240-240c0-74.3-33.6-143.3-92.3-189.19z" />
  </svg>
);