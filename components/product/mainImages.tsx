'use client';

import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

import { useProductStore } from '@/store/prouct';

const ProductMainImages = ({ items }: { items: any[] }) => {
  const [image, setImage] = React.useState<string>();
  const variantPreviewImage = useProductStore(
    (state) => state.variantPreviewImage,
  );

  const handleChange = (url: string) => () => {
    setImage(url);
  };

  React.useEffect(() => {
    if (items.length > 0) {
      setImage(items[0].url);
    }
  }, [items]);

  React.useEffect(() => {
    if (!!variantPreviewImage) {
      const record = items.find((item) => item.url === variantPreviewImage);

      if (record != null) {
        setImage(record?.url);
      }
    }
  }, [variantPreviewImage]);

  return (
    items.length > 0 && (
      <React.Fragment>
        <ul className="flex flex-col gap-4">
          {items.map((item) => (
            <li
              key={item.id}
              aria-hidden
              className={clsx(
                'border-2  w-18 h-18',
                image === item.url ? 'border-black' : 'border-transparent',
              )}
              onClick={handleChange(item.url)}>
              <Image
                priority
                alt="product"
                className="w-full h-full cursor-pointer"
                height={68}
                src={item.url}
                width={68}
              />
            </li>
          ))}
        </ul>
        <div className="w-184">
          {image && (
            <Image
              priority
              alt="product"
              className="w-[748px] h-[748px]"
              height={748}
              src={image!}
              width={748}
            />
          )}
        </div>
      </React.Fragment>
    )
  );
};

export default ProductMainImages;
