import React from "react";
import img from '../assets/image.png'
import img2 from '../assets/image 9.png'
import img3 from '../assets/image 8.png'
import img4 from '../assets/image 7.png'
import img5 from '../assets/image 10.png'
import img6 from '../assets/image 11.png'
import img7 from '../assets/image 12.png'
import img8 from '../assets/image 13.png'
import img9 from '../assets/image 14.svg'
import img10 from '../assets/image 15.svg'
import img11 from '../assets/image 16.svg'
import img12 from '../assets/image 17.svg'
import img13 from '../assets/image 18.svg'
import img14 from '../assets/image 19.svg'
import img15 from '../assets/image 20.svg'
import img16 from '../assets/image 22.svg'
import img18 from '../assets/image 23.svg'
import img19 from '../assets/image 24.svg'
import img20 from '../assets/image 25.svg'
import img21 from '../assets/image 26.svg'
import img22 from '../assets/image 27.svg'
import img23 from '../assets/image 28.svg'
import img24 from '../assets/image 29.svg'
import img25 from '../assets/image 30.svg'
import img26 from '../assets/image 31.svg'
import img27 from '../assets/image 32.svg'
import img28 from '../assets/image 33.svg'
import img29 from '../assets/image 540.svg'
import img30 from '../assets/image 541.svg'
import img31 from '../assets/image 542.svg'
import img32 from '../assets/image 543.svg'
import { Link } from "react-router-dom";


