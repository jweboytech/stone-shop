import MainLayout from '@/layout/main';

const Layout = ({ children }: BaseProps) => {
  return (
    <MainLayout>
      <div className="mx-62 py-8">{children}</div>
    </MainLayout>
  );
};

export default Layout;
