import React from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import ProductItem from '../item';

const ProductList = ({ products }) => {
  return (
    <Carousel>
      <CarouselContent className="px-6">
        <div className="flex gap-4">
          {products.map(({ node }) => (
            <ProductItem key={node.id} collection="best-sellers" data={node} />
          ))}
        </div>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ProductList;
