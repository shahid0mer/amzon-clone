function AboutItem() {
  return (
    <div className="border-t border-gray-300 pt-4 mt-4">
      <h3 className="font-bold mb-3">About this item</h3>
      <ul className="text-sm space-y-2">
        <li className="flex gap-2">
          <span>•</span>
          <span>Feature: square neck, cutout, puff sleeve, ruffle hem, tie back aline dress</span>
        </li>
        <li className="flex gap-2">
          <span>•</span>
          <span>Fabric: has some stretch and it's soft and comfortable</span>
        </li>
        <li className="flex gap-2">
          <span>•</span>
          <span>Occasion: perfect wear, Holidays, paring, vacation, weekend casual</span>
        </li>
        <li className="flex gap-2">
          <span>•</span>
          <span>Care Instructions: Machine wash or professional dry clean</span>
        </li>
      </ul>
    </div>
  );
}
export default AboutItem