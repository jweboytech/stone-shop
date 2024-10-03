const Price = ({ value }: { value: string | number }) => {
  return (
    <p className="mt-1">
      <span className="text-xs">$</span>
      <span className="text-lg">{value}</span>
    </p>
  );
};

export default Price;
