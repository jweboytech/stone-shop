import React from 'react';

import GoodsItem from '@/components/product/item';
import Link from 'next/link';

const BestSellers = () => {
  return (
    <div className="py-18">
      <h2 className="uppercase font-medium text-3xl text-center">
        Best Sellers
      </h2>
      <div className="flex flex-col gap-8 items-center px-15">
        <button className="mt-4 capitalize">view all</button>
        {/* <div className="grid grid-cols-5 gap-1">
          <GoodsItem />
          <GoodsItem />
          <GoodsItem />
          <GoodsItem />
          <GoodsItem />
        </div> */}
        <div className="grid grid-cols-2 gap-5 w-full">
          <div className="p-4 h-185 bg-[url(https://celesteadore.com/cdn/shop/files/Celeste_Adore_Clover_Set_2.jpg?v=1741965959&width=832)] bg-cover">
            <div className="relative border-2 border-white w-full h-full">
              <div className="absolute bottom-26 flex flex-col items-center gap-4 text-white w-full">
                <h2 className="uppercase font-medium text-2xl">
                  Clover Collection
                </h2>
                <p className="text-base">
                  Choose any letter with our best selling clover pieces.
                </p>
                <Link href="/">
                  <div className="border-2 border-white py-2 px-5 rounded w-fit uppercase">
                    <span className="text-white text-sm font-bold tracking-[4px]">
                      shop now
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="p-4 h-185 bg-[url(https://celesteadore.com/cdn/shop/files/Celeste_Adore_Orla_Birthstone_Necklace_2.jpg?v=1744086397&width=832)] bg-cover">
            <div className="relative border-2 border-white w-full h-full">
              <div className="absolute bottom-26 flex flex-col items-center gap-4 text-white w-full">
                <h2 className="uppercase font-medium text-2xl">
                  Birthstone collection
                </h2>
                <p className="text-base">
                  Find the perfect gift with our hand made birthstone pieces.
                </p>
                <Link href="/">
                  <div className="border-2 border-white py-2 px-5 rounded w-fit uppercase">
                    <span className="text-white text-sm font-bold tracking-[4px]">
                      shop now
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellers;
