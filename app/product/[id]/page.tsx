import Image from 'next/image';
import React from 'react';

const ProductDetailsPage = () => {
  return (
    <div className="py-14 px-10">
      <div className="flex gap-4">
        <ul className="flex flex-col gap-4">
          <li className="border-2 w-18 h-18">
            <Image
              alt="product"
              className="w-full h-full cursor-pointer"
              height={1080}
              src="https://celesteadore.com/cdn/shop/files/CANameNecklace-_1.jpg?v=1692704784&width=1080"
              width={1080}
            />
          </li>
          <li className="w-18 h-18">
            <Image
              alt="product"
              className="w-full h-full cursor-pointer"
              height={1080}
              src="https://celesteadore.com/cdn/shop/files/CANameNecklace-_1.jpg?v=1692704784&width=1080"
              width={1080}
            />
          </li>
          <li className="w-18 h-18">
            <Image
              alt="product"
              className="w-full h-full cursor-pointer"
              height={1080}
              src="https://celesteadore.com/cdn/shop/files/CANameNecklace-_1.jpg?v=1692704784&width=1080"
              width={1080}
            />
          </li>
        </ul>
        <div className="w-184">
          <Image
            alt="product"
            className="w-full h-full"
            height={1080}
            src="https://celesteadore.com/cdn/shop/files/CANameNecklace-_1.jpg?v=1692704784&width=1080"
            width={1080}
          />
        </div>
        <div className="flex-1 pl-4">
          <h2 className="font-medium text-22">
            Personalised Ruby Name Necklace
          </h2>
          <div className="flex gap-4 items-center">
            <span className="text-base line-through text-neutral-foreground">
              $63.00
            </span>
            <span className="text-22 font-semibold">$53.00</span>
          </div>
          <hr className="my-4 border-surface-muted" />
          <div className="flex flex-col gap-2">
            <h3 className="text-base">Choose Your Finish — 18K Gold</h3>
            <ul className="flex gap-2">
              <li className="w-25 h-25 border flex flex-col gap-2 items-center justify-center">
                <Image
                  alt="sku image"
                  className="rounded-full h-10 w-10 items-center justify-center"
                  height={40}
                  src="https://celesteadore.com/cdn/shop/files/18k-gold_50x50.png"
                  width={40}
                />
                <span className="text-xs font-semibold text-center">
                  18K Gold
                </span>
              </li>
              <li className="w-25 h-25 border border-surface-muted flex flex-col gap-2 items-center justify-center">
                <Image
                  alt="sku image"
                  className="rounded-full h-10 w-10 items-center justify-center"
                  height={40}
                  src="https://celesteadore.com/cdn/shop/files/18k-gold_50x50.png"
                  width={40}
                />
                <span className="text-xs text-center">18K Gold</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
