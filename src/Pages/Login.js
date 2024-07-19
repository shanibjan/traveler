import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { onValue, ref, remove, set } from "firebase/database";
import { uid } from 'uid'
import { database } from '../firebase';

function Login() {
    const email=useRef()
    const userPassword=useRef()
    const [data,setData]=useState([])
    const location=useLocation()
    const navigate=useNavigate()
    useEffect(() => {
        onValue(ref(database, "registration"), (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const datas = Object.values(data);
    
            setData(datas);
           
          }else{
            setData([])
          }
        });
      }, []);

      const userLogin=()=>{
        var IsLoggedIn = false;
    let uEmail = email.current.value;
    let uPassword = userPassword.current.value;
    email.current.value = null;
   
    // const fNameParse = JSON.parse(localStorage.getItem("user_registration"));
    // console.log(fNameParse);
    if(data !=null){
      data.map((userDetails) => {
        if (uEmail == userDetails.email && uPassword == userDetails.password ) {
          console.log(userDetails.name);
          navigate("/", { state: { name: userDetails.name ,email:userDetails.email} });
          IsLoggedIn = true;
          window.alert("success");
        }
        
      });
  
      if (IsLoggedIn == false ) {
        window.alert("failed");
      }
    }else{
      window.alert('No user found')
    }
      }
  return (
    <>
      
      <NavBar prop={'login'} />
      <div className='text-center' >

      <div className="register font-gorditaMedium ">
        <h1 className='text-[40px]' >Login Account</h1>
        <h2 className='text-[40px]' >Personal Information</h2>
        <Link to="/register" style={{ textDecoration: "none" }}>
          {" "}
          <a href="" className="return-store">
            Or Signup
          </a>
        </Link>
        <div className="informations">
          <label htmlFor="">E-mail</label>
          <br />
          <input
           ref={email}
            name="email"
            placeholder="Your Email"
            title="Your Email"
            type="email"
          />
          <br />
          <label htmlFor="">Password</label>
          <br />
          <input ref={userPassword} type="password" placeholder="Password" />
          <br />
          
        </div>
        <a onClick={userLogin} className="create">
          <p>LOGIN</p>
        </a>
        <Link to="/" style={{ textDecoration: "none" }}>
          {" "}
          <a href="" className="return-store">
            Or Return to Home
          </a>
        </Link>
        {}
      </div>
      </div>
     
    </>
  )
}

export default Login
