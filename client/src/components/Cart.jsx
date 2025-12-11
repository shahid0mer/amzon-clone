import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
} from "../Features/cartThunk";
import { useNavigate } from "react-router-dom";
import ProductCarousel from "./ProductCarousel";
import { ProductGridContainer } from "./ProductGridContainer";
import ProductGridCard from "./ProductGridCard";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalAmount } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.products);
  const user = useSelector((state) => state.auth.user);


  useEffect(() => {

    if (user) {
      dispatch(fetchCart());
    }
  }, [user, dispatch]);

  const handleQtyChange = (e, productId) => {
    dispatch(
      updateCartQuantity({ productId, quantity: Number(e.target.value) })
    );
  };

  const handleDelete = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex gap-4">
          {/* LEFT SIDE */}
          <div className="flex-1 bg-white p-6 rounded">
            <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

            {items.map((item) => (
              <div
                key={item.product._id}
                className="flex items-start border-b border-gray-300 pb-6 mb-4"
              >
                <img
                  src={item.product.images[0]?.url}
                  className="w-48 h-48 object-cover mr-6"
                />

                <div className="flex-1">
                  <h2 className="text-lg font-medium mb-2 text-black">
                    {item.product.name}
                  </h2>

                  <div className="flex items-center space-x-4 text-sm mt-2">
                    <select
                      value={item.quantity}
                      onChange={(e) => handleQtyChange(e, item.product._id)}
                      className="px-2 py-1 border-none border-gray-300 rounded bg-(--color-amazon-lightgrey)  "
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <option key={n} value={n}>
                          Qty: {n}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => handleDelete(item.product._id)}
                      className="text-blue-600 hover:text-orange-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="text-right ml-6">
                  <p className="text-2xl font-bold">₹ {item.price}</p>
                </div>
              </div>
            ))}

            <div className="text-right pt-4">
              <p className="text-lg">
                Subtotal ({items.length} items):{" "}
                <span className="font-bold"> ₹{totalAmount} </span>
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-80 bg-white p-6 rounded">
            <p className="text-lg mb-2">
              Subtotal ({items.length} items):{" "}
              <span className="font-bold">₹ {totalAmount}</span>
            </p>
            <button
              className={`w-full py-2 rounded-lg 
            ${
              items.length === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-(--color-amazon-yellow) hover:bg-(--color-amazon-orange)"
            }`}
              disabled={items.length === 0}
              onClick={() => {
                if (items.length === 0) return;
                navigate("/checkout");
              }}
            >
              Proceed to Buy
            </button>
          </div>
        </div>
      </div>
      <div>
        <ProductCarousel />
      </div>
      <div>
        <ProductCarousel title="Customers who viewed items in your browsing history also viewed" />
      </div>
    </div>
  );
}

export default Cart;
