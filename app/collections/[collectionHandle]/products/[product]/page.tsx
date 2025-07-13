import { CircleCheckBig, Heart, Package, ShieldCheck } from 'lucide-react';
import React from 'react';

import Description from './components/description';
import Buy from './components/buy';

import gqlClient from '@/lib/graphqlClient';
import GET_PRODUCT_DETAILS from '@/graphql/query/product.gql';
import { formatPrice } from '@/utils/price';
import ProductMainImages from '@/components/product/mainImages';
import { Product } from '@/generated/graphql';
import Payments from '@/components/cart/payments';
import Line from '@/components/line';
import GuaranteeBar from '@/components/navbar/guarantee';
import Collections from '@/components/product/collections';
import Guarantee from '@/components/guarantee';
import Wondering from '@/components/wondering';

const ProductDetailsPage = async ({
  params,
}: {
  params: { product: string };
}) => {
  const { product } = await params;
  const { productByHandle } = await gqlClient.request<{
    productByHandle: Product & { letterInputMetafield: Option };
  }>(GET_PRODUCT_DETAILS, {
    handle: product,
  });
  const { compareAtPriceRange, priceRange, media, letterInputMetafield } =
    productByHandle;
  const mainImages = media.edges.map(({ node }) => node.previewImage);
  const isShowLetterInput =
    letterInputMetafield != null
      ? JSON.parse(letterInputMetafield.value)
      : false;
  // console.log('render', letterInputMetafield, isShowLetterInput);

  return (
    <div className="">
      <div className="flex gap-4 px-10 py-14">
        <ProductMainImages items={mainImages} />
        <div className="flex-1 pl-4">
          <h2 className="font-medium text-22">{productByHandle.title}</h2>
          <div className="flex gap-4 items-center">
            {Number(compareAtPriceRange.minVariantPrice.amount) > 0 && (
              <span className="text-base line-through text-neutral-foreground">
                {formatPrice(
                  compareAtPriceRange.minVariantPrice.amount,
                  compareAtPriceRange.minVariantPrice.currencyCode,
                )}
              </span>
            )}
            <span className="text-22 font-semibold">
              {formatPrice(
                priceRange.minVariantPrice.amount,
                priceRange.minVariantPrice.currencyCode,
              )}
            </span>
          </div>
          <Line />
          <Buy
            needLetter={isShowLetterInput}
            product={product}
            productByHandle={productByHandle}
          />
          <Payments />
          <Line />
          {/* <div className="border border-amber bg-surface-light p-4 rounded-lg">
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
          </div> <Line />*/}
          <ul className="flex flex-col gap-3">
            <li className="flex gap-2 items-center">
              <Package size={24} strokeWidth={1.5} />
              <span className="text-base">Free Shipping Worldwide</span>
            </li>
            <li className="flex gap-2 items-center">
              <ShieldCheck size={24} strokeWidth={1.5} />
              <span className="text-base">Lifetime Replacement Warranty</span>
            </li>
            <li className="flex gap-2 items-center">
              <CircleCheckBig size={24} strokeWidth={1.5} />
              <span className="text-base">Waterproof & Tarnish Free</span>
            </li>
            <li className="flex gap-2 items-center">
              <Heart size={24} strokeWidth={1.5} />
              <span className="text-base">100% Satisfaction Guarantee</span>
            </li>
          </ul>
          <Line />
          <Description description={productByHandle.descriptionHtml} />
        </div>
      </div>
      <div className="my-2">
        <GuaranteeBar />
        <Wondering />
        <Line />
        <Collections />
        <Guarantee />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
