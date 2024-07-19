import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import imagePath from "./assetHelper";
import { useLocation, useNavigate } from "react-router-dom";
import { onValue, ref, remove, set } from "firebase/database";
import { uid } from "uid";
import { database } from "../firebase";
import Hotels from "./Hotels";

function DestinationDetails() {
  const { pathname } = useLocation();
  const [spotDetails, setSpotDetails] = useState();
 
  const nav = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    onValue(ref(database, "spot-details"), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const datas = Object.values(data);

        setSpotDetails(datas);
      } else {
        setSpotDetails([]);
      }
    });
  }, []);
  let src = "oslo-norway.jpg";
  let osloMap = [
    {
      oslo: "oslo-2.jpg",
    },
    {
      oslo: "oslo-3.jpg",
    },
    {
      oslo: "oslo-4.jpg",
    },
    {
      oslo: "oslo-5.jpg",
    },
  ];

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
    <div>
      <NavBar />

      <div className="relative">
        <div
          className="absolute w-full top-[-50px] -z-[9] h-[500px] bg-center bg-cover text-center table"
          style={{
            backgroundImage: `url(${spotDetails ? spotDetails[0].url1 : null})`,
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
            backgroundSize: "cover",
            filter: "brightness(0.9)",
          }}
        ></div>
      </div>
      <div className="mx-40 my-24">
        <div className="bg-white relative top-[298px] px-9 py-[38px] shadow-xl ">
          <div>
            <h2 className="font-gorditaBold text-[35px] text-[#515DEF]">
              Tourist Spots in {spotDetails ? spotDetails[0].spot : null}
            </h2>
            <p className="font-gordita">
              {spotDetails ? spotDetails[0].description : null}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-[80px]  my-8">
            <div
              className="h-[300px]  "
              style={{
                backgroundImage: `url(${spotDetails ? spotDetails[0].url2 : null})`,

                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            ></div>
                        <div
              className="h-[300px]  "
              style={{
                backgroundImage: `url(${spotDetails ? spotDetails[0].url3 : null})`,

                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            ></div>
                        <div
              className="h-[300px]  "
              style={{
                backgroundImage: `url(${spotDetails ? spotDetails[0].url4 : null})`,

                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            ></div>
                        <div
              className="h-[300px]  "
              style={{
                backgroundImage: `url(${spotDetails ? spotDetails[0].url5 : null})`,

                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            ></div>
          </div>
          <div className="text-center">
            <a
              className="bg-[#515DEF] py-[12px] px-[40px] text-white font-gorditaMedium "
              href={`https://unsplash.com/s/photos/${spotDetails ? spotDetails[0].spot : null}`}
            >
              Visit More Images
            </a>
          </div>
        </div>
        <Hotels/>
        {/* <div className="bg-white relative top-[298px] px-9 py-[38px] shadow-xl my-5 ">
          <div>
            <h2 className="font-gorditaBold text-[35px] text-[#515DEF]">
              Top Rated Hotels in Oslo
            </h2>
            <p className="font-gordita">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Laboriosam temporibus quos nulla illo hic nisi? Tempora atque
              adipisci amet commodi perferendis blanditiis, velit minus
              obcaecati illum, vitae nemo, assumenda cum?
            </p>
          </div>
          <div className="grid grid-cols-2 gap-[80px]  my-8">
            {osloHotels.map((osl) => {
              return (
                <div>
                  <div
                    className="h-[300px]  "
                    style={{
                      backgroundImage: `url(${imagePath(`${osl.oslo}`)})`,

                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  ></div>
                  <h2 className="font-gorditaBold my-5">{osl.name}</h2>
                </div>
              );
            })}
          </div>
          <div className="text-center py-10 ">
            <button
              className="bg-[#515DEF] py-[12px] px-[40px] text-white font-gorditaMedium "
              onClick={() => nav("/hotels")}
            >
              Check Rooms
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default DestinationDetails;
