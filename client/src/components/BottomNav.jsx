import React from "react";
import { Menu } from "lucide-react";

const BottomNav = () => {
  return (
    <div className=" bg-(--color-amazon-darkblue-light) flex items-center px-2 py-1 text-sm  z-40 mt-15">
      {/* All Menu */}
      <div className="flex items-center px-2 py-1 border border-transparent hover:border-white cursor-pointer">
        <Menu className="w-5 h-5 mr-1 text-white" />
        <span className="font-bold text-white">All</span>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-5 ml-4 text-white  whitespace-nowrap no-scrollbar">
        <span className="px-2 py-1 hover:border-white border border-transparent cursor-pointer">Amazon miniTV</span>
        <span className="px-2 py-1 hover:border-white border border-transparent cursor-pointer">Sell</span>
        <span className="px-2 py-1 hover:border-white border border-transparent cursor-pointer">Best Sellers</span>
        <span className="px-2 py-1 hover:border-white border border-transparent cursor-pointer">Today's Deals</span>
        <span className="px-2 py-1 hover:border-white border border-transparent cursor-pointer">Mobiles</span>
        <span className="px-2 py-1 hover:border-white border border-transparent cursor-pointer">Prime</span>
        <span className="px-2 py-1 hover:border-white border border-transparent cursor-pointer">Customer Service</span>
        <span className="px-2 py-1 hover:border-white border border-transparent cursor-pointer">Electronics</span>
        <span className="px-2 py-1 hover:border-white border border-transparent cursor-pointer">Fashion</span>
        <span className="px-2 py-1 hover:border-white border border-transparent cursor-pointer">New Releases</span>
        <span className="px-2 py-1 hover:border-white border border-transparent cursor-pointer">Gift Cards</span>
        <span className="px-2 py-1 hover:border-white border border-transparent cursor-pointer">Home & Kitchen</span>
        <span className="px-2 py-1 hover:border-white border border-transparent cursor-pointer">Computers</span>
        <span className="px-2 py-1 hover:border-white border border-transparent cursor-pointer">Amazon Pay</span>
        <span className="px-2 py-1 hover:border-white border border-transparent cursor-pointer">Mx Player</span>
        <span className="px-2 py-1 hover:border-white border border-transparent cursor-pointer">Mobiles</span>
        <span className="px-2 py-1 hover:border-white border border-transparent cursor-pointer">Books</span>
        <span className="px-2 py-1 hover:border-white border border-transparent cursor-pointer">Trend</span>
      </div>
    </div>
  );
};

export default BottomNav;
