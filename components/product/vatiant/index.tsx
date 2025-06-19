import {
  ProductOption,
  ProductOptionValue,
  ProductVariant,
  ProductVariantEdge,
} from '@/generated/graphql';
import Image from 'next/image';
import React from 'react';
import VariantItem from './variantItem';

const ProductSkuAttribute = ({
  options,
  variants = [],
  onChange,
}: {
  options: ProductOption[];
  variants: ProductVariantEdge[];
  onChange: (merchandiseId: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-2">
      {options.map((item) => (
        <div key={item.id}>
          <h3 className="text-base mb-3">Choose Your {item.name}</h3>
          <VariantItem
            optionValues={item.optionValues}
            variants={variants}
            onChange={onChange}
          />
          <hr className="my-4 border-surface-muted" />
        </div>
      ))}
    </div>
  );
};

export default ProductSkuAttribute;
