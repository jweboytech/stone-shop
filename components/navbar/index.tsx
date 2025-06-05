import Link from 'next/link';
import React from 'react';

const MENUS = [
  { label: 'best sellers', value: 'bestSellers' },
  { label: 'new in', value: 'newIn' },
  { label: 'necklaces', value: 'necklaces' },
  { label: 'bracelets', value: 'bracelets' },
  { label: 'earrings', value: 'earrings' },
  { label: 'rings', value: 'rings' },
  { label: 'sets', value: 'sets' },
  { label: 'sale', value: 'sale' },
  // { label: 'all jewellery', value: 'allJewellery' },
];

const Navbar = () => {
  return (
    <div className="px-15 flex justify-center">
      <ul className="h-full uppercase flex">
        {MENUS.map((item) => (
          <li className="px-4 py-3 font-medium" key={item.value}>
            <Link href="/">{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
