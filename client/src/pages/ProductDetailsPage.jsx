import { useState } from "react";
import BuyBox from "../components/ProductDetails/BuyBox";
import ImageGallery from "../components/ProductDetails/ImageGallery";
import ProductDescription from "../components/ProductDetails/ProductDescription";
import ProductDetailsSection from "../components/ProductDetails/ProductDetailsSection";
import ProductInfo from "../components/ProductDetails/ProductInfo";
import { useDispatch,useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../Features/productThunk";
import { useEffect } from "react";
import CustomerReviews from "../components/Reviews/CustomerReviews";
import ProductCarousel from "../components/ProductCarousel";
import ProductGridCard from "../components/ProductGridCard";
import { ProductGridContainer } from "../components/ProductGridContainer";




export default function ProductDetailsPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('L');
  const { products } = useSelector((state) => state.products);

  const {id} = useParams()
  const dispatch = useDispatch()
  const { product, loading, error } = useSelector((state) => state.products);
  useEffect(() => {
    if (id) dispatch(fetchProductById(id));
  },[id, dispatch])

   if (loading && !product) return <p className="p-6">Loading...</p>;

  if (error) return <p className="text-red-500">{error}</p>;



  return (
    <div className="min-h-screen bg-white">
      {/* <Header />
      <Breadcrumb /> */}

      <div className=" mx-auto px-4 py-4">
        <div className="grid grid-cols-12 gap-8">

          {product && (
            <ImageGallery 
            images={product?.images || []}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
          )}
          
          
          {product && (<ProductInfo 
          product={product}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />)}
          
          
         {product && (
          <BuyBox 
              quantity={quantity}
              setQuantity={setQuantity}
              product={product}
            />
          )}
        </div>
          {product && (
            <ProductDescription product = {product} />
          )}
        {product && (
          <ProductDetailsSection product = {product} />
        )}
        
      </div>

      <CustomerReviews />
      <div>
        <ProductCarousel/>
      </div>
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
      
      <ProductGridCard 
        products={products}
        title="Featured Products"
      />
    </ProductGridContainer>
      </div>

      <div>
    <ProductCarousel 
      products={products}
      title="Related to items you've viewed"
      randomize={true}
      maxItems={10}
    />
      </div>
    </div>
  );
}