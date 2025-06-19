import React from 'react';
import Link from 'next/link';

import FacebookIcon from '../icons/facebook';
import InstagramIcon from '../icons/instagram';

const MediaBar = () => {
  return (
    <div className="flex justify-between items-center px-15 py-1 shadow-xs">
      <div>
        <Link className="py-1 px-2 w-fit text-sm font-medium" href="/help">
          Need Help?
        </Link>
        <Link className="py-1 px-2 w-fit text-sm font-medium" href="/order">
          Track Order
        </Link>
      </div>
      <div className="flex items-center gap-8">
        <div className="flex gap-3">
          <Link href="https://www.instagram.com/" target="_blank">
            <InstagramIcon />
          </Link>
          <Link href="https://www.facebook.com/" target="_blank">
            <FacebookIcon />
          </Link>
        </div>
        <select>country</select>
      </div>
    </div>
  );
};

export default MediaBar;
