import React from 'react';
import { Toaster } from 'sonner';

import Footer from './footer';

import Navbar from '@/components/navbar';
import MainBar from '@/components/navbar/main';
import BasicBar from '@/components/navbar/basic';
// import SaleBar from '@/components/navbar/sale';

const MainLayout = ({ children }: BaseProps) => {
  return (
    <div className="overflow-y-auto h-screen">
      {/* <SaleBar /> */}
      <BasicBar />
      <MainBar />
      <Navbar />
      {children}
      <Footer />
      <Toaster />
    </div>
  );
};

export default MainLayout;
