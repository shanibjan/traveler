import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBowlFood,
  faIndianRupeeSign,
  faLocationDot,
  faMoneyBill,
  faWifiStrong,
 
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";


import { useLocation } from "react-router-dom";
import { onValue, ref, remove, set } from "firebase/database";
import { uid } from "uid";
import { database } from "../firebase";

function Hotel() {
let date=new Date()
  const[count,setCount]=useState(0)
  const { pathname } = useLocation();
  const location=useLocation()
  const[hotel,setHotel]=useState([])
  const[rooms,setRooms]=useState(15)
  
  const[star,setStar]=useState('1')
  const[booked,setBooked]=useState([])
  const [fav,setFAv]=useState([])
  console.log(fav);
 
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

  useEffect(() => {
    onValue(ref(database, "fav_hotels"), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const datas = Object.values(data);

        setFAv(datas);
      } else {
        setFAv([]);
      }
    });
  }, []);

  let totalRate=star*hotel.rate
  let totalOfferrate=star*hotel.offerrate
  let totalRoom=15
  
  
  useEffect(() => {
    onValue(ref(database, "hotel-overview"), (snapshot) => {
      const data = snapshot.val();
     
      if (data) {
       

        setHotel(data);
      } else {
        setHotel([]);
      }
    });
  }, []);


 
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const scrollReserve=()=>{
    let res=document.querySelector('.reserve')
    res.scrollIntoView({ behavior: "smooth",
    
    inline: "nearest",})
  }

  const reserve=()=>{
    if(location.state!=null && rooms>=star){

      const uuid=uid()
      set(ref(database, "booked_hotels" + `/${uuid}`), {
        uuid,
        userEmail:location.state.email,
        roomCount:star,
        hotelName:hotel.hotel,
        spot:hotel.spot,
        date:date,
        rate:totalOfferrate,
        image:hotel.url1
           
      });
        window.alert('room booked')
      
    }else if(star>rooms){
      window.alert('Room is fully Booked')
    }
    else{
      window.alert('Please login')
    }
   


    
    
  }

  useEffect(()=>{
  
    booked.map((book)=>{
      
      if(book.hotelName==hotel.hotel){
       
       
        totalRoom=totalRoom-book.roomCount
       setRooms(totalRoom);
      
      }
    })
   },[reserve])

   const addFav=()=>{
    console.log('j');
    if(location.state){
      const uuid=uid()
      set(ref(database, "fav_hotels" + `/${uuid}`), {
        uuid,
        userEmail:location.state.email,
        roomCount:star,
        hotelName:hotel.hotel,
        spot:hotel.spot,
        date:date,
        rate:totalOfferrate,
        image:hotel.url1,
        hotelUuid:hotel.uuid
           
      });
        window.alert('addes to favourite')
    }else{
      window.alert('Please Login')
    }
   }

   let favv=fav.filter((f)=>{
    if(location.state){

      return (f.hotelUuid==hotel.uuid && f.userEmail==location.state.email)
    }
   })
   const removeFav=()=>{
    console.log(favv[0].uuid);
    remove(ref(database, "fav_hotels" + `/${favv[0].uuid}`));
   }
  return (
    <div>
      <NavBar />
      <button onClick={()=>setCount(count+1)} > hh</button>
      {count}
      <div>
        <div className="mx-40 my-24 font-gorditaMedium">
          <div className="grid grid-cols-3 text-center ">
            <div className=" border-b-2 border-b-[#515def] p-3 cursor-pointer ">
              Overview
            </div>
            <div onClick={scrollReserve} className=" border-b-2 border-b-[white] hover:border-b-gray-200 p-3 cursor-pointer ">
              Facilities
            </div>
            <div onClick={scrollReserve} className=" border-b-2 border-b-[white] hover:border-b-gray-200 p-3 cursor-pointer  ">
              Reserve
            </div>
          </div>
          <div className="shadow-xl p-10 ">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-[#ebca2e] text-[30px]">{hotel.star}</h4>
                <h4>{hotel.hotel}</h4>
                <div className="flex items-baseline w-[405px] justify-between  ">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="text-[#515def]"
                  />
                  <h4>{hotel.location}</h4>
                </div>
              </div>
              <div className="flex w-48 justify-between items-center">
                {favv.length != 0 ?(<div  onClick={removeFav} className="text-[#515DEF] text-[24px]">
                <FontAwesomeIcon icon="fa-solid fa-heart" />
                </div>):( <div  onClick={addFav} className="text-[#515DEF] text-[24px]">
                  <FontAwesomeIcon icon={faHeart} />
                </div>)}
               
                
                <div className="text-center py-10 ">
                  <button onClick={scrollReserve} className="bg-[#515DEF] py-[12px] px-[40px] text-white font-gorditaMedium ">
                    Reserve
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-3 gap-x-3 ">
                <div className="col-span-1 grid grid-rows-2 gap-3 ">
                  <img src={hotel.url1} alt="" />
                  <img src={hotel.url2} alt="" />
                </div>
                <div className="col-span-2">
                  <img
                    className="h-full"
                    src={hotel.url3}
                    alt=""
                  />
                </div>
              </div>
              {/* <div className="grid grid-cols-5 gap-3 mt-3 ">
                <img src={imagePath("oslo-hotel3.jpg")} alt="" />
                <img src={imagePath("oslo-hotel-4.jpg")} alt="" />
                <img src={imagePath("oslo-hotel-5.jpg")} alt="" />
                <img src={imagePath("oslo-hotel-6.jpg")} alt="" />
                <img src={imagePath("oslo-hotel-7.jpg")} alt="" />
              </div> */}
              <p className="font-gordita text-gray-600 my-16">
                {hotel.description}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center my-16 reserve" >
            <div className="w-[26%] leading-[50px]">
              <h2>Your package:</h2>
              <div className="font-gordita ">
                <div className="grid grid-cols-10 items-baseline ">
                  <FontAwesomeIcon className="col-span-1" icon={faBowlFood} />
                  <h4 className="col-span-8">Superb breakfast included</h4>
                </div>
                <div className="grid grid-cols-10 items-baseline ">
                  <FontAwesomeIcon className="col-span-1" icon={faWifiStrong} />
                  <h4 className="col-span-8">Includes high-speed internet</h4>
                </div>
                <div className="grid grid-cols-10 items-baseline ">
                  <FontAwesomeIcon className="col-span-1" icon={faMoneyBill} />
                  <h4 className="col-span-8">Non-refundable</h4>
                </div>
                <div className="grid grid-cols-10 items-baseline ">
                  <FontAwesomeIcon
                    className="col-span-1"
                    icon={faIndianRupeeSign}
                  />
                  <h4 className="col-span-8">Pay in advance</h4>
                </div>
              </div>
            </div>

            <div className="leading-[63px]" >
              <h4>Only {rooms}Rooms Available</h4>
              <div className="flex justify-between ">
                <h3>Rooms:</h3>
                <select onChange={(e)=>setStar(e.target.value)} className="w-2/3 border-[#515def] border-[1px]" name="" id="">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className="flex justify-between ">
                <h5 className="text-red-600 line-through">₹{totalRate}</h5>
                <h5>₹ {totalOfferrate}</h5>
              </div>
              <div className="text-center  ">
                <button onClick={reserve} className="bg-[#515DEF]  px-[40px] text-white font-gorditaMedium ">
                  Confirm Reservation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hotel;
