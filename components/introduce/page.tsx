import React from 'react';
import Link from 'next/link';

import { Button } from '../ui/button';

const Introduce = () => {
  return (
    <div className="flex flex-col gap-5 py-10">
      <h2 className="text-center text-40 font-normal tracking-wider">
        PerperStone Name & Stone, Forever Unique
      </h2>
      <div className="w-1/2 mx-auto">
        <p className="text-center text-black/80">
          Custom jewelry tells your story. Designed uniquely for you, each piece
          celebrates individuality, marks life&apos;s special moments, and
          becomes a timeless keepsake. More than just adornment - it&apos;s
          wearable meaning, crafted to last a lifetime.
        </p>
      </div>
      <div className="text-center w-full">
        <Link href="/collections/best-sellers">
          <Button
            className="text-base font-bold capitalize tracking-widest bg-brown hover:bg-brown hover:text-white text-white h-12 cursor-pointer"
            variant="outline">
            Discover the Collection
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Introduce;
