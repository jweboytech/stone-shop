import Link from 'next/link';
import React from 'react';

import GuaranteeBar from '@/components/navbar/guarantee';

const MarketingBanner = () => {
  return (
    <div className="relative hidden lg:block">
      <Link href="/collections/best-sellers">
        <div className="h-160 bg-cover bg-[url(https://celesteadore.com/cdn/shop/files/PERSONALISED_JEWELLERY_1800_x_1000_px_9_1.jpg?v=1745420754&width=1920)]" />
      </Link>
      <div className="absolute z-20 bottom-0 w-full">
        <GuaranteeBar />
      </div>
    </div>
  );
};

export default MarketingBanner;
