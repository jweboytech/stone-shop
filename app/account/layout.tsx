const AccountLayout = ({ children }: BaseProps) => {
  return (
    <div className="px-44 h-[calc(100vh-64px)] flex justify-center items-center">
      {children}
    </div>
  );
};

export default AccountLayout;
