import { Image } from '@nextui-org/image';
import clsx from 'clsx';
import React from 'react';

const Photograph = ({ data }: { data?: Commodity }) => {
  const [activeIndex, setActiveKey] = React.useState(0);

  const handleClick = (index: number) => () => {
    setActiveKey(index);
  };

  return (
    <div className="flex gap-x-4">
      <div className="flex flex-col w-44 gap-4">
        {data?.mainPics.map((item, index) => (
          <Image
            key={item}
            alt={data.name}
            className={clsx(
              'border-2 cursor-pointer transition-all duration-1000',
              activeIndex === index ? 'border-primary' : 'border-transparent',
            )}
            radius="sm"
            src={item}
            onClick={handleClick(index)}
          />
        ))}
      </div>
      <Image alt={data?.name} radius="sm" src={data?.mainPics[activeIndex]} />
    </div>
  );
};

export default Photograph;
