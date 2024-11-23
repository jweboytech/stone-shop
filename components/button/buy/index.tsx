import React from 'react';
import './index.css';
import clsx from 'clsx';

const BuyButton = ({ className, text = 'shop play toys' }: ButtonProps) => {
  return (
    <div
      className={clsx(
        'btn',
        'w-fit px-8 py-3 text-center uppercase',
        className || '',
      )}>
      {text}
    </div>
  );
};

export default BuyButton;
