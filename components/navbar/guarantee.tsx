import { Dot, Star } from 'lucide-react';
import React from 'react';

const items: Array<Option & { icon: React.ReactElement }> = [
  { label: 'free shipping', value: 'freeShipping', icon: <Star size={16} /> },
  { label: '90 day returns', value: 'returnDays', icon: <Star size={16} /> },
  {
    label: 'personalised fine jewellery',
    value: 'jewellery',
    icon: <Star size={16} />,
  },
  { label: 'lifetime warranty', value: 'lifetime', icon: <Star size={16} /> },

  { label: 'free shipping', value: 'freeShipping1', icon: <Star size={16} /> },
  { label: '90 day returns', value: 'returnDays1', icon: <Star size={16} /> },
  {
    label: 'personalised fine jewellery',
    value: 'jewellery1',
    icon: <Star size={16} />,
  },
  { label: 'lifetime warranty', value: 'lifetime1', icon: <Star size={16} /> },
];

const GuaranteeBar = () => {
  return (
    <div className="text-white py-5 overflow-hidden">
      <ul className="flex gap-8 items-center overflow-x-auto w-1000">
        {items.map((item) => (
          <li key={item.value} className="uppercase flex gap-2 items-center ">
            {item.icon}
            <span className="text-base font-medium">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GuaranteeBar;
