'use client';

import { useDrawerStore } from '@/store';
import clsx from 'clsx';
import './index.css';
import { Image } from '@nextui-org/image';

const Popup = () => {
  const { closeDrawer, visible, data } = useDrawerStore();

  return (
    <div
      className={clsx(
        'w-screen h-screen bg-black/75 fixed left-0 top-0 flex items-center justify-center overflow-hidden animate-fadeIn',
        !visible ? 'z-500' : '-z-10',
      )}>
      <div style={{}} className=" w-[760px] h-60 bg-white popup">
        <Image
          className="absolute top-0 left-0 w-90 h-full z-10"
          width={360}
          height={240}
          radius="none"
          src="https://beyours-theme-beauty.myshopify.com/cdn/shop/files/about-2.jpg?v=1653743297&width=1500"
        />
        <div className="popup-wrapper h-full transition-all duration-700">
          content
        </div>
      </div>
    </div>
  );
};

export default Popup;
