import Footer from '@/components/footer';
import { Navbar } from '@/components/navbar';
import React from 'react';

const ShopLayout = ({ children }: BaseProps) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default ShopLayout;
