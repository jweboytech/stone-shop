import { Star } from 'lucide-react';
import React from 'react';

type ScrollOption = Option & { icon: React.ReactElement };

const options: ScrollOption[] = [
  { label: 'free shipping', value: 'freeShipping', icon: <Star size={16} /> },
  { label: '60 day returns', value: 'returnDays', icon: <Star size={16} /> },
  {
    label: 'personalised fine jewellery',
    value: 'jewellery',
    icon: <Star size={16} />,
  },
  { label: 'lifetime warranty', value: 'lifetime', icon: <Star size={16} /> },

  { label: 'free shipping', value: 'freeShipping1', icon: <Star size={16} /> },
  { label: '60 day returns', value: 'returnDays1', icon: <Star size={16} /> },
  {
    label: 'personalised fine jewellery',
    value: 'jewellery1',
    icon: <Star size={16} />,
  },
  { label: 'lifetime warranty', value: 'lifetime1', icon: <Star size={16} /> },
];

const items = Array.from<ScrollOption>({ length: 10 }).reduce<ScrollOption[]>(
  (arr) => {
    arr.push(...options);

    return arr;
  },
  [],
);

const GuaranteeBar = () => {
  return (
    <div className="text-white bg-black h-16 overflow-hidden relative flex items-center">
      <ul className="flex gap-8 items-center w-full absolute left-0 animate-marquee will-change-transform backface-hidden transform-gpu">
        {items.map((item, index) => (
          <li key={index} className="uppercase flex gap-2 items-center ">
            {item.icon}
            <div className="text-base font-medium w-max">{item.label}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GuaranteeBar;
