import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchAllProducts } from '../Features/productThunk'; 
import { Link } from 'react-router-dom';

// Custom Arrow Components
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0  top-1/2 -translate-y-1/2 z-10 w-6 h-14 border border-gray-300 rounded bg-white  shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
  >
    <ChevronLeft className="w-6 h-6 text-gray-700" />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-6 h-14 border border-gray-300 rounded bg-white  shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
  >
    <ChevronRight className="w-6 h-6 text-gray-700" />
  </button>
);

const ProductCarousel = ({title = "Related to items you've viewed"}) => {
  const dispatch = useDispatch();
  const [randomProducts, setRandomProducts] = useState([]);
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    // Fetch products from backend
    dispatch(fetchAllProducts({ page: 1, limit: 20 }));
  }, [dispatch]);

  useEffect(() => {
    if (products && products.length > 0) {
      // Get 10 random products from the fetched list
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      setRandomProducts(shuffled.slice(0, 10));
    }
  }, [products]);

  const settings = {
    dots: false,
    infinite: randomProducts.length > 7,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    autoplay: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 2,
          infinite: randomProducts.length > 6,
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          infinite: randomProducts.length > 5,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: randomProducts.length > 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: randomProducts.length > 3,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: randomProducts.length > 2,
        }
      }
    ]
  };

  if (loading) {
    return (
      <div className="w-full  py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Related to items you've viewed
            </h2>
          </div>
          <div className="flex gap-4 px-8">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="flex-1">
                <div className="bg-gray-200 animate-pulse rounded-lg aspect-[3/4]"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-red-600">
            <p>Error loading products: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!randomProducts || randomProducts.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {title}
          </h2>
          <a href="#" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
            See more
          </a>
        </div>
        
        <div className="relative px-8">
          <Slider {...settings}>
            {randomProducts.map((product) => {
              const imageUrl = product.images?.[0]?.url || 'https://via.placeholder.com/300x400?text=No+Image';
              
              return (
                <div key={product._id} className="px-2">
                  <div className="cursor-pointer group">
                    <div className="bg-gray-100  overflow-hidden aspect-[3/4] mb-2">
                    <Link to={`/product/${product._id}`}>
                      <img

                        src={imageUrl}
                        alt={product.images?.[0]?.alt || product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
                        }}
                      />
                      </Link>
                    </div>
                    <p className="text-sm text-gray-700 truncate px-1 hover:text-(--color-amazon-orange)" title={product.name}>
                      {product.name}
                    </p>
                    <div className="px-1 flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-900">
                        ${product.price.toFixed(2)}
                      </p>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <p className="text-xs text-gray-500 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;