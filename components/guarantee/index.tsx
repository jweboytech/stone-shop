import { Dot, Medal, Shield, Star, Truck } from 'lucide-react';
import React from 'react';

const items: Array<Option & { icon: React.ReactElement }> = [
  {
    label: 'satisfaction guarantee',
    value: 'satisfactionGuarantee',
    icon: <Medal size={64} />,
  },
  {
    label: 'lifetime warranty',
    value: 'lifetimeWarranty',
    icon: <Shield size={64} />,
  },
  {
    label: 'free shipping worldwide',
    value: 'freeShipping',
    icon: <Truck size={64} />,
  },
];

const Guarantee = () => {
  return (
    <div className="border-t-4 border-t-amber border-b-4 border-b-amber bg-surface-light pt-8 pb-5 overflow-hidden">
      <ul className="grid grid-cols-3 px-15">
        {items.map((item) => (
          <li
            key={item.value}
            className="uppercase flex flex-col gap-2 items-center p-8">
            {item.icon}
            <span className="text-base font-medium text-22">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Guarantee;
