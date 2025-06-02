import { Search, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const MainBar = () => {
  return (
    <div className="px-15 h-14 flex justify-between items-center shadow-xs">
      <Search size={28} />
      <Image
        alt="logo"
        height={36}
        src="https://celesteadore.com/cdn/shop/files/Checkout_Logo_New.jpg?v=1694761572&width=240"
        width={240}
      />
      <ShoppingBag size={28} />
    </div>
  );
};

export default MainBar;
