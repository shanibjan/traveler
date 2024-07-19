import React, { useContext, useEffect, useState } from "react";
import imagePath from "../Pages/assetHelper";
import { useLocation, useNavigate } from "react-router-dom";
import { onValue, ref, remove, set } from "firebase/database";
import { uid } from 'uid'
import { database } from '../firebase';
import { PostContext } from "../store/postContext";

function Places() {
  const[spots,setSpots]=useState([])
  const location= useLocation()
  const {setPostDetails}=useContext(PostContext)
  console.log(spots);
  useEffect(() => {
    onValue(ref(database, "spots"), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const datas = Object.values(data);

        setSpots(datas);
       
      }else{
        setSpots([])
      }
    });
  }, []);
  const nav=useNavigate()
  let places = [
    {
      src: "norway.jpg",
      place: "Norway",
      destNo: 10,
    },
    {
      src: "india.jpg",
      place: "India",
      destNo: 10,
    },
    {
      src: "usa.jpg",
      place: "USA",
      destNo: 10,
    },
    {
      src: "uae.jpg",
      place: "UAE",
      destNo: 10,
    },
    {
      src: "spain.jpg",
      place: "Spain",
      destNo: 10,
    },
    {
      src: "japan.jpg",
      place: "Japan",
      destNo: 10,
    },
    {
      src: "indo-main.jpg",
      place: "Indonesia",
      destNo: 10,
    },
    {
      src: "france.jpg",
      place: "France",
      destNo: 10,
    },
    {
      src: "iceland.jpg",
      place: "Ice Land",
      destNo: 10,
    },
  ];
  useEffect(() => {
    let bgPlace = document.querySelectorAll(".card");
    bgPlace.forEach((element) => {
      let child = element.childNodes[0];
      let grandChild = child.childNodes[0];

      element.addEventListener("mouseenter", () => {
        grandChild.style.filter='brightness(0.5)'
        grandChild.style.backgroundSize = "125%";
       
      });

      element.addEventListener("mouseleave", () => {
        grandChild.style.filter='brightness(1)'
        grandChild.style.backgroundSize = "105%";
      });
    });
  }, []);
const placeView=(place)=>{
  setPostDetails(place)
  console.log(place.src);
  let spott=spots.filter((spot)=>spot.country==place.place)
  console.log(spott);
  set(ref(database, "spot-overview"), spott)
  setTimeout(()=>{

   if(location.state !=null){

     nav('/destination',{state:{name:location.state.name,email:location.state.email}});
   }else{
    nav('/destination')
   }
  },500)
}
  return (
    <div className="mx-40 my-24">
      <div className="text-center">
        <h4 className="font-gorditaMedium text-[#515DEF] text-[25px]">
          DESTINATION
        </h4>
        <h1 className="font-gorditaBold text-[40px] my-5">
          Explore Top Destinations
        </h1>
      </div>
      <div className=" grid grid-cols-3 gap-x-[80px] gap-y-9">
        {places.map((place) => {
          return (
            <div class="card">
              <div className="text-center">
                {/* <img  src={imagePath(`${place.src}`)} alt="stew" /> */}
                <div
                  className="h-44 bg-place "
                  style={{
                    backgroundImage: `url(${imagePath(`${place.src}`)})`,
                    // backgroundPosition: "center",
                    // backgroundSize: "cover",
                  }}
                ></div>
                <div class="grid my-3 ">
                  <span class="font-gorditaBold text-gray-500">
                    {place.place}
                  </span>
                  <span className="font-gorditaMedium">
                    {place.destNo}Destinations
                  </span>
                </div>
                <button onClick={(()=>{
                  placeView(place)
                })} className="bg-[#515DEF] py-[7px] px-[20px] text-white font-gorditaMedium ">
                  View
                </button>
              </div>
            </div>
            
          );
        })}
      </div>
    </div>
  );
}

export default Places;
