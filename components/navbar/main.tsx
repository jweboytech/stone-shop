import { Search, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import ProductBuyButton from '../product/buyButton';

const MainBar = () => {
  return (
    <div className="px-15 h-14 flex justify-between items-center shadow-xs">
      <Search size={28} />
      <Link href="/home">
        <Image
          alt="logo"
          className="cursor-pointer"
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
