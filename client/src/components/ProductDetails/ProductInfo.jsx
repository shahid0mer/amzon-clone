import { Lock, RotateCcw, } from "lucide-react";
import Rating from "./Rating";
import ProductDetails from "./ProductDetails";
import AboutItem from "./AboutItem";



function ProductInfo({ selectedSize, setSelectedSize, product  }) {
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="col-span-4">
      <div className="text-xs text-orange-600 mb-1">{product.brand}</div>
      <h1 className="text-2xl mb-2">{product.name}</h1>
      
      <Rating rating={4.1} reviewCount={67} />

      <div className="border-t border-gray-300 border-b py-3 mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-xs text-gray-600">-54%</span>
          <span className="text-3xl">₹{product.price * 100}</span>
          <span className="text-xs align-super">14</span>
        </div>
        <div className="text-xs text-gray-600">All incl. of taxes VAT.</div>
        <div className="text-xs text-gray-600 mt-1">
          Sign in to redeem: <span className="bg-red-600 text-white px-2 py-0.5 rounded">Extra 20% off</span> with mem credit cards.
        </div>
      </div>

      <div className="flex gap-4 mb-4 text-xs">
        <div className="text-center">
          <div className="text-blue-600 mb-1">📅</div>
          <div className="text-gray-600">Electronic</div>
          <div className="text-gray-600">payment Only</div>
        </div>
        <div className="text-center">
          <RotateCcw className="w-5 h-5 mx-auto mb-1 text-blue-600" />
          <div className="text-gray-600">30 days</div>
          <div className="text-gray-600">Returnable</div>
        </div>
        <div className="text-center">
          <Lock className="w-5 h-5 mx-auto mb-1 text-blue-600" />
          <div className="text-gray-600">Secure</div>
          <div className="text-gray-600">transaction</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="font-bold mb-2">Size: {selectedSize}</div>
        <div className="flex gap-2">
          {sizes.map(size => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-1 border  ${selectedSize === size ? 'border-orange-500 bg-orange-50' : 'border-gray-300'}`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <div className="font-bold mb-2">Color: Black</div>
      </div>

      <ProductDetails />
      <AboutItem />
    </div>
  );
}

export default ProductInfo