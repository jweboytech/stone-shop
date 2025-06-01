import { Image } from '@nextui-org/image';
import clsx from 'clsx';
import React from 'react';

import { fontLilitaOne } from '@/config/fonts';

const OurResponsiblyPage = () => {
  return (
    <div>
      <Image
        radius="none"
        src="https://www.westpaw.com/cdn/shop/files/FullBanner_1440x440_zwig.jpg?v=1613771809&width=2800"
        width="100%"
      />
      <div className="py-10 px-8 w-4/5">
        <h1
          className={clsx(
            'uppercase font-semibold text-4xl font-lilita-one',
            fontLilitaOne.variable,
          )}>
          We&apos;re committed to decreasing our environmental footprint—er,
          pawprint—while increasing our positive impact
        </h1>
        <p className="text-lg mt-4">
          For you, it means you can trust that you&apos;re purchasing
          high-quality pet products made with passion and integrity. Everything
          we make is long-lasting, lovingly handcrafted—and always safe for
          pets, people, and the planet.
        </p>
      </div>
    </div>
  );
};

export default OurResponsiblyPage;
