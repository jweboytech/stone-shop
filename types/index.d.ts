// import { SVGProps } from "react";

// export type IconSvgProps = SVGProps<SVGSVGElement> & {
//   size?: number;
// };

interface BaseProps {
  children?: React.ReactElement;
}

interface Option {
  label: string;
  value?: any;
}

type AnyObject = Record<string, any>;

type List<T> = {
  items: T[];
  total: number;
};
