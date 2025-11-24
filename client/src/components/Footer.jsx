import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-700 text-white">
      {/* Back to Top */}
      <div className="bg-slate-600 hover:bg-slate-500 transition-colors">
        <button className="w-full py-4 text-sm text-center">
          Back to Top
        </button>
      </div>

      {/* Main Footer Content */}
      <div className="bg-(--color-amazon-darkblue-light) px-8 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Get to know Us */}
          <div>
            <h3 className="font-bold text-base mb-3">Get to know Us</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Press Releases</a></li>
              <li><a href="#" className="hover:underline">Amazon Science</a></li>
            </ul>
          </div>

          {/* Connect with Us */}
          <div>
            <h3 className="font-bold text-base mb-3">Connect with Us</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Facebook</a></li>
              <li><a href="#" className="hover:underline">Twitter</a></li>
              <li><a href="#" className="hover:underline">Instagram</a></li>
            </ul>
          </div>

          {/* Make Money with Us */}
          <div>
            <h3 className="font-bold text-base mb-3">Make Money with Us</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Sell on Amazon</a></li>
              <li><a href="#" className="hover:underline">Sell under Amazon Accelerator</a></li>
              <li><a href="#" className="hover:underline">Protect and Build Your Brand</a></li>
              <li><a href="#" className="hover:underline">Amazon Global Selling</a></li>
              <li><a href="#" className="hover:underline">Supply to Amazon</a></li>
              <li><a href="#" className="hover:underline">Become an Affiliate</a></li>
              <li><a href="#" className="hover:underline">Fulfilment by Amazon</a></li>
              <li><a href="#" className="hover:underline">Advertise Your Products</a></li>
              <li><a href="#" className="hover:underline">Amazon Pay on Merchants</a></li>
            </ul>
          </div>

          {/* Let Us Help You */}
          <div>
            <h3 className="font-bold text-base mb-3">Let Us Help You</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Your Account</a></li>
              <li><a href="#" className="hover:underline">Returns Centre</a></li>
              <li><a href="#" className="hover:underline">Recalls and Products Safety Alerts</a></li>
              <li><a href="#" className="hover:underline">100% Purchase Protection</a></li>
              <li><a href="#" className="hover:underline">Amazon App Download</a></li>
              <li><a href="#" className="hover:underline">Help</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Logo and Language/Country Selector */}
      <div className="bg-(--color-amazon-darkblue-light) border-t border-slate-600 py-6">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-center gap-6">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" 
            alt="Amazon" 
            className="h-8"
          />
          <div className="flex gap-3">
            <button className="border border-slate-500 px-4 py-2 rounded text-sm hover:bg-slate-600 transition-colors flex items-center gap-2">
              <span>🌐</span>
              <span>English</span>
            </button>
            <button className="border border-slate-500 px-4 py-2 rounded text-sm hover:bg-slate-600 transition-colors flex items-center gap-2">
              <span>🇮🇳</span>
              <span>India</span>
            </button>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="bg-slate-900 px-8 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
          {/* AbeBooks */}
          <div>
            <h4 className="font-bold mb-1">AbeBooks</h4>
            <p className="text-slate-400">Books, art</p>
            <p className="text-slate-400">& collectibles</p>
          </div>

          {/* Amazon Web Services */}
          <div>
            <h4 className="font-bold mb-1">Amazon web Services</h4>
            <p className="text-slate-400">Scalable Cloud</p>
            <p className="text-slate-400">Computing Services</p>
          </div>

          {/* Audible */}
          <div>
            <h4 className="font-bold mb-1">Audible</h4>
            <p className="text-slate-400">Download</p>
            <p className="text-slate-400">Audio Books</p>
          </div>

          {/* IMDb */}
          <div>
            <h4 className="font-bold mb-1">IMDb</h4>
            <p className="text-slate-400">Movies, TV</p>
            <p className="text-slate-400">& Celebrities</p>
          </div>

          {/* Shop bop */}
          <div>
            <h4 className="font-bold mb-1">Shop bop</h4>
            <p className="text-slate-400">Designer</p>
            <p className="text-slate-400">Fashion Brands</p>
          </div>

          {/* Amazon Business */}
          <div>
            <h4 className="font-bold mb-1">Amazon Business</h4>
            <p className="text-slate-400">Everything For</p>
            <p className="text-slate-400">Your Business</p>
          </div>

          {/* Prime Now */}
          <div>
            <h4 className="font-bold mb-1">Prime Now</h4>
            <p className="text-slate-400">2-Hour Delivery</p>
            <p className="text-slate-400">on Everyday Items</p>
          </div>

          {/* Amazon Prime Music */}
          <div>
            <h4 className="font-bold mb-1">Amazon Prime Music</h4>
            <p className="text-slate-400">100 million sings, ad-free</p>
            <p className="text-slate-400">Over 15 million podcast episodes</p>
          </div>
        </div>
      </div>

      {/* Bottom Links */}
      <div className="bg-slate-900 px-8 py-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-6 text-xs mb-2">
            <a href="#" className="hover:underline">Conditons of Use & Sale</a>
            <a href="#" className="hover:underline">Privacy Notice</a>
            <a href="#" className="hover:underline">Interest-Based Ads</a>
          </div>
          <p className="text-xs text-slate-400">
            1996-2024, Amazon.com, Inc. or its affiliates
          </p>
        </div>
      </div>
    </footer>
  );
}