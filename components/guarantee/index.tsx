import { Medal, ShieldX, Truck } from 'lucide-react';
import React from 'react';

const items: Array<Option & { icon: React.ReactElement }> = [
  {
    label: '30 day returns',
    value: 'satisfactionGuarantee',
    icon: <Medal color="#bd8443" size={60} strokeWidth={1} />,
  },
  {
    label: 'lifetime warranty',
    value: 'lifetimeWarranty',
    icon: <ShieldX color="#bd8443" size={60} strokeWidth={1} />,
  },
  {
    label: 'free shipping worldwide',
    value: 'freeShipping',
    icon: <Truck color="#bd8443" size={60} strokeWidth={1} />,
  },
];

const Guarantee = () => {
  return (
    <div className="pt-8 pb-14">
      <h2 className="text-3xl text-center mb-10">Try us Risk-Free</h2>
      <ul className="grid grid-cols-1 lg:grid-cols-3 px-4 lg:px-15 py-2">
        {items.map((item) => (
          <li
            key={item.value}
            className="uppercase flex flex-col gap-4 items-center mb-15 lg:mb-0">
            {item.icon}
            <span className="text-base lg:text-2xl">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Guarantee;
