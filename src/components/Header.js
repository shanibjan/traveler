import React from "react";
import imagePath from "../Pages/assetHelper";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import ReactOwlCarousel from "react-owl-carousel";
import "animate.css/animate.min.css";
import NavBar from "./NavBar";
import { useLocation } from "react-router-dom";
function Header() {
  const location=useLocation()
 console.log(location);
  let bgMap = [
    {
      src: "bg.jpg",
    },
    { src: "bg3.jpg" },
    { src: "bg2.jpg" },
  ];

  const product = {
    items: 1,
    loop: true,
    nav: false,
    dots: false,
    margin: 30,
    animateOut: "animate__animated animate__slideOutLeft",
    autoplay: false,
    autoplayTimeout: 4000,
  };
  return (
    <div>
      <NavBar  />

      <div className="relative">
        <ReactOwlCarousel className="owl-theme" {...product}>
          {bgMap.map((bg) => {
            return (
              <div
                className="absolute w-full top-[-50px] -z-[9] h-[700px] bg-center bg-cover text-center table bg-fixed"
                style={{
                  background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),url(${imagePath(
                    `${bg.src}`
                  )})`,
                  backgroundAttachment:'fixed',
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <div className="table-cell align-middle">
                  <h5 className="text-white text-[30px] font-gorditaBold leading-[100px] ">
                    TOURS & TRAVEL
                  </h5>
                  <h1 className="text-white text-[70px] font-gorditaBold leading-[80px]">
                    Discover Amazing <br />
                    Places With Us
                  </h1>
                  <button className="bg-[#515DEF] py-[12px] px-[40px] text-white font-gorditaMedium ">
                    Book Now
                  </button>
                </div>
              </div>
            );
          })}
        </ReactOwlCarousel>
      </div>
    </div>
  );
}

export default Header;
