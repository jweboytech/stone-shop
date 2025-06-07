import Image from 'next/image';
import React from 'react';

import GuaranteeBar from '@/components/navbar/guarantee';
import RecommendedProdcuts from '@/components/product/recommended';
import Collections from '@/components/product/collections';
import Guarantee from '@/components/guarantee';

const ProductDetailsPage = () => {
  return (
    <div className="">
      <div className="flex gap-4 px-10 py-14">
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
          <hr className="my-4 border-surface-muted" />
          <div className="flex flex-col gap-2">
            <h3 className="text-base">Choose Your Finish — 18K Gold</h3>
            <input />
          </div>
          <hr className="my-4 border-surface-muted" />
          <div className="flex flex-col gap-2">
            <button>sd</button>
            <div>icons TODO</div>
          </div>
          <hr className="my-4 border-surface-muted" />
          <div className="border border-amber bg-surface-light p-4 rounded-lg">
            <h3 className="uppercase text-caramel text-sm font-bold mb-1">
              new season sale
            </h3>
            <h4 className="text-base font-bold text-amber uppercase  mb-1">
              Buy 1 & Get Any 2nd Free
            </h4>
            <p className="text-sm ">
              Add 2 items to your cart and your second is free. No code needed.
              Discount applies at checkout.
            </p>
          </div>
          <hr className="my-4 border-surface-muted" />
          <ul className="flex flex-col gap-4">
            <li className="flex gap-3 items-center">
              <span>icon</span>
              <span className="text-base">Free Shipping Worldwide</span>
            </li>
            <li className="flex gap-3 items-center">
              <span>icon</span>
              <span className="text-base">Lifetime Replacement Warranty</span>
            </li>
            <li className="flex gap-3 items-center">
              <span>icon</span>
              <span className="text-base">Waterproof & Tarnish Free</span>
            </li>
            <li className="flex gap-3 items-center">
              <span>icon</span>
              <span className="text-base">100% Satisfaction Guarantee</span>
            </li>
          </ul>
          <hr className="my-4 border-surface-muted" />
          <div>Collapse TODO</div>
        </div>
      </div>
      <div className="my-2">
        <GuaranteeBar />
      </div>
      <RecommendedProdcuts />
      <Collections />
      <Guarantee />
    </div>
  );
};

export default ProductDetailsPage;
