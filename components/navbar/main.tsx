import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Search } from 'lucide-react';

import ProductBuyButton from '../product/buyButton';

import NavbarDrawer from '@/layout/components/navbarDrawer';

const MainBar = () => {
  return (
    <div className="px-4 lg:px-15 h-14 flex justify-between items-center shadow-xs">
      <Link className="hidden lg:block cursor-pointer" href="/search">
        <Search size={24} />
      </Link>
      <div className="block lg:hidden">
        <NavbarDrawer />
      </div>
      <Link href="/">
        <Image
          priority
          alt="logo"
          className="cursor-pointer h-7 w-45 lg:w-60 lg:h-9"
          height={36}
          src="https://celesteadore.com/cdn/shop/files/Checkout_Logo_New.jpg?v=1694761572&width=240"
          width={240}
        />
      </Link>
      <div className="flex gap-2 items-center">
        <Link className="block lg:hidden cursor-pointer" href="/search">
          <Search size={24} />
        </Link>
        <ProductBuyButton variant="icon" />
      </div>
    </div>
  );
};

export default MainBar;