const PromoGrid = () => {
  return (
    
    <div className="grid grid-cols-4 grid-rows-2 gap-6 p-6 ">
      {/* Card 1 */}
      
      <div  className="bg-white p-4 shadow-sm">
        <Link to={`/products/category/Fashion`}>
        <h2 className="font-bold text-lg">Revamp your home in style</h2>

        <div className="grid grid-cols-2 gap-2 mt-3">
          <div>
            <img src={img} className="w-full" />
            <p className="text-xs mt-1">Cushion covers, bedsheets & more</p>
          </div>

          <div>
            <img src={img2} className="w-full" />
            <p className="text-xs mt-1">Figurines, vases & more</p>
          </div>

          <div>
            <img src={img3} className="w-full" />
            <p className="text-xs mt-1">Home storage</p>
          </div>

          <div>
            <img src={img4} className="w-full" />
            <p className="text-xs mt-1">Lighting solutions</p>
          </div>
        </div>

        <p className="text-blue-600 text-sm mt-3 cursor-pointer">Explore all</p>
        </Link>
      </div>
      

      {/* Card 2 */}
     
      <div className="bg-white p-4 shadow-sm">
        <Link to={`/products/category/Appliances`}>
        <h2 className="font-bold text-lg">Appliances for your home | Up to 55% off</h2>

        <div className="grid grid-cols-2 gap-2 mt-3">
          <div>
            <img src={img5} className="w-full" />
            <p className="text-xs mt-1">Air Conditioners</p>
          </div>

          <div>
            <img src={img6} className="w-full" />
            <p className="text-xs mt-1">Refrigerators</p>
          </div>

          <div>
            <img src={img7} className="w-full" />
            <p className="text-xs mt-1">Microwaves</p>
          </div>

          <div>
            <img src={img8} className="w-full" />
            <p className="text-xs mt-1">Washing machines</p>
          </div>
        </div>

        <p className="text-blue-600 text-sm mt-3 cursor-pointer">See more</p>
        </Link>
      </div>
     

      {/* Card 3 */}
      
      <div className="bg-white p-4 shadow-sm">
        <Link to={`/products/category/Electronics`}>
        <h2 className="font-bold text-lg">Starting $149 | Headphones</h2>

        <div className="grid grid-cols-2 gap-2 mt-3">
          <div>
            <img src={img9} className="w-full" />
            <p className="text-xs mt-1">Starting ₹249 | boAt</p>
          </div>

          <div>
            <img src={img10} className="w-full" />
            <p className="text-xs mt-1">Starting ₹349 | Boult</p>
          </div>

          <div>
            <img src={img11} className="w-full" />
            <p className="text-xs mt-1">Starting ₹649 | Noise</p>
          </div>

          <div>
            <img src={img12} className="w-full" />
            <p className="text-xs mt-1">Starting ₹149 | Zebronics</p>
          </div>
        </div>

        <p className="text-blue-600 text-sm mt-3 cursor-pointer">See all offers</p>
        </Link>
      </div>
      

      {/* Card 4 */}
      
      <div className="bg-white p-4 shadow-sm">
        <Link to={`/products`}>
        <h2 className="font-bold text-lg">Starting ₹99 | Amazon Brands & more</h2>

        <div className="grid grid-cols-2 gap-2 mt-3">
          <div>
            <img src={img13} className="w-full" />
            <p className="text-xs mt-1">Home storage & organizers</p>
          </div>

          <div>
            <img src={img14} className="w-full" />
            <p className="text-xs mt-1">Storage racks</p>
          </div>

          <div>
            <img src={img15} className="w-full" />
            <p className="text-xs mt-1">Toys & games</p>
          </div>

          <div>
            <img src={img16} className="w-full" />
            <p className="text-xs mt-1">Jackets, dresses & more</p>
          </div>
        </div>

        <p className="text-blue-600 text-sm mt-3 cursor-pointer">Shop now</p>
        </Link>
      </div>
      

      
      <div className="bg-white p-4 shadow-sm">
        <Link to={`/products`}>
        <h2 className="font-bold text-lg">Automotive essentials| Up to 60% off</h2>

        <div className="grid grid-cols-2 gap-2 mt-3">
          <div>
            <img src={img16} className="w-full" />
            <p className="text-xs mt-1">Cleaning Accessories</p>
          </div>

          <div>
            <img src={img18} className="w-full" />
            <p className="text-xs mt-1">Tyre & Rim care</p>
          </div>

          <div>
            <img src={img19} className="w-full" />
            <p className="text-xs mt-1">Helmets</p>
          </div>

          <div>
            <img src={img20} className="w-full" />
            <p className="text-xs mt-1">Vaccum Cleaner</p>
          </div>
        </div>

        <p className="text-blue-600 text-sm mt-3 cursor-pointer">Shop now</p>
        </Link>
      </div>
     


      
      <div className="bg-white p-4 shadow-sm">
        <Link to={`/products/category/Cosmetics`}>
        <h2 className="font-bold text-lg">Up to 60% off | Styles for women</h2>

        <div className="grid grid-cols-2 gap-2 mt-3">
          <div>
            <img src={img21} className="w-full" />
            <p className="text-xs mt-1">Women's Clothing</p>
          </div>

          <div>
            <img src={img22} className="w-full" />
            <p className="text-xs mt-1">Footwear+Handbags</p>
          </div>

          <div>
            <img src={img23} className="w-full" />
            <p className="text-xs mt-1">Watches</p>
          </div>

          <div>
            <img src={img24} className="w-full" />
            <p className="text-xs mt-1">Fashion Jewellery</p>
          </div>
        </div>

        <p className="text-blue-600 text-sm mt-3 cursor-pointer">Shop now</p>
        </Link>
      </div>
      


      <div className="bg-white p-4 shadow-sm">
        <Link to={`/products/category/Appliances`}>
        <h2 className="font-bold text-lg">Starting ₹199 | Amazon Brands & more</h2>

        <div className="grid grid-cols-2 gap-2 mt-3">
          <div>
            <img src={img25} className="w-full" />
            <p className="text-xs mt-1">Starting $199| Bedsheets</p>
          </div>

          <div>
            <img src={img26} className="w-full" />
            <p className="text-xs mt-1">Starting $199| Curtains</p>
          </div>

          <div>
            <img src={img27} className="w-full" />
            <p className="text-xs mt-1">Minimum 40% off | Ironing board & more</p>
          </div>

          <div>
            <img src={img28} className="w-full" />
            <p className="text-xs mt-1">Up to 60% off | Home decor</p>
          </div>
        </div>

        <p className="text-blue-600 text-sm mt-3 cursor-pointer">Shop now</p>
        </Link>
      </div>
     



      <div className="bg-white p-4 shadow-sm">
        <Link to={`/products/category/Appliances`}>
        <h2 className="font-bold text-lg">Starting ₹99 | Home improvement essentials</h2>

        <div className="grid grid-cols-2 gap-2 mt-3">
          <div>
            <img src={img29} className="w-full" />
            <p className="text-xs mt-1">Spin mops, wipes & more</p>
          </div>

          <div>
            <img src={img30} className="w-full" />
            <p className="text-xs mt-1">Bathroom hardware & accessories</p>
          </div>

          <div>
            <img src={img31} className="w-full" />
            <p className="text-xs mt-1">Hammers, screwdrivers & mor</p>
          </div>

          <div>
            <img src={img32} className="w-full" />
            <p className="text-xs mt-1">Extension boards, plugs & more</p>
          </div>
        </div>

        <p className="text-blue-600 text-sm mt-3 cursor-pointer">Shop now</p>
        </Link>
      </div>
    </div>
  );
};

export default PromoGrid;
