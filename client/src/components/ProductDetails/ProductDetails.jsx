function ProductDetails() {
  return (
    <div className="border-t border-gray-300 z-50 pt-4">
      <h3 className="font-bold mb-3">Product details</h3>
      <div className="text-sm space-y-2">
        <div className="grid grid-cols-2">
          <span className="text-gray-600">Material composition</span>
          <span>99% Polyester, 1% Elastane</span>
        </div>
        <div className="grid grid-cols-2">
          <span className="text-gray-600">Closure type</span>
          <span>Pull On</span>
        </div>
        <div className="grid grid-cols-2">
          <span className="text-gray-600">Neck style</span>
          <span>Scoop Neck</span>
        </div>
        <div className="grid grid-cols-2">
          <span className="text-gray-600">Sleeve type</span>
          <span>Short Sleeve</span>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails