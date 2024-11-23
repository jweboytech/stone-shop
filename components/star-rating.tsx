import { PawPrint } from 'lucide-react';
import StarRatingIcon from './icons/star-rating';

const StarRating = () => {
  return (
    <div className="inline-flex items-center">
      <PawPrint className="text-primary" fill="currentColor" size={16} />
      <PawPrint className="text-primary" fill="currentColor" size={16} />
      <PawPrint className="text-primary" fill="currentColor" size={16} />
      <PawPrint className="text-primary" fill="currentColor" size={16} />
      <PawPrint className="text-foreground-400" fill="currentColor" size={16} />
    </div>
  );
};

export default StarRating;
