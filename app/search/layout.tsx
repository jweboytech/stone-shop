import BasicBar from '@/components/navbar/basic';

const Layout = ({ children }: BaseProps) => {
  return (
    <div className="bg-surface-light h-screen">
      <BasicBar />
      <div className="py-5 px-5 lg:py-10 lg:w-1/2 lg:mx-auto">{children}</div>
    </div>
  );
};

export default Layout;
