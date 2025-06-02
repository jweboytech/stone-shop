'use client';

import Image from 'next/image';
import React from 'react';

const GoodsItem = () => {
  const [isInPreview, setIsInPreivew] = React.useState(false);
  const srcImgUrl =
    'https://celesteadore.com/cdn/shop/files/CelesteAdore-FiveLeafMultiCloverBracelet-min1.jpg?v=1741684367&width=540';

  const previewImgUrl =
    'https://celesteadore.com/cdn/shop/files/CelesteAdore-FiveLeafMultiCloverBracelet-image-1-min.jpg?v=1741684367&width=360';

  const handleToggle = () => {
    setIsInPreivew(!isInPreview);
  };

  return (
    <div className="flex flex-col gap-1 cursor-pointer">
      <div className="relative">
        <div className="absolute left-4 top-6 z-10 capitalize bg-[#f8f1e9] py-1 px-1.5 leading-none">
          <span className="text-xs ">best seller</span>
        </div>
        <Image alt="goods" height={280} src={srcImgUrl} width={280} />
      </div>
      <div className="pt-2.5 pb-1.5">
        <div className="text-base">Personalised Clover Initial Necklace</div>
        <div className="flex items-center gap-2">
          <span className="line-through font-medium text-sm text-neutral-600">
            $97.00
          </span>
          <span className=" font-medium text-sm">$56.00</span>
        </div>
      </div>
      <ul className="flex gap-2 items-center">
        <li className="p-1 border border-neutral-600 rounded-full">
          <li className="overflow-hidden rounded-full bg-[url(https://celesteadore.com/cdn/shop/files/gold_50x50.png)] w-4 h-4" />
        </li>
      </ul>
    </div>
  );
};

export default GoodsItem;
