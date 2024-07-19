import React, { useEffect, useRef, useState } from 'react'
import { onValue, ref, remove, set } from "firebase/database";
import { uid } from 'uid'
import { database } from '../firebase';
import { useNavigate } from 'react-router-dom';

function CreateSpots() {
    const [image, setImage] = useState([]);
    console.log(image);
    const countryVal=useRef()
    const spotVal=useRef()
    const descriptionVal=useRef()
   const navigate=useNavigate()
    const store=(e)=>{
        const val=e.target.files[0]
        const reader = new FileReader();
    reader.readAsDataURL(val);
    reader.addEventListener("load", () => {
        let imageLoader = reader.result;
       
        setImage((stateCopy) => {
          return [...stateCopy, { loader: imageLoader }];
        });
      });
    }
   

    const uploadSpot = () => {
        let country= countryVal.current.value.charAt(0).toUpperCase()+countryVal.current.value.slice(1);
        let spot= spotVal.current.value.charAt(0).toUpperCase()+spotVal.current.value.slice(1);
        
        let description = descriptionVal.current.value;
       
        const uuid=uid()
        set(ref(database, "spots" + `/${uuid}`), {
          uuid,
                country:country,
                spot:spot,
                description:description,
              url1: image[0].loader,
              url2: image[1].loader,
              url3: image[2].loader,
              url4: image[3].loader,
             url5:image[4].loader,
              date:new Date(),
             
        });
       
    
        setTimeout(() => {
          navigate("/admin");
        }, 100);
      };

     
  return (
    <div>
      <div className="informations mx-auto w-[500px] text-center " >
       
      <label htmlFor="">Country</label>
      <input
            ref={countryVal}
            type="text"
            placeholder="Country..."
          />
          <br />
          <label htmlFor="">Spot</label>
          
          <input ref={spotVal} type="text" placeholder="Spot" />
          <br />
          <label htmlFor="">Description</label>
          
          <input
            ref={descriptionVal}
            type="text"
            min="0"
            max="500"
            placeholder="Description"
          />
          <br />
          <label htmlFor="">Product 1</label>
          <br />
          <input
            type="file"
            id="myFile"
            name="filename"
            multiple
            accept=".jpg,.jpeg,.png"
            onChange={store}
          />
          <br />

           <label htmlFor="">Product 2</label>
          <br />
          <input
            type="file"
            id="myFile"
            name="filename"
            multiple
            accept=".jpg,.jpeg,.png"
            onChange={store}
          /> 
          <br />
          <label htmlFor="">Product 3</label>
          <br />
          <input
            type="file"
            id="myFile"
            name="filename"
            multiple
            accept=".jpg,.jpeg,.png"
            onChange={store}
          /> 
          <br />
          <label htmlFor="">Product 4</label>
          <br />
          <input
            type="file"
            id="myFile"
            name="filename"
            multiple
            accept=".jpg,.jpeg,.png"
            onChange={store}
          /> 
          <br />
          <label htmlFor="">Product 4</label>
          <br />
          <input
            type="file"
            id="myFile"
            name="filename"
            multiple
            accept=".jpg,.jpeg,.png"
            onChange={store}
          /> 
          <br />
          <button onClick={uploadSpot} className="bg-[#515DEF] py-[12px] px-[40px] text-white font-gorditaMedium ">
                    Upload
                  </button>
      </div>
    </div>
  )
}

export default CreateSpots
