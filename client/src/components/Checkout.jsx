import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrderThunk } from "../Features/orderThunk";
import { fetchCart } from "../Features/cartThunk";
import { fetchAddresses } from "../Features/addressThunk"; // Make sure this exists
import DeliveryAddressSection from "./Address/DeliveryAddressSection";
import { toast } from "sonner";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedPayment, setSelectedPayment] = useState("");
  const [shippingAddress, setShippingAddress] = useState(null);
  const [showAddressSelector, setShowAddressSelector] = useState(false);

  const { items, totalAmount } = useSelector((state) => state.cart);
  const { addresses } = useSelector((state) => state.address);

  // Fetch cart & addresses
  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchAddresses());
  }, [dispatch]);

  // Set default address automatically
  useEffect(() => {
    if (addresses?.length > 0) {
      const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];
      setShippingAddress(defaultAddr);
    }
  }, [addresses]);

  // -----------------------------------------
  // PLACE ORDER FUNCTION
  // -----------------------------------------
  const handlePlaceOrder = async () => {
    if (!selectedPayment) {
      toast.warning("Please select a payment method");
      return;
    }

    if (!shippingAddress) {
      toast.warning("Please select a shipping address");
      return;
    }

    const orderData = {
      items: items.map((i) => ({
        product: i.product._id,
        name: i.product.title,
        image: i.product.images[0]?.url,
        quantity: i.quantity,
        price: i.price,
      })),
      shippingAddress,
      paymentMethod: selectedPayment,
      subtotal: totalAmount,
      shippingCost: 0,
      tax: 0,
      totalAmount,
    };

    const res = await dispatch(createOrderThunk(orderData));

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/order-success", {
        state: {
          orderId:
            res.payload?._id ||
            res.payload?.orderId ||
            `ORD-${Date.now()}`,
          items: items.map((i) => ({
            product: {
              title: i.product.title,
              images: [{ url: i.product.images[0]?.url }],
            },
            quantity: i.quantity,
            price: i.price,
          })),
          totalAmount,
          shippingAddress,
          estimatedDelivery: new Date(
            Date.now() + 4 * 24 * 60 * 60 * 1000
          ).toDateString(),
        },
      });
    } else {
      toast.error("Order failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-100 border-b border-gray-300 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
            alt="Amazon"
            className="h-8"
          />
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-normal mb-8">
          Checkout (
          <span className="text-teal-700">{items.length} items</span>)
        </h1>

        <div className="flex gap-8">
          {/* LEFT COLUMN */}
          <div className="flex-1">
            {/* SHIPPING ADDRESS */}
             {/* SHIPPING ADDRESS */}
<div className="mb-8">
  <div className="flex items-start justify-between mb-4">
    <div className="flex gap-4">
      <span className="text-2xl font-bold text-gray-700">1</span>

      <div>
        <h2 className="text-lg font-bold mb-2">Shipping address</h2>

        {shippingAddress ? (
          <div className="text-sm text-gray-700">
            <p>{shippingAddress.name}</p>
            <p>{shippingAddress.city}</p>
            <p>{shippingAddress.state}, {shippingAddress.country}</p>
          </div>
        ) : (
          <p className="text-sm text-gray-500">Loading your address...</p>
        )}
      </div>
    </div>

    <button
      className="text-teal-700 text-sm hover:underline hover:text-teal-800"
      onClick={() => setShowAddressSelector(true)}
    >
      Change
    </button>
  </div>
        

  {/* PUT SELECTOR *INSIDE* THE SECTION */}
{showAddressSelector && (
  <div className="mt-4 w-full  p-2">
    <DeliveryAddressSection
      onAddressSelect={(addr) => {
        setShippingAddress(addr);
        setShowAddressSelector(false);
      }}
    />
  </div>
)}
</div>


            <hr className="border-gray-300 mb-8" />

            {/* PAYMENT METHOD */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-4">
                  <span className="text-2xl font-bold text-red-600">2</span>
                  <h2 className="text-lg font-bold text-red-600">
                    Choose a payment method
                  </h2>
                </div>
                <button className="text-teal-700 text-sm hover:underline flex items-center gap-2">
                  Close <X className="w-4 h-4" />
                </button>
              </div>

              <div className="border border-gray-300 rounded p-6 ml-12">
                {/* Tabby */}
                <label className="flex items-start gap-3 cursor-pointer p-3 hover:bg-gray-50 rounded mb-6">
                  <input
                    type="radio"
                    name="payment"
                    value="tabby"
                    checked={selectedPayment === "tabby"}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="mt-1"
                  />
                  <div>
                    <span className="bg-green-400 text-white text-xs px-2 py-0.5 rounded">
                      tabby
                    </span>
                    <p className="text-xs text-gray-600">0% interest</p>
                  </div>
                </label>

                {/* COD */}
                <label className="flex items-start gap-3 cursor-pointer p-3 hover:bg-gray-50 rounded">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={selectedPayment === "cod"}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="mt-1"
                  />
                  <div>
                    <p className="font-medium mb-1">
                      Cash on Delivery (COD)
                    </p>
                    <p className="text-xs text-gray-600">
                      COD not available
                    </p>
                  </div>
                </label>

                <button
                  className="w-full bg-(--color-amazon-yellow) hover:bg-(--color-amazon-orange) rounded py-2 mt-4"
                  onClick={handlePlaceOrder}
                >
                  Place your order
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="w-80">
            <div className="border border-gray-300 rounded p-6 sticky top-4">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span>Items:</span>
                  <span className="font-medium">₹ {totalAmount}</span>
                </div>
              </div>

              <hr className="border-gray-300 my-4" />

              <div className="flex justify-between text-lg font-bold text-red-700 mb-4">
                <span>Order total:</span>
                <span>₹ {totalAmount}</span>
              </div>

              <button
                className="w-full bg-(--color-amazon-yellow) hover:bg-(--color-amazon-orange) rounded py-2"
                onClick={handlePlaceOrder}
              >
                Place your order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
