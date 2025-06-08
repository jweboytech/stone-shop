import Image from 'next/image';
import React from 'react';

const ProductSkuAttribute = ({ items }: { items: SkuAttribute[] }) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-base">Choose Your Finish — 18K Gold</h3>
      <ul className="flex gap-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="w-25 h-25 border flex flex-col gap-2 items-center justify-center">
            <Image
              alt="sku image"
              className="rounded-full h-10 w-10 items-center justify-center"
              height={40}
              src={item.image.url}
              width={40}
            />
            <span className="text-xs font-semibold text-center">
              {item.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductSkuAttribute;
