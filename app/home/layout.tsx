import React from 'react';

import Footer from '@/layout/footer';

const MainLayout = ({ children }: BaseProps) => {
  return (
    <React.Fragment>
      {children}
      <Footer />
    </React.Fragment>
  );
};

export default MainLayout;
