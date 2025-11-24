function WriteReviewSection() {
  return (
    <div className="border-t border-b border-gray-300 py-6 mb-6">
      <div className="mb-3">
        <h3 className="font-bold mb-2">Review this product</h3>
        <p className="text-sm text-gray-600">Share your thoughts with other customers</p>
      </div>
      <button className="border border-gray-400 rounded px-6 py-2 text-sm hover:bg-gray-50">
        Write a customer review
      </button>
    </div>
  );
}
export default WriteReviewSection