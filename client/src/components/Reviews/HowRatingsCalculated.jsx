import { ChevronDown } from "lucide-react";
import { useState } from "react";


function HowRatingsCalculated() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-gray-700"
      >
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        How are ratings calculated?
      </button>
      {isOpen && (
        <div className="mt-2 text-sm text-gray-600 pl-5">
          Amazon calculates a product's star ratings based on a machine learned model instead of a raw data average.
        </div>
      )}
    </div>
  );
}

export default HowRatingsCalculated