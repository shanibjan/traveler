import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import imagePath from "./assetHelper";
import { useLocation, useNavigate } from "react-router-dom";
import { onValue, ref, remove, set } from "firebase/database";
import { uid } from "uid";
import { database } from "../firebase";
function Hotels() {
  const navigate=useNavigate()
  const[hotels,setHotels]=useState([])
  const location=useLocation()
  console.log(location);
  console.log(hotels);

  useEffect(() => {
    onValue(ref(database, "hotel-filter"), (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const datas = Object.values(data);

        setHotels(datas);
      } else {
        setHotels([]);
      }
    });
  }, []);
  


  
  let osloHotels = [
    {
      oslo: "hotel-oslo-2.jpg",
      name: "Hotel California",
    },
    {
      oslo: "hotel-oslo-3.jpg",
      name: "Hotel Redyssey",
    },
    {
      oslo: "hotel-oslo-4.jpg",
      name: "Hotel Bolgatty",
    },
    {
      oslo: "hotel-oslo-1.jpg",
      name: "Hotel Grant Hyatt",
    },
  ];
  return (
    <div className="mt-[400px]" >
      
      <div >
        <div className="bg-white  px-9 py-[38px] shadow-xl my-5 ">
          <div>
            <h2 className="font-gorditaBold text-[35px] text-[#515DEF]">
              Top Rated Hotels in {hotels[0]? hotels[0].spot : null}
            </h2>
            <p className="font-gordita my-10">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Laboriosam temporibus quos nulla illo hic nisi? Tempora atque
              adipisci amet commodi perferendis blanditiis, velit minus
              obcaecati illum, vitae nemo, assumenda cum?
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-[80px] gap-y-24 my-8">
            {hotels.map((osl) => {
              return (
                <div>
                  <div
                    className="h-[300px]  "
                    style={{
                      backgroundImage: `url(${osl.url1})`,

                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  ></div>
                  <div className="px-6">
                    <div className="flex justify-between items-center">
                      <h2 className="font-gorditaBold my-5">{osl.hotel}</h2>
                      <h4 className="text-[#ebca2e] text-[25px]">{osl.star}</h4>
                    </div>
                    <div className="text-gray-700 font-gordita flex justify-between underline">
                      <p>In city centre </p>
                      <p>Metro access </p>
                      <p>Breakfast Included</p>
                    </div>
                    <div className="flex justify-between text-gray-700 font-gordita mt-5 ">
                      <h5>1 Night,2 Adults</h5>
                      <div className="flex justify-between w-[130px]">
                        <h5 className="text-red-600 line-through">₹ {osl.rate}</h5>
                        <h5>₹ {osl.offerrate}</h5>
                      </div>
                    </div>
                  </div>
                  <div className="text-center py-10 ">
                    <button onClick={()=>{
                      
                      set(ref(database, "hotel-overview"), osl);
                      if(location.state){

                        navigate('/hotel',{state:{name:location.state.name,email:location.state.email}})
                      }else{
                        navigate('/hotel')
                      }
                    }} className="bg-[#515DEF] py-[12px] px-[40px] text-white font-gorditaMedium ">
                      Check Room Availability
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hotels;
