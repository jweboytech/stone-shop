// import { Search } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import ProductBuyButton from '../product/buyButton';

import NavbarDrawer from '@/app/home/components/navbarDrawer';

const MainBar = () => {
  return (
    <div className="px-4 lg:px-15 h-14 flex justify-between items-center shadow-xs">
      {/* <Search size={28} /> */}
      <NavbarDrawer />
      <div className="hidden lg:block" />
      <Link href="/home">
        <Image
          priority
          alt="logo"
          className="cursor-pointer h-7 w-45 lg:w-60 lg:h-9"
          height={36}
          src="https://celesteadore.com/cdn/shop/files/Checkout_Logo_New.jpg?v=1694761572&width=240"
          width={240}
        />
      </Link>
      <ProductBuyButton variant="icon" />
    </div>
  );
};

export default MainBar;
