import StarRatingIcon from "./icons/star-rating";

const StarRating = () => {
  return (
    <div className="flex items-center">
      <StarRatingIcon isActive />
      <StarRatingIcon isActive />
      <StarRatingIcon isActive />
      <StarRatingIcon />
      <StarRatingIcon />
    </div>
  );
};

export default StarRating;
