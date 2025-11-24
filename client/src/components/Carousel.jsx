import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import car1 from "../assets/car1.jpg"
import car2 from "../assets/car2.jpg"
import car3 from "../assets/car3.jpg"
import car4 from "../assets/car4.png"
import car5 from "../assets/car5.jpg"
import { ChevronLeftIcon, ChevronRight } from "lucide-react";

const Carousel = () => {
    const NextArrow = ({ onClick }) => {
  return (
    <div
      className="absolute right-4 top-1/2 transform -translate-y-1/2  text-black p-3 rounded-full cursor-pointer  z-10"
      onClick={onClick}
    >
      < ChevronRight size={40} />
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div
      className="absolute left-4 top-1/2 transform -translate-y-1/2  text-black p-3 rounded-full cursor-pointer z-10"
      onClick={onClick}
    >
      <ChevronLeftIcon size={40}/>
    </div>
  );
};

  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const images = [
    car1,car2,car3,car4,car5
  ];

  return (
    
     <div className="relative w-screen h-screen overflow-hidden ">
        
      <Slider {...settings}>
        {images.map((img, i) => (
          <div key={i}>
            <img src={img} className="w-screen h-screen object-cover" />
          </div>
        ))}
      </Slider>
      <div className="absolute bottom-0 left-0 w-full h-45 bg-linear-to-t from-gray-100 to-transparent"></div>

    </div>
  );
};

export default Carousel;
