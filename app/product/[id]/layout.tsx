import React from 'react';

import Navbar from '@/components/navbar';
import MainBar from '@/components/navbar/main';
import MediaBar from '@/components/navbar/media';
import SaleBar from '@/components/navbar/sale';

const MainLayout = ({ children }: BaseProps) => {
  return (
    <div className="overflow-y-auto h-screen">
      <SaleBar />
      <MediaBar />
      <MainBar />
      <Navbar />
      {children}
    </div>
  );
};

export default MainLayout;
