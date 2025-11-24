import RatingStars from "./RatingStars";




function CustomerReviewsHeader({ averageRating, totalReviews }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
      <div className="flex items-center gap-3 mb-2">
        <RatingStars rating={averageRating} size="md" />
        <span className="text-lg font-bold">{averageRating} out of 5</span>
      </div>
      <div className="text-sm text-gray-600 mb-4">{totalReviews} global rating</div>
    </div>
  );
}
export default CustomerReviewsHeader