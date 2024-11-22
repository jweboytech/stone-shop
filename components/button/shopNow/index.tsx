import React from 'react';
import './index.css';
import clsx from 'clsx';

const ShopNowButton = ({ children, className }: ButtonProps) => {
  return (
    <div
      className={clsx(
        'btn',
        'w-fit px-8 py-3 text-center uppercase',
        className || '',
      )}>
      shop now
    </div>
  );
};

export default ShopNowButton;
