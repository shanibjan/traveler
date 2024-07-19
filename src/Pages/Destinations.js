import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import imagePath from "./assetHelper";
import { useLocation, useNavigate } from "react-router-dom";
import { onValue, ref, remove, set } from "firebase/database";
import { uid } from "uid";
import { database } from "../firebase";
import { PostContext } from "../store/postContext";

function Destinations() {
  const { pathname } = useLocation();
  const [destinations, setDestinations] = useState([]);
  const location = useLocation();
  const{postDetails}=useContext(PostContext)
  
  const[hotels,setHotels]=useState([])
  
  

  useEffect(() => {
    onValue(ref(database, "hotels"), (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const datas = Object.values(data);

        setHotels(datas);
      } else {
        setHotels([]);
      }
    });
  }, []);

  useEffect(() => {
    onValue(ref(database, "spot-overview"), (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const datas = Object.values(data);

        setDestinations(datas);
      } else {
        setDestinations([]);
      }
    });
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const nav = useNavigate();
  let src = "norway.jpg";

  useEffect(() => {
    let bgPlace = document.querySelectorAll(".card");
    bgPlace.forEach((element) => {
      let child = element.childNodes[0];
      let grandChild = child.childNodes[0];

      element.addEventListener("mouseenter", () => {
        grandChild.style.filter = "brightness(0.5)";
        grandChild.style.backgroundSize = "125%";
      });

      element.addEventListener("mouseleave", () => {
        grandChild.style.filter = "brightness(1)";
        grandChild.style.backgroundSize = "105%";
      });
    });
  }, []);
  const destinationView = (place) => {
    
    
    let spott=hotels.filter((hotel)=>hotel.spot==place.spot)
    set(ref(database, "hotel-filter"), spott)
    let placeArray = [];
    placeArray.push(place);
    set(ref(database, "spot-details"), placeArray);
    if(location.state){

      nav("/destination_details",{state:{name:location.state.name,email:location.state.email}});
    }else{
      nav('/destination_details')
    }
  };
  return (
    <div>
      <NavBar  />

      <div className="relative  ">
        <div
          className="absolute w-full top-[-50px] -z-[9] h-[500px]   text-center table "
          style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url(${imagePath(`${postDetails.src}`)})`,
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="table-cell align-middle">
            <h1 className="text-white text-[50px] font-gorditaBold leading-[80px]">
              Discover Amazing <br />
              Places In {destinations[0] ? destinations[0].country : null}
            </h1>
          </div>
        </div>
        
      </div>
      <div className="mx-40 my-24 relative top-[270px]">
        <div className=" grid grid-cols-3 gap-x-[80px] gap-y-9">
          {destinations.map((place) => {
            return (
              <div class="card">
                <div className="text-center">
                  {/* <img  src={imagePath(`${place.src}`)} alt="stew" /> */}
                  <div
                    className="h-44 bg-place "
                    style={{
                      backgroundImage: `url(${place.url1})`,
                      // backgroundPosition: "center",
                      // backgroundSize: "cover",
                    }}
                  ></div>
                  <div className="grid my-3 ">
                    <span className="font-gorditaBold text-gray-500">
                      {place.spot}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      destinationView(place);
                    }}
                    className="bg-[#515DEF] py-[7px] px-[20px] text-white font-gorditaMedium "
                  >
                    Explore
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Destinations;
