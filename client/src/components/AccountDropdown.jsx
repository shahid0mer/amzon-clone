import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Features/authSlice";
import { useDispatch } from "react-redux";
import { clearCart } from "../Features/cartThunk";

const AccountDropdown = ({ user }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(clearCart());
    dispatch(logout());

    setShowDropdown(false);

    navigate("/");
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      {/* Trigger - Your existing account button */}
      <div className="flex flex-col px-2 py-1 border border-transparent hover:border-white cursor-pointer leading-tight">
        <span className="text-xs">Hello, {user?.name || "Sign in"}</span>
        <div className="flex items-center">
          <span className="font-bold text-sm">Account & Lists</span>
          <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="absolute top-full right-0 pt-1 mt-0 w-[480px] bg-white text-gray-800 shadow-lg rounded-md z-50">
          {/* Sign In Button - Show only if user is not logged in */}
          {!user && (
            <div className="p-4 border-b border-gray-200">
              <Link to="/signin">
                <button className="w-full bg-(--color-amazon-yellow) hover:bg-(--color-amazon-orange) text-gray-900 font-medium py-2 rounded text-sm">
                  Sign in
                </button>
              </Link>
              <p className="text-xs text-center mt-2">
                New customer?{" "}
                <Link
                  to="/signup"
                  className="text-blue-600 hover:text-orange-600 hover:underline"
                >
                  Start here.
                </Link>
              </p>
            </div>
          )}

          {user && (
            <div className="p-4 border-b border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 rounded text-sm"
              >
                Sign Out
              </button>
            </div>
          )}

          {/* Two Column Layout */}
          <div className="flex p-4">
            {/* Left Column - Your Lists */}
            <div className="flex-1 pr-4 border-r border-gray-200">
              <h3 className="font-bold text-sm mb-3">Your Lists</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-orange-600 hover:underline"
                  >
                    Create a Wish List
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-orange-600 hover:underline"
                  >
                    Wish from Any Website
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-orange-600 hover:underline"
                  >
                    Baby Wishlist
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-orange-600 hover:underline"
                  >
                    Discover Your Style
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-orange-600 hover:underline"
                  >
                    Explore Showroom
                  </a>
                </li>
              </ul>
            </div>

            {/* Right Column - Your Account */}
            <div className="flex-1 pl-4">
              <h3 className="font-bold text-sm mb-3">Your Account</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-orange-600 hover:underline"
                  >
                    Your Account
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-orange-600 hover:underline"
                  >
                    Your Orders
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-orange-600 hover:underline"
                  >
                    Your Wish List
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-orange-600 hover:underline"
                  >
                    Keep Shopping
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-orange-600 hover:underline"
                  >
                    Your Recommendations
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-orange-600 hover:underline"
                  >
                    Your Prime membership
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-orange-600 hover:underline"
                  >
                    Your Prime Video
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-orange-600 hover:underline"
                  >
                    Your Subscribe & Save Items
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-orange-600 hover:underline"
                  >
                    Your Seller Account
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-orange-600 hover:underline"
                  >
                    Memberships & Subscriptions
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-orange-600 hover:underline"
                  >
                    Manage Your Content and Devices
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-orange-600 hover:underline"
                  >
                    Your Free Amazon Business Account
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;
