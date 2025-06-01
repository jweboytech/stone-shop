import { Navbar } from '@/components/_navbar';

function BlogLayout({ children }: BaseProps) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

export default BlogLayout;
