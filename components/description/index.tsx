import clsx from 'clsx';
import React from 'react';

const Description = ({
  columns = 1,
  children,
  className,
  theme = 'dark',
  colon,
  align,
  size,
  layout = 'grid',
}: DescriptionProps) => {
  const classname = clsx({
    ...(layout === 'grid' && {
      [`grid-cols-${columns}`]: true,
      'grid gap-4 w-full': true,
    }),
    ...(layout === 'flex' && {
      flex: true,
      'gap-2': true,
    }),
    ...(className && { [className]: true }),
  });

  return (
    <ul
      className={classname}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
      {React.Children.map(children, (child) =>
        child != null
          ? React.cloneElement(child as any, { theme, colon, align, size })
          : null,
      )}
    </ul>
  );
};

export default Description;
