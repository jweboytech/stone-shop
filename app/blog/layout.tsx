import { Navbar } from '@/components/navbar';

function BlogLayout({ children }: BaseProps) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

export default BlogLayout;
