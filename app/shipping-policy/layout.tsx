import MainLayout from '@/layout/main';

const Layout = ({ children }: BaseProps) => {
  return (
    <MainLayout>
      <div className="mx-62 px-10 pt-20">{children}</div>
    </MainLayout>
  );
};

export default Layout;
