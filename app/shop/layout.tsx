'use client';

import React from 'react';

import Footer from '@/components/footer';
import { Navbar } from '@/components/navbar';
import Popup from '@/components/popup';
import { usePopupStore } from '@/store/popup';

const ShopLayout = ({ children }: BaseProps) => {
  const { openPopup } = usePopupStore();

  // React.useEffect(() => {
  //   openPopup();
  // }, []);

  return (
    <div className=" h-screen overflow-y-auto">
      <Navbar />
      {children}
      <Footer />
      <Popup />
    </div>
  );
};

export default ShopLayout;
