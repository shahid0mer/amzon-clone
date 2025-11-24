function RatingBreakdown({ ratings }) {
  const total = ratings.reduce((sum, r) => sum + r.count, 0);

  return (
    <div className="space-y-2">
      {ratings.map((rating) => {
        const percentage = total > 0 ? (rating.count / total) * 100 : 0;
        return (
          <div key={rating.stars} className="flex items-center gap-2 text-sm">
            <a href="#" className="text-blue-600 hover:text-orange-600 hover:underline w-12">
              {rating.stars} star
            </a>
            <div className="flex-1 bg-gray-200 h-5 rounded overflow-hidden">
              <div
                className="bg-orange-400 h-full"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="text-gray-700 w-8 text-right">{Math.round(percentage)}%</span>
          </div>
        );
      })}
    </div>
  );
}

export default RatingBreakdown