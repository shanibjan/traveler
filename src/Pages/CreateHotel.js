import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onValue, ref, remove, set } from "firebase/database";
import { uid } from "uid";
import { database } from "../firebase";

function CreateHotel() {
  const [image, setImage] = useState([]);
  const [rating, setRating] = useState();
  const countryVal = useRef();
  const spotVal = useRef();
  const rateVal = useRef();
  const offerrateVal = useRef();
  const hotelVal = useRef();
  const locationVal = useRef();
  const descriptionVal = useRef();
  const navigate = useNavigate();
  const store = (e) => {
    const val = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(val);
    reader.addEventListener("load", () => {
      let imageLoader = reader.result;

      setImage((stateCopy) => {
        return [...stateCopy, { loader: imageLoader }];
      });
    });
  };

  const uploadHotel = () => {
    let country =
      countryVal.current.value.charAt(0).toUpperCase() +
      countryVal.current.value.slice(1);
    let spot =
      spotVal.current.value.charAt(0).toUpperCase() +
      spotVal.current.value.slice(1);

    let description = descriptionVal.current.value;
    let hotel = hotelVal.current.value;
    let rate = rateVal.current.value;
    let offerrate = offerrateVal.current.value;
    let location = locationVal.current.value;

    const uuid = uid();
    set(ref(database, "hotels" + `/${uuid}`), {
      uuid,
      country: country,
      spot: spot,
      description: description,
      hotel: hotel,
      location: location,
      rate: rate,
      offerrate: offerrate,
      star: rating,
      url1: image[0].loader,
      url2: image[1].loader,
      url3: image[2].loader,

      date: new Date(),
    });

    setTimeout(() => {
      navigate("/admin");
    }, 100);
  };
  return (
    <div>
      <div className="informations mx-auto w-[500px] text-center ">
        <label htmlFor="">Country</label>
        <input ref={countryVal} type="text" placeholder="Country..." />
        <br />
        <label htmlFor="">Spot</label>

        <input ref={spotVal} type="text" placeholder="Spot" />
        <label htmlFor="">Hotel</label>

        <input ref={hotelVal} type="text" placeholder="Spot" />
        <label htmlFor="">location</label>

        <input ref={locationVal} type="text" placeholder="Spot" />
        <label htmlFor="">Rate</label>

        <input ref={rateVal} type="number" placeholder="Spot" />

        <label htmlFor="">Offer Rate</label>

        <input ref={offerrateVal} type="number" placeholder="Spot" />

        <br />
        <label htmlFor="">Rating</label>
        <br />
        <select
          onChange={(e) => {
            setRating(e.target[e.target.selectedIndex].text);
          }}
          className="stars-product"
          name="stars"
          id="stars"
        >
          <option value="1">Rate Stars Here</option>
          <option value="1">★</option>
          <option value="2">★★</option>
          <option value="3">★★★</option>
          <option value="4">★★★★</option>
          <option value="5">★★★★★</option>
        </select>
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

        <button
          onClick={uploadHotel}
          className="bg-[#515DEF] py-[12px] px-[40px] text-white font-gorditaMedium "
        >
          Upload
        </button>
      </div>
    </div>
  );
}

export default CreateHotel;
