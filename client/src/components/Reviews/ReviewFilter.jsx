function ReviewFilter() {
  return (
    <div className="border-t border-b border-gray-300 py-4 mb-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Top reviews from Saudi Arabia</h3>
        <select className="border border-gray-300 rounded px-3 py-1 text-sm">
          <option>Top reviews</option>
          <option>Most recent</option>
        </select>
      </div>
      <div className="mt-2 text-sm text-gray-600 bg-gray-100 p-3 rounded">
        There are 0 reviews and 0 rating from Saudi Arabia
      </div>
    </div>
  );
}
export default ReviewFilter