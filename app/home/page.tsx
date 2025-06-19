export const runtime = 'edge';

import React from 'react';

import Collections from '../../components/product/collections';
import Reviews from '../../components/reviews';
import Guarantee from '../../components/guarantee';

import Community from './components/community';
import BestSellers from './components/bestSellers';

import GuaranteeBar from '@/components/navbar/guarantee';
import Banner from '@/components/banner';

const HomePage = () => {
  return (
    <div className="overflow-y-auto h-screen">
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
