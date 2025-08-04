import React from 'react';

// import MarketingBanner from '@/components/banner/marketing';
import MainLayout from '@/layout/main';
import BestSellers from '@/components/product/bestSellers';
// import Gift from '@/components/product/gift';
import Collections from '@/components/product/collections';
import Guarantee from '@/components/guarantee';
import GuaranteeBar from '@/components/navbar/guarantee';
import Line from '@/components/line';
import Introduce from '@/components/introduce/page';

function HomePage() {
  return (
    <MainLayout>
      <React.Fragment>
        <GuaranteeBar />
        <Introduce />
        <Line />
        <BestSellers />
        <Line />
        <Collections />
        <Line />
        <Guarantee />
        {/* <Gift /> */}
        {/* <Reviews /> */}
        {/* <MarketingBanner /> */}
        {/* <Community /> */}
      </React.Fragment>
    </MainLayout>
  );
}

export default HomePage;
