import React from 'react';
import Link from 'next/link';

import { Button } from '../ui/button';

const Gift = () => {
  return (
    <div className="bg-surface-light pt-10 pb-15 px-10">
      <div className="lg:mx-21 flex gap-20 items-center justify-center">
        <div className="w-[476px]">
          <h2 className="uppercase font-medium text-28 lg:text-4xl mb-2 lg:mb-4 text-center">
            find the perfect gift for her
          </h2>
          <p className="text-base mb-4 text-center">
            Personalised jewellery is the heart of what we do. Made for you,
            crafted by us. Celeste Adore creates jewellery for moments that last
            a lifetime.
          </p>
          <div className="text-center">
            <Link href="/collections/best-sellers">
              <Button className="uppercase text-base font-bold h-11">
                start shopping
              </Button>
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex w-[624px] h-[624px] bg-gray-200  items-center justify-center">
          Placeholder
        </div>
      </div>
    </div>
  );
};

export default Gift;
