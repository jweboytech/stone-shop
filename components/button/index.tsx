import React from 'react';
import './index.css';
import clsx from 'clsx';

const Button = ({ children, className }: ButtonProps) => {
  return (
    <div
      className={clsx(
        'btn',
        'w-fit px-8 py-3 text-center uppercase',
        className || '',
      )}>
      {children}
    </div>
  );
};

export default Button;
