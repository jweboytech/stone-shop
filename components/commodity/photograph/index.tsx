import { Image } from '@nextui-org/image';
import { Plus } from 'lucide-react';
import React from 'react';

import PreviewCommodity from '../preview';

import { usePreviewStore } from '@/store/preview';

const ShowImage = ({
  src,
  onClick,
  index,
}: {
  onClick: (index: number) => void;
  index: number;
  src: string;
}) => {
  return (
    <div
      aria-hidden
      className="relative w-full h-full cursor-pointer group"
      onClick={onClick.bind(null, index)}>
      <div className="absolute z-50 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center opacity-70 ">
          <Plus size={28} />
        </div>
      </div>
      <Image alt={src} radius="sm" src={src} />
    </div>
  );
};

const Photograph = ({ items = [] }: { items?: string[] }) => {
  const [primaryImage, ...restImages] = items;
  const onOpen = usePreviewStore((state) => state.onOpen);

  return (
    <React.Fragment>
      <div className="flex flex-col gap-8 w-[762px] relative">
        <ShowImage index={0} src={primaryImage} onClick={onOpen} />
        <div className="grid grid-cols-2">
          {restImages.map((item, index) => (
            <ShowImage
              key={item}
              index={index + 1}
              src={item}
              onClick={onOpen}
            />
          ))}
        </div>
      </div>
      <PreviewCommodity items={items} />
    </React.Fragment>
  );
};

export default Photograph;
