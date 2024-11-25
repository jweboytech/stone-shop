import React from 'react';

import Footer from '@/components/footer';
import { Navbar } from '@/components/navbar';

const ShopLayout = ({ children }: BaseProps) => {
  return (
    <div className=" h-screen overflow-y-auto">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default ShopLayout;
