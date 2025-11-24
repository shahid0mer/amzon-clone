import { useDispatch } from "react-redux";
import { fetchAllProducts, fetchProductsByCategory } from "../Features/productThunk";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FiltersSidebar = () => {
  const dispatch = useDispatch();
  const { categoryName } = useParams(); // Get category if on category page

  // Single source of truth for filters
  const [filters, setFilters] = useState({
    rating: null,
    brands: [],
    minPrice: null,
    maxPrice: null,
  });

  // Call API only when filters change
  useEffect(() => {
    const filterParams = {
      page: 1,
      limit: 20,
      ...(filters.rating && { rating: filters.rating }),
      ...(filters.brands.length > 0 && { brand: filters.brands.join(",") }),
      ...(filters.minPrice && { minPrice: filters.minPrice }),
      ...(filters.maxPrice && { maxPrice: filters.maxPrice })
    };

    // Dispatch the correct action based on whether we're on a category page
    if (categoryName) {
      dispatch(fetchProductsByCategory({ 
        categoryName, 
        ...filterParams 
      }));
    } else {
      dispatch(fetchAllProducts(filterParams));
    }
  }, [filters, categoryName, dispatch]);

  const handleRatingChange = (star) => {
    setFilters(prev => ({
      ...prev,
      rating: prev.rating === star ? null : star
    }));
  };

  const handleBrandChange = (brand) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
  };

  const handlePriceChange = (range, isChecked) => {
    if (isChecked) {
      const [min, max] = range.split("-");
      setFilters(prev => ({
        ...prev,
        minPrice: min,
        maxPrice: max
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        minPrice: null,
        maxPrice: null
      }));
    }
  };

  return (
    <aside className="w-64 p-4 sticky top-0 h-screen overflow-y-auto hidden md:block">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* RATING FILTER */}
      <h3 className="font-medium">Customer Reviews</h3>
      {[4, 3, 2].map(star => (
        <label key={star} className="flex gap-2">
          <input 
            type="checkbox" 
            checked={filters.rating === star}
            onChange={() => handleRatingChange(star)} 
          />
          <span>{star}★ & Up</span>
        </label>
      ))}

      {/* BRAND FILTER */}
      <h3 className="font-medium mt-4">Brands</h3>
      {["Samsung", "LG", "Panasonic", "Sony", "Godrej", "IFB"].map(brand => (
        <label key={brand} className="flex gap-2">
          <input 
            type="checkbox" 
            checked={filters.brands.includes(brand)}
            onChange={() => handleBrandChange(brand)} 
          />
          <span>{brand}</span>
        </label>
      ))}

      {/* PRICE FILTER */}
      <h3 className="font-medium mt-4">Price</h3>
      {[
        { label: "Under ₹50", value: "0-50" },
        { label: "₹50 – ₹100", value: "50-100" },
        { label: "₹100 – ₹250", value: "100-250" },
        { label: "₹250 – ₹500", value: "250-500" },
        { label: "₹500 – ₹1,000", value: "500-1000" },
        { label: "₹1,000 & Above", value: "1000-999999" }
      ].map(p => (
        <label key={p.value} className="flex gap-2">
          <input 
            type="radio" 
            name="price"
            checked={filters.minPrice === p.value.split("-")[0]}
            onChange={(e) => handlePriceChange(p.value, e.target.checked)} 
          />
          <span>{p.label}</span>
        </label>
      ))}

      {/* CLEAR FILTERS */}
      {(filters.rating || filters.brands.length > 0 || filters.minPrice) && (
        <button 
          onClick={() => setFilters({ rating: null, brands: [], minPrice: null, maxPrice: null })}
          className="mt-4 text-sm text-blue-600 hover:underline"
        >
          Clear all filters
        </button>
      )}
    </aside>
  );
};

export default FiltersSidebar;