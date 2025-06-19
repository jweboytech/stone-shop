import { Navbar } from '../_navbar';

const CommonLayout = ({ children }: BaseProps) => {
  return (
    <div className="flex flex-col">
      {/* <Navbar /> */}
      {children}
    </div>
  );
};

export default CommonLayout;
