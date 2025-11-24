import RatingStars from "./RatingStars";



function ReviewCard({ review }) {

        
  return (
    <div className="border-b border-gray-300 py-6">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold">
          {review.avatar}
        </div>
        <div className="flex-1">
          <div className="font-semibold text-sm mb-1">{review.name}</div>
          
          <div className="flex items-center gap-2 mb-2">
            <RatingStars rating={review.rating} />
            <span className="font-bold">{review.title}</span>
          </div>

          <div className="text-xs text-gray-600 mb-2">
            Reviewed in {review.location} on {review.date}
          </div>

          {review.verifiedPurchase && (
            <div className="mb-2">
              <span className="text-xs text-orange-600 font-semibold">Verified Purchase</span>
            </div>
          )}

          {review.size && review.color && (
            <div className="text-xs text-gray-700 mb-2">
              Size: {review.size}  |  Color: {review.color}
            </div>
          )}

          <div className="text-sm text-gray-800 mb-3">{review.content}</div>

          {review.images && review.images.length > 0 && (
            <div className="flex gap-2 mb-3">
              {review.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="Review"
                  className="w-20 h-20 object-cover rounded border cursor-pointer hover:opacity-80"
                />
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 text-sm">
            <button className="text-gray-700 hover:text-gray-900">
              <span className="mr-1">👍</span> Helpful
            </button>
            <button className="text-gray-600 hover:text-gray-800">Report</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard