import { MapPin } from "lucide-react";
import {  addToCart } from "../../Features/cartThunk";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";


function BuyBox({ quantity, setQuantity, product }) {

  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector(state => state.cart);
    
  const handleQtyChange = (e) => {
    const newQuantity = Number(e.target.value);
    setQuantity(newQuantity); // Only update local state
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ 
      productId: product._id,  
      quantity: quantity 
    }));
  };
  
  return (
    <div className="col-span-3">
      <div className="border  border-gray-300 p-4 sticky top-4">
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-3xl">₹{product.price * 100}</span>
          <span className="text-xs align-super">14</span>
        </div>
        <div className="text-xs text-gray-600 mb-3">
          <span className="text-blue-600">54% delivery</span> 6-9 October.
        </div>
        
        <div className="flex items-center gap-2 mb-2 text-teal-700 text-sm">
          <MapPin className="w-4 h-4" />
          <span>Deliver to Surat - update location</span>
        </div>

        <div className="text-green-700 font-bold text-lg mb-2">
          Usually ships within 4 to 5 days
        </div>

        <div className="text-sm mb-3">
          <div className="flex justify-between mb-1">
            <span className="text-gray-600">Imported Shipping</span>
            <span>Ships</span>
          </div>
          <div className="text-gray-600">from outside the USA.</div>
          <a href="#" className="text-blue-600 text-xs">Learn more</a>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Quantity:</label>
          <select 
            value={quantity}
           onChange={handleQtyChange}
            className="w-full border  border-gray-300  px-3 py-1 bg-gray-50"
          >
            {[1,2,3,4,5,6,7,8,9,10].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <button className="w-full  bg-(--color-amazon-yellow) hover:bg-(--color-amazon-orange) rounded-full py-2 mb-2 font-semibold"
        onClick={handleAddToCart}
        >
          Add to Cart
        </button>
        <Link to={"/checkout"}>
        <button className="w-full bg-orange-400 hover:bg-orange-500 rounded-full py-2 mb-3 font-semibold">
          Buy Now
        </button>
        </Link>

        <div className="text-xs text-gray-600 space-y-1">
          <div className="flex justify-between">
            <span>Ships from</span>
            <span>Noorah LLC</span>
          </div>
          <div className="flex justify-between">
            <span>Sold by</span>
            <span>Noorah LLC</span>
          </div>
          <div className="flex justify-between">
            <span>Payment</span>
            <span>Secure transaction</span>
          </div>
        </div>

        <button className="w-full border border-gray-300 rounded py-2 mt-3 text-sm">
          Add to List
        </button>
      </div>
    </div>
  );
}

export default BuyBox