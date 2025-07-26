import Link from 'next/link';
import React from 'react';

import FacebookIcon from '../icons/facebook';
import InstagramIcon from '../icons/instagram';

export interface MediaChannelsProps {
  size?: number;
}

const MediaChannels = ({ size = 16 }: MediaChannelsProps) => {
  return (
    <div className="flex gap-3">
      <Link href="http://instagram.com/perperstore0" target="_blank">
        <InstagramIcon size={size} />
      </Link>
      <Link
        href="https://www.facebook.com/profile.php?id=61577816704879"
        target="_blank">
        <FacebookIcon size={size} />
      </Link>
    </div>
  );
};

export default MediaChannels;
