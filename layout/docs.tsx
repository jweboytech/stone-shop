import React from 'react';

const DocsLayout = ({ children }: BaseProps) => {
  return (
    <div className="lg:mx-62 px-4 py-4 lg:px-10 lg:pt-20 lg:pb-10">
      {children}
    </div>
  );
};

export default DocsLayout;
