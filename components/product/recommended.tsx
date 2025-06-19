import React from 'react';

import ProductItem from './item';
import Reviews from '../reviews';

const RecommendedProdcuts = () => {
  return (
    <React.Fragment>
      <div className="px-15 pt-11 pb-10 flex flex-col gap-8">
        <h2 className="text-3xl font-medium text-center uppercase">
          you may also like
        </h2>
        <div className="grid grid-cols-5 gap-1">
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
        </div>
      </div>
      <Reviews />
    </React.Fragment>
  );
};

export default RecommendedProdcuts;
