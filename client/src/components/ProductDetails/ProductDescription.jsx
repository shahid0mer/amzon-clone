

function ProductDescription({product}) {


  return (
    <div className="mt-8 border-t border-gray-300 pt-6">
      <h2 className="text-xl font-bold mb-4">Product description</h2>
      <div className="text-sm text-gray-700 space-y-2">
        <p>{product.description || "No description available."}</p>
      </div>
    </div>
  );
}
export default ProductDescription