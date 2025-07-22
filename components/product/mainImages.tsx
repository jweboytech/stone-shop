'use client';

import Image from 'next/image';
import React from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

import { useProductStore } from '@/store/product';

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
      <div className="grid flex-col gap-6 w-[748px]">
        <div className=" bg-surface-light w-full">
          {image && (
            <Image
              priority
              alt="product"
              className="w-full"
              height={748}
              src={image!}
              width={748}
            />
          )}
        </div>
        <Carousel>
          <CarouselContent>
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="basis-1/5"
                onClick={handleChange(item.url)}>
                <Image
                  priority
                  alt="product"
                  className="w-full h-full cursor-pointer"
                  height={68}
                  src={item.url}
                  width={68}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    )
  );
};

export default ProductMainImages;
