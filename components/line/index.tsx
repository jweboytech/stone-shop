import React from 'react';
import { twMerge } from 'tailwind-merge';

const Line = ({ className }: { className?: string }) => {
  return <hr className={twMerge('my-4 border-surface-muted', className)} />;
};

export default Line;
