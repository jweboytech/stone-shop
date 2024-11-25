import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Image } from '@nextui-org/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import clsx from 'clsx';

import { usePrevNextButtons } from '@/hooks/usePrevNextButtons';
import { usePreviewStore } from '@/store/preview';

const PreviewCommodity = ({ items }: { items: string[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const { onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);
  const visible = usePreviewStore((state) => state.visible);
  const onClose = usePreviewStore((state) => state.onClose);
  const index = usePreviewStore((state) => state.index);

  React.useEffect(() => {
    if (!emblaApi) return;

    emblaApi.scrollTo(index, true);
  }, [index]);

  return (
    <div
      className={clsx(
        'fixed w-screen h-screen left-0 top-0 z-500 bg-white/80 overflow-hidden',
        visible ? 'visible' : 'invisible',
      )}>
      <div ref={emblaRef} className="embla__container">
        <div className="w-screen h-screen flex">
          {items.map((item) => (
            <div key={item} className="flex justify-center flex-[0_0_100%]">
              <Image className="w-full h-screen" radius="none" src={item} />
            </div>
          ))}
        </div>
      </div>
      <div
        aria-hidden
        className=" absolute top-4 right-4 cursor-pointer text-danger"
        onClick={onClose}>
        <X size={28} />
      </div>
      <div
        aria-hidden
        className=" absolute top-1/2 -translate-y-1/2 left-3 cursor-pointer"
        onClick={onPrevButtonClick}>
        <div className="bg-danger rounded-full w-10 h-10 text-white inline-flex items-center justify-center">
          <ChevronLeft size={28} strokeWidth={2.8} />
        </div>
      </div>
      <div
        aria-hidden
        className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer"
        onClick={onNextButtonClick}>
        <div className="bg-danger rounded-full w-10 h-10 text-white inline-flex items-center justify-center">
          <ChevronRight size={28} strokeWidth={2.8} />
        </div>
      </div>
    </div>
  );
};

export default PreviewCommodity;
