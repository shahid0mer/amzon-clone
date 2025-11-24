import { useState } from "react";
import CustomerReviewsHeader from "./CustomerReviewsHeader";
import HowRatingsCalculated from "./HowRatingsCalculated";
import RatingBreakdown from "./RatingBreakdown";
import RatingStars from "./RatingStars";
import ReviewCard from "./ReviewCard";
import ReviewFilter from "./ReviewFilter";
import WriteReviewSection from "./WriteReviewSection";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getReviews } from "../../Features/reviewThunk";
import { useParams } from "react-router-dom";



export default function CustomerReviews() {

const {id} = useParams()
const dispatch = useDispatch();
const {reviews} = useSelector(state => state.reviews);
console.log(reviews);


useEffect(() => {
  dispatch(getReviews(id));
}, []);

  const [ratings] = useState([
    { stars: 5, count: 0 },
    { stars: 4, count: 23 },
    { stars: 3, count: 0 },
    { stars: 2, count: 2 },
    { stars: 1, count: 0 }
  ]);

//   const [reviews] = useState([
//     {
//       id: 1,
//       name: 'Brooke',
//       avatar: 'B',
//       rating: 4,
//       title: 'Favorite dress',
//       location: 'the United States',
//       date: '6 August 2024',
//       size: '40',
//       color: 'Black',
//       verifiedPurchase: true,
//       content: "I initially purchased this dress on sale. It turned out to be my favorite dress of this summer. It is extremely versatile and unexpectedly flattering. When I accidentally tore it, I was really upset. My husband told me to buy it again, which I typically wouldn't do. It wasn't on sale and I am so frugal. The dress washes very well and I always get compliments when I wear it.",
//       images: []
//     },
//     {
//       id: 2,
//       name: 'Elva S.',
//       avatar: 'E',
//       rating: 5,
//       title: 'Lindo!!',
//       location: 'Mexico',
//       date: '11 August 2023',
//       verifiedPurchase: true,
//       content: "Bien hecho, bonita tela y bonita caída, fresco y casual.\nLa marca lo dice!!",
//       images: []
//     },
//     {
//       id: 3,
//       name: 'Ana Patricia Rodriguez',
//       avatar: 'A',
//       rating: 3,
//       title: 'COMODIDAD',
//       location: 'the United State',
//       date: '29 June 2023',
//       verifiedPurchase: true,
//       content: "ES LINDO COMODO Y LIGERO PARA CLIMA CALIDO, ES LA TELA ADECUADA",
//       images: []
//     },
//     {
//       id: 4,
//       name: 'Ivelisse',
//       avatar: 'I',
//       rating: 4,
//       title: 'Excellent dress',
//       location: 'the United State',
//       date: '3 April 2018',
//       verifiedPurchase: true,
//       content: "Lovely dress... I'm 5'1\" with pear form body (149 pounds mostly in hips and booty) and it fits perfect.",
//       images: []
//     }
//   ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Rating Summary */}
        <div className="lg:col-span-1">
          <CustomerReviewsHeader averageRating={4.1} totalReviews={67} />
          <RatingBreakdown ratings={ratings} />
          <HowRatingsCalculated />
          <WriteReviewSection />
        </div>

        {/* Right Column - Reviews List */}
        <div className="lg:col-span-2">
          <ReviewFilter />
            <div className="mb-6">
            <h3 className="text-lg font-bold mb-3">Top reviews from other countries</h3>
            <button className="border border-gray-300 rounded px-4 py-1.5 text-sm hover:bg-gray-50">
                Translate all reviews to English
            </button>
            </div>
          
          <div className="space-y-4">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          <div className="py-4">
      <a href="#" className="text-blue-600 hover:text-orange-600 hover:underline text-sm">
        See more reviews
      </a>
          </div>
        </div>
      </div>
    </div>
  );
}