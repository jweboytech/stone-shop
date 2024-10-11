type Theme = 'dark' | 'light';

interface DescriptionProps extends BaseProps {
  columns?: number;
  className?: string;
  theme?: Theme;
  colon?: boolean;
  align?: 'center' | 'between';
  size?: 'lg' | 'md' | 'sm';
  layout?: 'grid' | 'flex';
}

interface DescriptionItemProps
  extends Omit<Option, 'value'>,
    Pick<DescriptionProps, 'colon' | 'align' | 'size'> {
  theme?: Theme;
  needCopy?: boolean;
  value?: any;
}
