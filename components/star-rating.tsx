import { PawPrint } from 'lucide-react';

const StarRating = () => {
  return (
    <div className="flex items-center">
      <PawPrint className="text-primary" fill="currentColor" size={18} />
      <PawPrint className="text-primary" fill="currentColor" size={18} />
      <PawPrint className="text-primary" fill="currentColor" size={18} />
      <PawPrint className="text-primary" fill="currentColor" size={18} />
      <PawPrint className="text-foreground-400" fill="currentColor" size={18} />
    </div>
  );
};

export default StarRating;
