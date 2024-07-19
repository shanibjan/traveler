import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onValue, ref, remove, set } from "firebase/database";
import { uid } from 'uid'
import { database } from '../firebase';

function Admin() {
    const navigate=useNavigate()
    const[spots,setSpots]=useState([])
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
  return (
    <div className="flex justify-evenly items-center h-[500px]">
      <button onClick={()=>navigate('/create_spots')} className="bg-[#515DEF] py-[12px] px-[40px] text-white font-gorditaMedium ">
        Upload Spots
      </button>

      <button onClick={()=>navigate('/create_hotel')} className="bg-[#515DEF] py-[12px] px-[40px] text-white font-gorditaMedium ">
        Upload Hotels
      </button>
    </div>
  );
}

export default Admin;
