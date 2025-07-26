import { Medal, ShieldX, Truck } from 'lucide-react';
import React from 'react';

const items: Array<Option & { icon: React.ReactElement }> = [
  {
    label: 'satisfaction guarantee',
    value: 'satisfactionGuarantee',
    icon: <Medal color="#bd8443" size={64} strokeWidth={1} />,
  },
  {
    label: 'lifetime warranty',
    value: 'lifetimeWarranty',
    icon: <ShieldX color="#bd8443" size={64} strokeWidth={1} />,
  },
  {
    label: 'free shipping worldwide',
    value: 'freeShipping',
    icon: <Truck color="#bd8443" size={64} strokeWidth={1} />,
  },
];

const Guarantee = () => {
  return (
    <div className="border-t-4 border-t-amber border-b-4 border-b-amber bg-surface-light pt-8 pb-5 overflow-hidden">
      <ul className="grid grid-cols-1 lg:grid-cols-3 px-4 lg:px-15">
        {items.map((item) => (
          <li
            key={item.value}
            className="uppercase flex flex-col gap-2 items-center mb-15 lg:mb-0 lg:p-8">
            {item.icon}
            <span className="text-xl lg:text-base font-medium text-22">
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Guarantee;
