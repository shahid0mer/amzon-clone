import { useDispatch, useSelector } from "react-redux";
import PromoGrid from "../components/PromoGrid";
import Carousel from "../components/Carousel";
import ProductCarousel from "../components/ProductCarousel";
import { ProductGridContainer } from "../components/ProductGridContainer";
import ProductGridCard from "../components/ProductGridCard";
import { fetchAllProducts } from "../Features/productThunk";
import { useEffect } from "react";

const HomePage = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    // Fetch more products for homepage (e.g., 100 products)
    dispatch(fetchAllProducts({ page: 1, limit: 1000 }));
  }, [dispatch]);

  return (
    <div>
      {/* FULL-SCREEN SECTION */}
      <div className="w-full">
        <Carousel />
      </div>

      <div className="relative -mt-72 z-10">
        <PromoGrid />
      </div>

      <div className="w-full">
        <ProductCarousel />

        <div>
          <ProductGridContainer>
            <ProductGridCard
              products={products}
              title="Best Sellers in Toys & Games"
            />

            <ProductGridCard
              products={products}
              title="Customers' Most-Loved Products"
            />

            <ProductGridCard
              products={products}
              title="Best Sellers in Beauty"
            />

            <ProductGridCard products={products} title="Featured Products" />
          </ProductGridContainer>
        </div>

        <ProductCarousel
          products={products}
          title="Related to items you've viewed"
          randomize={true}
          maxItems={10}
        />
      </div>
    </div>
  );
};

export default HomePage;
