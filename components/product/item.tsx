import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

import { formatPrice } from '@/utils/price';

const ProductItem = ({
  data,
  collection,
}: {
  data: Product;
  collection: string;
}) => {
  const [sourceImage, previewImage] = data.images.nodes;

  return (
    <Link href={`/collections/${collection}/products/${data.handle}`}>
      <div className="flex flex-col gap-1 cursor-pointer">
        <div className="relative group">
          {/* <div className="absolute left-4 top-6 z-10 capitalize bg-[#f8f1e9] py-1 px-1.5 leading-none">
          <span className="text-xs ">best seller</span>
        </div> */}
          <Image
            alt={sourceImage.id}
            className="inset-0 w-full h-full transition-opacity duration-300 group-hover:opacity-0"
            height={280}
            src={sourceImage.url}
            width={280}
          />
          <Image
            alt={previewImage.id}
            className="absolute z-10 inset-0 w-full h-full transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            height={280}
            src={previewImage.url}
            width={280}
          />
        </div>
        <div className="pt-2.5 pb-1.5">
          <div className="text-base">{data.title}</div>
          <div className="flex items-center gap-2">
            <span className="line-through font-medium text-sm text-neutral-600">
              {formatPrice(data.compareAtPriceRange.minVariantPrice.amount)}
            </span>
            <span className=" font-medium text-sm">
              {formatPrice(data.priceRange.minVariantPrice.amount)}
            </span>
          </div>
        </div>
        <ul className="flex gap-2 items-center">
          {data.variants.nodes.map((item) => (
            <li
              key={item.id}
              className="p-[2px] border border-surface-muted rounded-full">
              <div className="overflow-hidden rounded-full w-4 h-4">
                <Image
                  alt={item.id}
                  className="w-full h-full object-cover"
                  height={20}
                  src={item.image.url}
                  width={20}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
};

export default ProductItem;
