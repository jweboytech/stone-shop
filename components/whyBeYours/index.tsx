import { Dog } from 'lucide-react';
import React from 'react';

const WhyBeYours = () => {
  return (
    <div className="px-12 py-9 bg-white">
      <h2 className="text-center text-[40px] font-medium mb-8">
        Why Be Yours?
      </h2>
      <ul className="grid grid-cols-4 gap-12">
        <li className="flex flex-col items-center justify-center">
          <Dog size={26} />
          <p className="py-4">Clean Skincare</p>
          <p className="mt-1 text-center text-default-700">
            Clean and natural skincare with safe and transparent ingredients
          </p>
        </li>
        <li className="flex flex-col items-center justify-center">
          <Dog size={26} />
          <p className="py-4">European Delivery</p>
          <p className="mt-1 text-center text-default-700">
            Fast delivery options with tracking No EU import duties
          </p>
        </li>
        <li className="flex flex-col items-center justify-center">
          <Dog size={26} />
          <p className="py-4">Sustainability</p>
          <p className="mt-1 text-center text-default-700">
            Our signature shipping boxes are fully recyclable and biodegradable
          </p>
        </li>
        <li className="flex flex-col items-center justify-center">
          <Dog size={26} />
          <p className="py-4">Authorized Retailer</p>
          <p className="mt-1 text-center text-default-700">
            We are an authorized retailer for all the brands we carry
          </p>
        </li>
      </ul>
    </div>
  );
};

export default WhyBeYours;
