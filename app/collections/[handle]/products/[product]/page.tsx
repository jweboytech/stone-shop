import React from 'react';

import gqlClient from '@/lib/graphqlClient';
import GET_PRODUCT_DETAILS from '@/graphql/query/product.gql';
import { formatPrice } from '@/utils/price';
import ProductMainImages from '@/components/product/mainImages';
import ProductSkuAttribute from '@/components/product/vatiant';
import ProductBuyButton from '@/components/product/buyButton';
import { Product } from '@/generated/graphql';
import Payments from '@/components/cart/payments';

const ProductDetailsPage = async ({
  params,
}: {
  params: { product: string };
}) => {
  const { product } = await params;

  const { productByHandle } = await gqlClient.request<{
    productByHandle: Product;
  }>(GET_PRODUCT_DETAILS, {
    handle: product,
  });
  const { compareAtPriceRange, priceRange } = productByHandle;

  return (
    <div className="">
      <div className="flex gap-4 px-10 py-14">
        <ProductMainImages items={productByHandle.images.nodes} />
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
          <hr className="my-4 border-surface-muted" />
          <ProductSkuAttribute
            options={productByHandle.options}
            variants={productByHandle.variants.edges}
          />
          <ProductBuyButton merchandiseId="gid://shopify/ProductVariant/46641902878940" />
          <Payments />
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
      {/* <div className="my-2">
        <GuaranteeBar />
      </div>
      <RecommendedProdcuts />
      <Collections />
      <Guarantee /> */}
    </div>
  );
};

export default ProductDetailsPage;
