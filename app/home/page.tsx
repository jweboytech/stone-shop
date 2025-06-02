import React from 'react';

import Community from './components/community';
import BestSellers from './components/bestSellers';
import Collections from './components/collections';
import Reviews from './components/reviews';

import GuaranteeBar from '@/components/navbar/guarantee';
import SaleBar from '@/components/navbar/sale';
import MediaBar from '@/components/navbar/media';
import MainBar from '@/components/navbar/main';
import Navbar from '@/components/navbar';
import Banner from '@/components/banner';
import Guarantee from './components/guarantee';

const HomePage = () => {
  return (
    <div className="overflow-y-auto h-screen">
      <SaleBar />
      <MediaBar />
      <MainBar />
      <Navbar />
      <div className="relative">
        <Banner />
        <div className="absolute z-20 bottom-0 w-full">
          <GuaranteeBar />
        </div>
      </div>
      <BestSellers />
      <Collections />
      <Reviews />
      <Community />
      <Guarantee />
    </div>
  );
};

export default HomePage;
