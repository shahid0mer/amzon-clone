import { ChevronDown, Star } from "lucide-react";


function ProductDetailsSection({product}) {
  return (
    <div className="mt-8 border-t border-gray-300 pt-6">
      <h2 className="text-xl font-bold mb-4">Product details</h2>
      <div className="text-sm space-y-2">
        <div className="flex gap-4">
          <span className="font-bold w-48">Date First Available :</span>
          <span>12 July 2023</span>
        </div>
        <div className="flex gap-4">
          <span className="font-bold w-48">ASIN :</span>
          <span>B0C8F1AR2H</span>
        </div>
        <div className="flex gap-4">
          <span className="font-bold w-48">Customer reviews :</span>
          <div className="flex items-center gap-2">
            <span>4.1</span>
            {[...Array(4)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
            ))}
            <Star className="w-4 h-4 text-orange-400" />
            <ChevronDown className="w-4 h-4" />
            <a href="#" className="text-blue-600 ml-2"> {product.rating.count
} ratings</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsSection