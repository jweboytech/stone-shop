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
import { useProductStore } from '@/store/product';
import Line from '@/components/line';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { groupVariantsByOption } from '@/utils';

const VariantItem = ({
  optionValues,
  isSelectVariant,
  categoryName,
  variantData,
}: {
  optionValues: ProductOptionValue[];
  variants: ProductVariantEdge[];
  isSelectVariant?: boolean;
  categoryName?: string;
  variantData;
}) => {
  const [birthstone, setBirthstone] = React.useState('');
  const isShowSelect = isSelectVariant && categoryName === 'Birthstone';
  const variants = [...variantData.values()];

  // React.useEffect(() => {
  //   if (isShowSelect && optionValues.length > 0) {
  //     const item = optionValues[0];

  //     setBirthstone(item.id);
  //   }
  // }, [isShowSelect]);

  if (isShowSelect) {
    const handleChange = (value: string) => {
      console.log(value, variants);

      //  const matchVariant = variants.find(({ node }) =>
      //    node.selectedOptions.some((option) => option.value === data.name),
      //  );

      //  if (matchVariant != null) {
      //    onMerchandiseIdChange(matchVariant!.node.id);
      //    onVariantChange({
      //      merchandiseId: matchVariant!.node.id,
      //      variantName: matchVariant.node.selectedOptions[0].value,
      //    });

      //    // 二级 SKU
      //    if (data.swatch == null) {
      //      onVariantPreviewImageChange(matchVariant?.node.image?.url);
      //    }
      //  }
    };
  }
};

const SelectVariantItem = () => {
  const [birthstone, setBirthstone] = React.useState('');
  const isShowSelect = isSelectVariant && categoryName === 'Birthstone';
  const variants = [...variantData.values()];

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
};

const NewVariantItem = ({
  name,
  onClick,
  categoryName,
  id,
  image,
  active,
  previewImage,
}: VariantItem) => {
  const handleClick = () => {
    onClick({ name, categoryName, id, previewImage });
  };

  return (
    <li
      aria-hidden
      className={clsx(
        'w-25 h-25 border flex flex-col gap-2 items-center justify-center cursor-pointer transition-colors duration-300',
        active ? 'border-black' : 'border',
      )}
      onClick={handleClick}>
      {image && (
        <Image
          alt="sku image"
          className="rounded-full h-10 w-10 items-center justify-center"
          height={40}
          src={image}
          width={40}
        />
      )}
      <span className="text-xs font-semibold text-center">{name}</span>
    </li>
  );
};

type VariantItem = {
  name: string;
  onClick: VariantChange;
  categoryName?: string;
  id: string;
  image: string;
  active: boolean;
  previewImage?: string;
};

interface VariantChange {
  (
    param: Pick<VariantItem, 'categoryName' | 'id' | 'name' | 'previewImage'>,
  ): void;
}

type Variant = {
  id: string;
  name: string;
  options?: Map<string, ProductOptionValue & { image: string }>;
  subOptions?: Record<string, ProductVariantEdge[]>;
};

// TODO: 没有库存的时候不能点击

