import React, { useState } from 'react';
import { Star, ChevronDown } from 'lucide-react';


function RatingStars({ rating, size = 'sm' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClasses[size]} ${
            star <= rating
              ? 'fill-orange-400 text-orange-400'
              : star - rating < 1
              ? 'text-orange-400'
              : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
}

export default RatingStars