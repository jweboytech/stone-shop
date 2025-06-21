'use client';

import {
  ProductOption,
  ProductOptionValue,
  ProductVariantEdge,
} from '@/generated/graphql';
import Image from 'next/image';
import React from 'react';
import clsx from 'clsx';
import { useProductStore } from '@/store/prouct';

const VariantItem = ({
  optionValues,
  variants,
}: {
  optionValues: ProductOptionValue[];
  variants: ProductVariantEdge[];
}) => {
  const onMerchandiseIdChange = useProductStore(state => state.onMerchandiseIdChange);
  const [selectedOption, setSelectedOption] =
    React.useState<ProductOptionValue>();

  const handleClick = (data: ProductOptionValue) => () => {
    setSelectedOption(data);
    // gqlClient.request(GET_PRODUCT_VARIANT, {
    //   handle,
    //   selectedOption: data
    // })
    const matchVariant = variants.find(({ node }) =>
      node.selectedOptions.some((option) => option.value === data.name),
    );
    if(matchVariant != null) {
      onMerchandiseIdChange(matchVariant!.node.id)
    }
  };

  React.useEffect(() => {
    if(variants.length > 0)   {
      const defaultOption = optionValues.find(
        (option) =>
          variants[0].node.selectedOptions.some(
            (selectedOption) => selectedOption.value === option.name,
          ),
      );
      if (defaultOption != null) {
        setSelectedOption(defaultOption);
        onMerchandiseIdChange(variants[0].node.id);
      }
    }
  }, [variants])

  return (
    <ul className="flex gap-2">
      {optionValues.map((optionValue) => {
        const matchVariant = variants.find(({ node }) =>
          node.selectedOptions.some(
            (option) => option.value === optionValue.name,
          ),
        );

        return (
          <li
            key={optionValue.id}
            aria-hidden
            className={clsx(
              'w-25 h-25 border flex flex-col gap-2 items-center justify-center cursor-pointer transition-colors duration-300',
              selectedOption?.id === optionValue.id ? 'border-black' : 'border',
            )}
            onClick={handleClick(optionValue)}>
            {optionValue.swatch?.image != null ? (
              <Image
                alt="sku image"
                className="rounded-full h-10 w-10 items-center justify-center"
                height={40}
                src={optionValue.swatch.image.previewImage?.url}
                width={40}
              />
            ) : (
              matchVariant?.node.image != null && (
                <Image
                  alt="sku image"
                  className="rounded-full h-10 w-10 items-center justify-center"
                  height={40}
                  src={matchVariant.node.image.url}
                  width={40}
                />
              )
            )}
            <span className="text-xs font-semibold text-center">
              {optionValue.name}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

const ProductVariants = ({
  options,
  variants = [], handle
}: {
  options: ProductOption[];
  variants: ProductVariantEdge[];handle: string;
}) => {
  return (
    <div className="flex flex-col gap-2">
      {options.map((item) => (
        <div key={item.id}>
          <h3 className="text-base mb-3">Choose Your {item.name}</h3>
          <VariantItem
            optionValues={item.optionValues}
            variants={variants}
            handle={handle}
          />
          <hr className="my-4 border-surface-muted" />
        </div>
      ))}
    </div>
  );
};

export default ProductVariants;
