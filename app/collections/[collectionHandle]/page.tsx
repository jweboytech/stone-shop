export const runtime = 'edge';

import React from 'react';

import ProductList from './components/productList';

import Collections from '@/components/product/collections';
import Line from '@/components/line';

const CollectionPage = async ({ params }: { params: AnyObject }) => {
  const { collectionHandle } = await params;

  return (
    <div className="py-4">
      <div>
        <div className="w-150 pt-20 pb-10 m-auto">
          <h2
            className="font-medium text-28 uppercase text-center underline decoration-[#e1d2b866] decoration-[6px] -underline-offset-4"
            style={{ textDecorationSkipInk: 'none' }}>
            {collectionHandle?.replace(/-/, ' ')}
          </h2>
          <p className="text-18 text-center mt-2">
            <strong>Crafted to last a lifetime.</strong> Our{' '}
            <strong>waterproof pieces</strong>
            are backed by a <strong>lifetime guarantee</strong> and delivered in
            a <strong>luxury gift box</strong>. Timeless quality, made to be
            worn and loved forever.
          </p>
        </div>
        <ProductList collectionHandle={collectionHandle} />
      </div>
      <div className="mt-8">
        <Line />
      </div>
      <Collections />
    </div>
  );
};

export default CollectionPage;
