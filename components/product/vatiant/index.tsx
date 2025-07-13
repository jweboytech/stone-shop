'use client';

import Image from 'next/image';
import React from 'react';
import clsx from 'clsx';

import {
  MediaImage,
  ProductOption,
  ProductOptionValue,
  ProductVariantEdge,
} from '@/generated/graphql';
import { useProductStore } from '@/store/prouct';
import Line from '@/components/line';
import { Input } from '@/components/ui/input';

const VariantItem = ({
  optionValues,
  variants,
}: {
  optionValues: ProductOptionValue[];
  variants: ProductVariantEdge[];
}) => {
  const onVariantPreviewImageChange = useProductStore(
    (state) => state.onVariantPreviewImageChange,
  );
  const onMerchandiseIdChange = useProductStore(
    (state) => state.onMerchandiseIdChange,
  );
  const onVariantChange = useProductStore((state) => state.onVariantChange);
  // const variantData = useProductStore((state) => state.variantData);
  const [selectedOption, setSelectedOption] =
    React.useState<ProductOptionValue>();

  const handleClick = (data: ProductOptionValue) => () => {
    setSelectedOption(data);
    const matchVariant = variants.find(({ node }) =>
      node.selectedOptions.some((option) => option.value === data.name),
    );

    if (matchVariant != null) {
      onMerchandiseIdChange(matchVariant!.node.id);
      onVariantChange({
        merchandiseId: matchVariant!.node.id,
        variantName: matchVariant.node.selectedOptions[0].value,
      });

      // 二级 SKU
      if (data.swatch == null) {
        onVariantPreviewImageChange(matchVariant?.node.image?.url);
      }
    }

    // gqlClient.request(GET_PRODUCT_VARIANT, {
    //   handle,
    //   selectedOption: data
    // })
  };

  React.useEffect(() => {
    if (variants.length > 0) {
      const defaultOption = optionValues.find((option) =>
        variants[0].node.selectedOptions.some(
          (selectedOption) => selectedOption.value === option.name,
        ),
      );

      if (defaultOption != null) {
        const item = variants[0];

        setSelectedOption(defaultOption);
        onMerchandiseIdChange(item.node.id);

        onVariantChange({
          merchandiseId: item.node.id,
          variantName: item.node.selectedOptions[0].value,
        });
      }
    }
  }, [variants]);

  return (
    <ul className="flex gap-2 flex-wrap">
      {optionValues.map((optionValue) => {
        const matchVariant = variants.find(({ node }) =>
          node.selectedOptions.some(
            (option) => option.value === optionValue.name,
          ),
        );
        const reference = matchVariant?.node.metafield?.reference as MediaImage;

        return (
          <React.Fragment key={optionValue.id}>
            <li
              aria-hidden
              className={clsx(
                'w-25 h-25 border flex flex-col gap-2 items-center justify-center cursor-pointer transition-colors duration-300',
                selectedOption?.id === optionValue.id
                  ? 'border-black'
                  : 'border',
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
                reference?.previewImage?.url != null && (
                  <Image
                    alt="sku image"
                    className="rounded-full h-10 w-10 items-center justify-center"
                    height={40}
                    src={reference.previewImage.url}
                    width={40}
                  />
                )
              )}
              <span className="text-xs font-semibold text-center">
                {optionValue.name}
              </span>
            </li>
          </React.Fragment>
        );
      })}
    </ul>
  );
};

const ProductVariants = ({
  options,
  variants = [],
  handle,
  control,
}: {
  options: ProductOption[];
  variants: ProductVariantEdge[];
  handle: string;
  control;
}) => {
  return (
    <ul className="flex flex-col gap-2">
      {options.map((item) => (
        <li key={item.id}>
          <h3 className="text-base mb-3">Choose Your {item.name}</h3>
          <VariantItem
            handle={handle}
            optionValues={item.optionValues}
            variants={variants}
          />
          <Line />
        </li>
      ))}
    </ul>
  );
};

export default ProductVariants;
