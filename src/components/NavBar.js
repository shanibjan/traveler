import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faFacebook,
  faTwitter,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { useLocation, useNavigate } from 'react-router-dom';

function NavBar({prop}) {
 
  const location=useLocation()
 

  
  
  const navigate=useNavigate()
 
  return (
    <div>
      <div className="flex justify-between my-6 mx-40 ">
        <div className="text-gray-600 grid grid-cols-7 font-gorditaMedium items-center ">
          <div className="col-span-4">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            shanibjan369@gmail.com
          </div>
          <div className="col-span-3 flex justify-end">
            <FontAwesomeIcon icon={faPhone} className="mr-2" />
            8129311392
          </div>
        </div>
        <div className="text-[#515DEF] text-[20px]">
          <FontAwesomeIcon icon={faInstagram} className="mx-3" />
          <FontAwesomeIcon icon={faFacebook} className="mx-3" />
          <FontAwesomeIcon icon={faLinkedin} className="mx-3" />
          <FontAwesomeIcon icon={faTwitter} className="mx-3" />
          <FontAwesomeIcon icon={faYoutube} className="mx-3" />
        </div>
      </div>
      <div>
        <div className="mx-40 ">
          <div className="grid grid-cols-12 px-9 py-5 items-center shadow-2xl bg-white relative z-20 ">
            <div className="col-span-5 flex font-gorditaBold text-[37px] items-center">
              <h1>TRAVEL</h1>
              <h1 className="text-[#515DEF]">ER</h1>
            </div>
            <ul className="flex col-span-7 justify-between font-gorditaMedium cursor-pointer">
              <li onClick={()=>{
                if(location.state){
                  navigate('/',{state:{name:location.state.name,email:location.state.email}})
                }
              }} >Home</li>
              <li>About</li>
              <li>Service</li>
              <li onClick={()=>{
                if(location.state){
                  navigate('/bookings',{state:{name:location.state.name,email:location.state.email}})
                }else{
                  window.alert('Login If You Have Any Bookings')
                }
              }} >Bookings</li>
              <li>WishList</li>
              <li className='dropdown' >Profile
                  <ul className='dropdown-menu' >
                    <li  onClick={()=>navigate('/login')} >{location.state  || prop=="login" ? null :'Login'}</li>
                    <li  onClick={()=>navigate('/register')} >{location.state || prop=="register" ? null :'Signup'}</li>
                    <li onClick={()=>navigate('/login')} >{location.state ? 'Logout' :null}</li>
                    <li onClick={()=>navigate('/admin_login')}  >{location.state ? null :'Admin'}</li>
                  </ul>

              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar
