import React from 'react';

import { Navbar } from '@/components/navbar';

function AboutLayout({ children }: BaseProps) {
  return (
    <React.Fragment>
      <Navbar />
      {children}
    </React.Fragment>
  );
}

export default AboutLayout;
