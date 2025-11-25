import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductGridCard = ({
  products = [],
  category = null, // NEW: Filter by category
  title = "Best Sellers",
  subtitle = "",
  maxItems = 4,
  randomize = true,
  ctaText = "Explore more",
  ctaLink = "#",
  onProductClick = null,
  onCtaClick = null,
  layout = "grid",
  loading = false,
}) => {
  const [displayProducts, setDisplayProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (products && products.length > 0) {
      let productsList = [...products];

      // Filter by category if specified
      if (category) {
        productsList = productsList.filter(
          (p) =>
            p.category?.name?.toLowerCase() === category.toLowerCase() ||
            p.category?._id === category
        );
      }

      if (randomize) {
        productsList = productsList.sort(() => 0.5 - Math.random());
      }

      setDisplayProducts(productsList.slice(0, maxItems));
    }
  }, [products, category, maxItems, randomize]);

  const handleProductClick = (product, e) => {
    e.preventDefault();
    if (onProductClick) {
      onProductClick(product);
    } else {
      // Default: Navigate to product details
      navigate(`/product/${product._id}`);
    }
  };

  const handleCtaClick = (e) => {
    if (onCtaClick) {
      e.preventDefault();
      onCtaClick();
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 border border-gray-300 h-full">
        <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4 mb-4"></div>
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-gray-200 animate-pulse rounded"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (!displayProducts || displayProducts.length === 0) {
    return null;
  }

  const isMixedLayout = layout === "mixed";

  return (
    <div className="bg-white p-6 border border-gray-300 hover:shadow-md transition-shadow h-full flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900 mb-1">{title}</h2>
        {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
      </div>

      {/* Products Grid */}
      <div className="flex-1">
        {isMixedLayout && displayProducts.length > 0 ? (
          // Mixed Layout: 1 large + smaller items
          <div className="space-y-4">
            <div
              className="cursor-pointer group"
              onClick={(e) => handleProductClick(displayProducts[0], e)}
            >
              <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-2">
                <img
                  src={
                    displayProducts[0].images?.[0]?.url ||
                    "https://via.placeholder.com/400"
                  }
                  alt={displayProducts[0].title || displayProducts[0].name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400?text=No+Image";
                  }}
                />
              </div>
              <p className="text-sm text-gray-800 line-clamp-2 group-hover:text-blue-600">
                {displayProducts[0].title || displayProducts[0].name}
              </p>
            </div>

            {displayProducts.length > 1 && (
              <div className="grid grid-cols-2 gap-3">
                {displayProducts.slice(1, maxItems).map((product) => (
                  <div
                    key={product._id}
                    className="cursor-pointer group"
                    onClick={(e) => handleProductClick(product, e)}
                  >
                    <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
                      <img
                        src={
                          product.images?.[0]?.url ||
                          "https://via.placeholder.com/200"
                        }
                        alt={product.title || product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/200?text=No+Image";
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          // Standard Grid Layout: 2x2
          <div className="grid grid-cols-2 gap-4">
            {displayProducts.map((product) => (
              <div
                key={product._id}
                className="cursor-pointer group"
                onClick={(e) => handleProductClick(product, e)}
              >
                <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-2">
                  <img
                    loading="lazy"
                    src={
                      product.images?.[0]?.url ||
                      "https://via.placeholder.com/300"
                    }
                    alt={product.title || product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300?text=No+Image";
                    }}
                  />
                </div>
                <p className="text-sm text-gray-800 line-clamp-2 group-hover:text-(--color-amazon-orange)">
                  {product.title || product.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA Link */}
      {ctaText && (
        <a
          href={ctaLink}
          onClick={handleCtaClick}
          className="mt-4 text-sm text-blue-600 hover:text-blue-800 hover:underline inline-block"
        >
          {ctaText}
        </a>
      )}
    </div>
  );
};

export const ProductGridContainer = ({ children, columns = 4 }) => {
  const gridColsClass =
    {
      2: "md:grid-cols-2",
      3: "md:grid-cols-3",
      4: "md:grid-cols-4",
    }[columns] || "md:grid-cols-4";

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 ${gridColsClass} gap-6 p-6`}
    >
      {children}
    </div>
  );
};

export default ProductGridCard;
