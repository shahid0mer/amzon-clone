import ProductCard from "./ProductCard";

const ProductsGrid = ({ products = [] }) => {
  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-6 p-6 border-0 ">
      {products.map((p, i) => (
        <ProductCard key={i} product={p} />
      ))}
    </div>
  );
};

export default ProductsGrid;
