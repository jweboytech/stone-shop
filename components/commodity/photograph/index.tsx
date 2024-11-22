import { Image } from '@nextui-org/image';
import clsx from 'clsx';
import React from 'react';

const Photograph = ({ data }: { data?: Commodity }) => {
  const [activeIndex, setActiveKey] = React.useState(0);

  const handleClick = (index: number) => () => {
    setActiveKey(index);
  };

  return (
    <div className="flex flex-col gap-8">
      <Image
        alt={data?.name}
        className="w-full h-full"
        radius="sm"
        src={data?.mainPics[activeIndex]}
      />
      <div className="flex gap-2 shadow-2xl w-fit m-auto px-2 py-2">
        {data?.mainPics.map((item, index) => (
          <Image
            key={item}
            alt={data.name}
            className={clsx(
              'border-2 cursor-pointer transition-all duration-1000 w-14 h-14',
              activeIndex === index ? 'border-primary' : 'border-transparent',
            )}
            radius="sm"
            src={item}
            onClick={handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Photograph;
