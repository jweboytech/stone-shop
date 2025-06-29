export const runtime = 'edge';

import React from 'react';

import Collections from '../../components/product/collections';
import Reviews from '../../components/reviews';
import Guarantee from '../../components/guarantee';

import Community from './components/community';
import BestSellers from './components/bestSellers';

import MarketingBanner from '@/components/banner/marketing';

const HomePage = () => {
  return (
    <div className="h-screen">
      <MarketingBanner />
      <BestSellers />
      <Collections />
      <Reviews />
      <Community />
      <Guarantee />
    </div>
  );
};

export default HomePage;
