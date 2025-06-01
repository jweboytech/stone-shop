'use client';

import { X } from 'lucide-react';
import clsx from 'clsx';

import SubscribeForm from '../subscribe/form';
import SocialMedia from '../social-media';

import { usePopupStore } from '@/store/popup';

const Popup = () => {
  const { closePopup, visible } = usePopupStore();

  return (
    <div
      className={clsx(
        'w-screen h-screen bg-black/75 fixed left-0 top-0 flex items-center justify-center overflow-hidden  transition-all duration-300',
        visible ? 'opacity-100 z-500' : 'opacity-0 -z-10',
      )}>
      <div className="px-12 py-12 w-full h-full flex items-center justify-center">
        <div className="w-[760px] h-full max-h-[412px] flex bg-white relative">
          <X
            className="absolute right-2 top-2 cursor-pointer"
            size={28}
            onClick={closePopup}
          />
          <div className="h-full w-80 bg-black bg-cover bg-popup bg-bottom" />
          <div className="flex-1 flex flex-col px-10 py-10 gap-5">
            <p className="text-2xl text-center">
              Sign up and get 20% off your first order
            </p>
            <SubscribeForm />
            <div className="flex justify-center">
              <SocialMedia />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
