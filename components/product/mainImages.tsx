'use client';

import Image from 'next/image';
import React from 'react';
import clsx from 'clsx';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

import { useProductStore } from '@/store/product';

const ProductMainImages = ({ items }: { items: any[] }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [mainApi, setMainApi] = React.useState<CarouselApi>();
  const [thumbApi, setThumbApi] = React.useState<CarouselApi>();
  const variantPreviewImage = useProductStore(
    (state) => state.variantPreviewImage,
  );

  const handleThumbnailClick = (index: number) => () => {
    setActiveIndex(index);
    mainApi?.scrollTo(index);
    thumbApi?.scrollTo(index);
  };

  // 🔁 监听主图轮播变化，更新当前索引 + 缩略图位置
  React.useEffect(() => {
    if (mainApi != null) {
      const onSelect = () => {
        const index = mainApi.selectedScrollSnap();

        setActiveIndex(index);
        thumbApi?.scrollTo(index);
      };

      mainApi.on('select', onSelect);

      return () => {
        mainApi.off('select', onSelect);
      };
    }
  }, [mainApi, thumbApi, items]);

  // 🔁 variantPreviewImage 来自其他组件时自动跳转
  React.useEffect(() => {
    if (variantPreviewImage && mainApi) {
      const index = items.findIndex((item) => item.url === variantPreviewImage);

      if (index !== -1) {
        mainApi.scrollTo(index);
        thumbApi?.scrollTo(index);
        setActiveIndex(index);
      }
    }
  }, [variantPreviewImage, mainApi, thumbApi, items]);

  return (
    <div className="flex flex-col gap-4 lg:gap-6 mb-4 lg:mb-0 ">
      <div className="bg-surface-light w-full">
        <Carousel setApi={setMainApi}>
          <CarouselContent>
            {items.map((item) => (
              <CarouselItem key={item.id}>
                <Image
                  priority
                  alt="product"
                  className="w-full h-full cursor-pointer"
                  height={748}
                  src={item.url}
                  width={748}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="relative px-16 lg:px-12">
        <Carousel setApi={setThumbApi}>
          <CarouselContent>
            {items.map((item, index) => (
              <CarouselItem
                key={item.id}
                className="basis-1/4 lg:basis-1/5"
                onClick={handleThumbnailClick(index)}>
                <Image
                  priority
                  alt="product"
                  className={clsx(
                    'w-full h-full cursor-pointer border transition-all duration-300',
                    index === activeIndex
                      ? 'border-black'
                      : 'border-transparent',
                  )}
                  height={68}
                  src={item.url}
                  width={68}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* 左右按钮点击也控制缩略图滚动 */}
          <CarouselPrevious
            onClick={() => {
              if (mainApi) {
                const newIndex =
                  (activeIndex - 1 + items.length) % items.length;

                mainApi.scrollTo(newIndex);
                thumbApi?.scrollTo(newIndex);
              }
            }}
          />
          <CarouselNext
            onClick={() => {
              if (mainApi) {
                const newIndex = (activeIndex + 1) % items.length;

                mainApi.scrollTo(newIndex);
                thumbApi?.scrollTo(newIndex);
              }
            }}
          />
        </Carousel>
      </div>
    </div>
  );
};

export default ProductMainImages;
