import React from 'react';

import Footer from '@/components/footer';
import { Navbar } from '@/components/navbar';

const ShopLayout = ({ children }: BaseProps) => {
  return (
    <React.Fragment>
      <Navbar />
      {children}
      <Footer />
    </React.Fragment>
  );
};

export default ShopLayout;
