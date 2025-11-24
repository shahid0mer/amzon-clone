import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../Features/cartThunk";


const ProductCard = ({ product }) => {
  const [imgError, setImgError] = useState(false);
  const dispatch = useDispatch()



  // Calculate discount percentage
  const discountPercent = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <Link to= {`/product/${product._id}`}>
    <div className=" p-3  transition-shadow border border-gray-200 ">
      {/* Product Image */}
      <div className="relative w-full h-48 mb-3 flex items-center justify-center">
        {!imgError ? (
          <img 
            src={product.images?.[0]?.url} 
            alt={product.name}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Product Title */}
      <h3 className="text-sm text-gray-800 mb-2 leading-tight overflow-hidden hover:text-yellow-600" style={{
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        minHeight: '2.5rem'
      }}>
        {product.name}
      </h3>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center bg-green-700 text-white text-xs px-2 py-0.5 rounded">
          <span>{product.rating?.average}</span>
          <span className="ml-1">★</span>
        </div>
        <span className="text-xs text-gray-500">
          {product.rating?.count?.toLocaleString()}
        </span>
      </div>

      {/* Additional Info */}
      {product.info && (
        <p className="text-xs text-gray-600 mb-2">
          {product.info}
        </p>
      )}

      {/* Price Section */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-2xl font-medium text-gray-900">
          ₹{product.price?.toLocaleString()}
        </span>
        {product.originalPrice && (
          <>
            <span className="text-sm text-gray-500 line-through">
              ₹{product.originalPrice?.toLocaleString()}
            </span>
            <span className="text-sm text-red-600 font-medium">
              ({discountPercent}% off)
            </span>
          </>
        )}
      </div>

      {/* Offer Text */}
      {product.offer && (
        <p className="text-xs text-green-700 mb-3">
          {product.offer}
        </p>
      )}

      {/* Delivery Info */}
      {product.delivery || (
         <p className="text-xs text-gray-700 mb-3">
             Get it by Saturday, 14 Sept, 7:00 am - 9:00 pm
        </p>
       )}

      {/* Add to Cart Button */}
      <button className=" bg-(--color-amazon-yellow) hover:bg-(--color-amazon-orange) text-gray-900 text-sm font-medium px-4 py-1.5 rounded-2xl shadow-sm transition-colors self-start"
        onClick={(e) => {
        e.preventDefault()  
        e.stopPropagation() 
        dispatch(addToCart({
        productId: product._id,  
        quantity: 1,
    }));
        
  }}
      >
        Add to Cart
      </button>
    </div>
    </Link>
  );
};

export default ProductCard;
