import React from 'react';

import { Navbar } from '@/components/_navbar';

function AboutLayout({ children }: BaseProps) {
  return (
    <React.Fragment>
      <Navbar />
      {children}
    </React.Fragment>
  );
}

export default AboutLayout;
