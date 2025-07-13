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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const VariantItem = ({
  optionValues,
  variants,
  isSelectVariant,
  categoryName,
}: {
  optionValues: ProductOptionValue[];
  variants: ProductVariantEdge[];
  isSelectVariant?: boolean;
  categoryName?: string;
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
  const [birthstone, setBirthstone] = React.useState('');
  const isShowSelect = isSelectVariant && categoryName === 'Birthstone';

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

  React.useEffect(() => {
    if (isShowSelect && optionValues.length > 0) {
      const item = optionValues[0];

      setBirthstone(item.id);
    }
  }, [isShowSelect]);

  if (isShowSelect) {
    const handleChange = (value: string) => {
      console.log(value);
    };

    return (
      <Select value={birthstone} onValueChange={handleChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Please select" />
        </SelectTrigger>
        <SelectContent>
          {optionValues.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

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
  isSelectVariant,
}: {
  options: ProductOption[];
  variants: ProductVariantEdge[];
  handle: string;
  isSelectVariant?: boolean;
}) => {
  return (
    <ul className="flex flex-col gap-2">
      {options.map((item) => (
        <li key={item.id}>
          <h3 className="text-base mb-3">Choose Your {item.name}</h3>
          <VariantItem
            categoryName={item.name}
            handle={handle}
            optionValues={item.optionValues}
            variants={variants}
            isSelectVariant={isSelectVariant}
          />
          <Line />
        </li>
      ))}
    </ul>
  );
};

export default ProductVariants;