const ProductVariants = ({
  options = [],
  variants = [],
  isSelectVariant,
}: {
  options: ProductOption[];
  variants: ProductVariantEdge[];
  isSelectVariant?: boolean;
}) => {
  const variantData = useProductStore((state) => state.variantData);
  const onVariantChange = useProductStore((state) => state.onVariantChange);
  const onVariantPreviewImageChange = useProductStore(
    (state) => state.onVariantPreviewImageChange,
  );
  const selectedKeys = useProductStore((state) => state.selectedKeys);
  const [subVariants, setSubVariants] = React.useState<
    Array<ProductVariantEdge>
  >([]);

  const handleChange = (value: string) => {
    onVariantChange({
      merchandiseId: value,
      category: undefined,
    });
  };

  const handleClick: VariantChange = (data) => {
    onVariantChange({
      merchandiseId: data.id,
      variantName: data.name,
      category: data.categoryName,
    });

    // 二级 SKU 默认切换产品预览图
    if (!data.categoryName && data.previewImage) {
      onVariantPreviewImageChange(data.previewImage);
    }

    // gqlClient.request(GET_PRODUCT_VARIANT, {
    //   handle,
    //   selectedOption: data
    // })
  };

  const primaryVariant = React.useMemo(() => {
    const mapper = new Map<string, Variant>();

    if (options.length >= 2) {
      for (let i = 0; i < options.length; i++) {
        const option = options[i];

        const payload: Variant = {
          id: option.id,
          name: option.name,
        };

        if (i === 0) {
          payload.options = option.optionValues.reduce((map, item) => {
            map.set(item.name, {
              id: item.id,
              name: item.name,
              swatch: item.swatch,
            });

            return map;
          }, new Map());

          payload.subOptions = groupVariantsByOption(variants, option.name);
        }

        mapper.set(option.name, payload);
      }
    } else {
      for (let i = 0; i < options.length; i++) {
        const option = options[i];

        const payload: Variant = {
          id: option.id,
          name: option.name,
        };

        if (i === 0) {
          payload.options = variants.reduce((map, { node }) => {
            const option = node.selectedOptions[0];
            const current = options.reduce<any>((obj, item) => {
              obj = item.optionValues.find(
                (child) => child.name === option.value,
              );

              return obj;
            }, {});

            map.set(option.value, {
              id: node.id,
              name: option.value,
              swatch: current?.swatch,
            });

            return map;
          }, new Map());

          payload.subOptions = groupVariantsByOption(variants, option.name);
        }

        mapper.set(option.name, payload);
      }
    }

    return { items: [...mapper.values()], map: mapper };
  }, [variants, options]);

  React.useEffect(() => {
    if (primaryVariant.map.size > 0) {
      const firstItem = primaryVariant.items[0];
      const value = firstItem.options!.values().next().value;

      handleClick({
        categoryName: firstItem.name,
        name: value!.name,
        id: value!.id,
      });
    }
  }, []);

  // 切换一级 SKU 刷新对应二级的 SKU， 切换二级 SKU 直接跳过
  React.useEffect(() => {
    if (variantData.category) {
      const current = primaryVariant.map.get(variantData.category!);

      if (current != null) {
        const subVariants = current.subOptions![variantData.variantName!];

        setSubVariants(subVariants);
      }
    }
  }, [variantData.variantName, variantData.category]);

  React.useEffect(() => {
    setTimeout(() => {
      if (!selectedKeys[1] && subVariants.length > 0) {
        const defaultVariant = subVariants[0];
        const subOption = defaultVariant.node.selectedOptions[1];

        onVariantChange({
          merchandiseId: defaultVariant.node.id,
          variantName: subOption.value,
          category: undefined,
        });
      }
    }, 0);
  }, [subVariants, selectedKeys]);

  // console.log('render', variantData, selectedKeyMapRef.current, selectedKeys);

  return (
    <div className="flex flex-col gap-2">
      {primaryVariant.items.map((item) => (
        <React.Fragment key={item.id}>
          <h3 className="text-base mb-3">Choose Your {item.name}</h3>
          <ul className="flex gap-2 flex-wrap">
            {item.options &&
              [...item.options.values()].map((option) => {
                return (
                  <NewVariantItem
                    key={option.id}
                    active={selectedKeys.includes(option.id)}
                    categoryName={item.name}
                    id={option.id}
                    image={option?.swatch?.image?.previewImage?.url}
                    name={option.name}
                    onClick={handleClick}
                  />
                );
              })}
          </ul>
        </React.Fragment>
      ))}
      <ul className="flex gap-2 flex-wrap">
        {!isSelectVariant ? (
          <React.Fragment>
            {subVariants.map(({ node }) => {
              const { selectedOptions, id, image, metafield } = node;
              const option = selectedOptions[1];

              return (
                <NewVariantItem
                  key={id}
                  active={selectedKeys.includes(id)}
                  id={id}
                  image={(metafield?.reference as AnyObject)?.previewImage?.url}
                  name={option.value}
                  previewImage={image?.url}
                  onClick={handleClick}
                />
              );
            })}
          </React.Fragment>
        ) : (
          <Select onValueChange={handleChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Please select" />
            </SelectTrigger>
            <SelectContent>
              {subVariants.map(({ node }) => {
                const { selectedOptions } = node;
                const option = selectedOptions[1];

                return (
                  <SelectItem key={node.id} value={node.id}>
                    {option.value}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        )}
      </ul>
    </div>
  );
};

export default ProductVariants;
