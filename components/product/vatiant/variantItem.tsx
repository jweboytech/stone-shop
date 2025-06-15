'use client';

import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';

import { ProductOptionValue, ProductVariantEdge } from '@/generated/graphql';
import gqlClient from '@/lib/graphqlClient';

const VariantItem = ({
  optionValues,
  variants,
  onChange,
}: {
  optionValues: ProductOptionValue[];
  variants: ProductVariantEdge[];
  onChange: (merchandiseId: string) => void;
}) => {
  const [selectedOption, setSelectedOption] =
    React.useState<ProductOptionValue>();

  const handleClick = (data: ProductOptionValue) => () => {
    setSelectedOption(data);
    const matchVariant = variants.find(({ node }) =>
      node.selectedOptions.some((option) => option.value === data.name),
    );
    console.log(matchVariant.node);
  };

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

export default VariantItem;
