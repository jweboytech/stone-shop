import MainLayout from '@/layout/main';
import DocsLayout from '@/layout/docs';

const Layout = ({ children }: BaseProps) => {
  return (
    <MainLayout>
      <DocsLayout>{children}</DocsLayout>
    </MainLayout>
  );
};

export default Layout;
