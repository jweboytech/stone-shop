'use client';

import { useDrawerStore } from '@/store';
import clsx from 'clsx';
import { X } from 'lucide-react';
import React from 'react';

const Drawer = () => {
  const { closeDrawer, visible, data } = useDrawerStore();

  return (
    <div
      className={clsx(
        'w-screen h-screen bg-black/75 fixed left-0 top-0 overflow-hidden transition-all duration-500 cursor-pointer',
        visible ? 'opacity-100 z-500' : 'opacity-0 -z-10',
      )}
      onClick={closeDrawer}>
      <div
        className={clsx(
          'w-[440px] bg-white h-full absolute right-0 top-0 transition-all duration-500',
          visible ? 'translate-x-0' : 'translate-x-[440px]',
        )}
        onClick={(evt) => evt.stopPropagation()}>
        <div
          className="absolute top-4 right-8 w-8 h-8 rounded-full bg-foreground-200/60 flex items-center justify-center cursor-pointer"
          onClick={closeDrawer}>
          <X size={20} />
        </div>
        <div className="px-8 py-8 text-xl">{data?.title}</div>
        <div className="px-8">
          {data?.children != null
            ? React.cloneElement(data.children, { visible, closeDrawer })
            : null}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
