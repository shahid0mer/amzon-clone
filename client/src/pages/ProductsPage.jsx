import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { fetchAllProducts, fetchProductsByCategory } from '../Features/productThunk';
import FiltersSidebar from '../components/FiltersSidebar';
import ProductsGrid from '../components/ProductsGrid';
import Pagination from '../components/Pagination';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { categoryName } = useParams(); // Get category from URL if exists
  const [searchParams] = useSearchParams();
  
  const { 
    products, 
    categoryProducts, 
    loading, 
    error, 
    page, 
    pages,
    category,
    total 
  } = useSelector((state) => state.products);

  // Determine which products to display
  const displayProducts = categoryName ? categoryProducts : products;

  useEffect(() => {
    const pageNum = parseInt(searchParams.get('page')) || 1;
    
    if (categoryName) {
      // Fetch products by category
      dispatch(fetchProductsByCategory({ 
        categoryName: categoryName,
        page: pageNum,
        limit: 20
      }));
    } else {
      // Fetch all products
      dispatch(fetchAllProducts({ 
        page: pageNum, 
        limit: 20 
      }));
    }
  }, [dispatch, categoryName, searchParams]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pages) return;
    
    if (categoryName) {
      dispatch(fetchProductsByCategory({ 
        categoryName: categoryName,
        page: newPage, 
        limit: 20 
      }));
    } else {
      dispatch(fetchAllProducts({ 
        page: newPage, 
        limit: 20 
      }));
    }
  };

  return (
    <div className="flex w-full bg-white min-h-screen">
      <FiltersSidebar />

      <div className="flex-1 p-5">
        {/* Category Header */}
        {categoryName && (
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {category || categoryName}
            </h1>
            <p className="text-gray-600">
              {total ? `${total} products found` : 'Loading...'}
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Loading products...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <>
            <ProductsGrid products={displayProducts} />

            {/* No Products Found */}
            {displayProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No products found
                  {categoryName && ` in ${categoryName}`}
                </p>
              </div>
            )}

            {/* Pagination */}
            {displayProducts.length > 0 && (
              <Pagination 
                page={page} 
                pages={pages} 
                onPageChange={handlePageChange} 
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;