import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import imagePath from "./assetHelper";
import { onValue, ref, remove, set } from "firebase/database";
import { uid } from "uid";
import { database } from "../firebase";
import { useLocation } from "react-router-dom";

function Bookings() {
  let src = "hotel-oslo-4.jpg";
  const[booked,setBooked]=useState([])
  console.log(booked);
    const location=useLocation()
  useEffect(() => {
    onValue(ref(database, "booked_hotels"), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const datas = Object.values(data);

        setBooked(datas);
      } else {
        setBooked([]);
      }
    });
  }, []);

  const newBooked=[]
  booked.map((f)=>{
    if(location.state.email != null){

      if(f.userEmail==location.state.email){
        newBooked.push(f)
      }
    }
  })
  const cancelBooking=(items)=>{
    remove(ref(database, "booked_hotels" + `/${items.uuid}`));
  }
  return (
    <div>
      <NavBar />
      <div className="mx-40 my-24 grid grid-cols-2 gap-16">
        {newBooked ? newBooked.map((items)=>{
            return(

        <div className=" shadow-lg p-8" >
          <div className="flex  justify-between font-gordita ">
            <div>
              <h1>{items.hotelName}</h1>
              <h4>{items.spot}</h4>
              <img className="h-[220px]" src={items.image} alt="" />
            </div>
            <div className="flex items-end">
              <div>
                <h4>Rooms :{items.roomCount}</h4>
                <h4>Rate:{items.rate}/-</h4>
              </div>
            </div>
          </div>
          <div className="text-center" >
          <button onClick={()=>cancelBooking(items)} className="bg-[#515DEF]  px-[40px] py-4 text-white font-gorditaMedium  mt-14">
                  Cancel Booking
                </button>
          </div>
        </div>
            )
        }):<div>g</div>}

        {/* <div className=" shadow-lg p-8" >
          <div className="flex  justify-between font-gordita ">
            <div>
              <h1>Resort</h1>
              <h4>Kerala</h4>
              <img className="h-[220px]" src={`${imagePath(src)}`} alt="" />
            </div>
            <div className="flex items-end">
              <div>
                <h4>Rooms :4</h4>
                <h4>Rate:1500/-</h4>
              </div>
            </div>
          </div>
          <div className="text-center" >
          <button  className="bg-[#515DEF]  px-[40px] py-4 text-white font-gorditaMedium  mt-14">
                  Cancel Booking
                </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Bookings;
