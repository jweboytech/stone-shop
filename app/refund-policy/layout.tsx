import DocsLayout from '@/layout/docs';
import MainLayout from '@/layout/main';

const Layout = ({ children }: BaseProps) => {
  return (
    <MainLayout>
      <DocsLayout>{children}</DocsLayout>
    </MainLayout>
  );
};

export default Layout;
