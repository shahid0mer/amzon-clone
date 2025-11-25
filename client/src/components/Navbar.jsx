import React, { useState } from "react";
import { Search, MapPin, ShoppingCart, Menu } from "lucide-react";
import AmazonwhiteLogo from "../assets/Amazonwhite.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AccountDropdown from "./AccountDropdown";

const AmazonNavbar = () => {
  const [searchCategory, setSearchCategory] = useState("All");
  const user = useSelector((state) => state.auth.user);
  const cartCount = useSelector((state) => state.cart.items.length);

  return (
    <div>
      {/* Main Navbar */}
      <header className="bg-[#131921] w-full text-white fixed z-50 whitespace-nowrap">
        {/* Top Bar */}
        <div className="flex items-center px-5 py-2 gap-5 ">
          {/* Logo */}
          <Link to={"/"}>
            <div className="flex items-center ">
              <img
                className="w-24 h-8 "
                src={AmazonwhiteLogo}
                alt=""
                srcset=""
              />
            </div>
          </Link>

          {/* Delivery Location */}
          <div className="flex items-center px-2 py-1 border border-transparent hover:border-white cursor-pointer ml-2">
            <MapPin className="w-5 h-5 mr-1" />
            <div className="flex flex-col text-xs leading-tight">
              <span className="text-gray-300 text-[11px]">
                Delivering to Bhubaneswar 751001
              </span>
              <span className="font-bold text-sm">Update location</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 flex items-center max-w-5xl mx-4">
            <div className="flex w-full rounded-md overflow-hidden">
              {/* Category Dropdown */}
              <div className="relative">
                <select
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="bg-[#d9d9d9] text-gray-700 text-xs h-10 px-2  rounded-l-md border-none outline-none cursor-pointer hover:bg-[#ddd]"
                >
                  <option>All</option>
                  <option>Electronics</option>
                  <option>Fashion</option>
                  <option>Home & Kitchen</option>
                  <option>Books</option>
                  <option>Toys & Games</option>
                  <option>Beauty & Personal Care</option>
                  <option>Sports, Fitness & Outdoors</option>
                </select>
              </div>

              {/* Search Input */}
              <input
                type="text"
                placeholder="Search Amazon.in"
                className="flex-1 px-3 h-10 text-sm text-black outline-none bg-[#FFFF]"
              />

              {/* Search Button */}
              <button className="bg-[#febd69] hover:bg-[#f3a847] px-3 h-10 rounded-r-md flex items-center justify-center">
                <Search className="w-5 h-5 text-black" />
              </button>
            </div>
          </div>

          {/* Language Selector */}
          <div className="flex items-center px-2 py-1 border border-transparent hover:border-white cursor-pointer">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/23px-Flag_of_India.svg.png"
              alt="India Flag"
              className="w-6 h-4 mr-1"
            />
            <span className="font-bold text-sm">EN</span>
            <svg
              className="w-3 h-3 ml-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Account & Lists */}
          <AccountDropdown user={user} />

          {/* <div className="flex flex-col px-2 py-1 border border-transparent hover:border-white cursor-pointer leading-tight">
            <span className="text-xs">Hello, {user?.name}</span>
            <div className="flex items-center">
              <span className="font-bold text-sm">Account & Lists</span>
              <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div> */}

          {/* Returns & Orders */}
          <Link to={"/orders"}>
            <div className="flex flex-col px-2 py-1 border border-transparent hover:border-white cursor-pointer leading-tight">
              <span className="text-xs">Returns</span>
              <span className="font-bold text-sm">& Orders</span>
            </div>
          </Link>

          {/* Cart */}
          <Link to={"/cart"}>
            <div className="flex items-center px-2 py-1 border border-transparent hover:border-white cursor-pointer relative">
              <div className="relative">
                <ShoppingCart className="w-8 h-8" strokeWidth={1.5} />
                <span className="absolute -top-1 left-4 bg-[#f08804] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              </div>
              <span className="font-bold text-sm ml-1">Cart</span>
            </div>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default AmazonNavbar;
