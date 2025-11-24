import { ChevronDown, Star } from "lucide-react";

ChevronDown


function Rating({ rating, reviewCount }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="flex items-center">
        <span className="text-orange-500 mr-1">{rating}</span>
        {[...Array(Math.floor(rating))].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
        ))}
        {rating % 1 !== 0 && <Star className="w-4 h-4 text-orange-400" />}
      </div>
      <ChevronDown className="w-4 h-4" />
      <a href="#" className="text-blue-600 text-sm">{reviewCount} ratings</a>
      <span className="text-gray-400">|</span>
      <a href="#" className="text-blue-600 text-sm">Search this page</a>
    </div>
  );
}

export default Rating