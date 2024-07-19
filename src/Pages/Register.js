import React, { useEffect, useRef, useState } from 'react'
import NavBar from '../components/NavBar'
import { Link, useNavigate } from 'react-router-dom'
import { onValue, ref, remove, set } from "firebase/database";
import { uid } from 'uid'
import { database } from '../firebase';
function Register() {
    const userName=useRef()
    const email=useRef()
    const password=useRef()
    const[data,setData]=useState([])
    console.log(data);
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


    const userCreate=()=>{
        let isRegistered=false
       let uuserName=userName.current.value
        let uemail=email.current.value
        let upassword=password.current.value
        if (
            uuserName != "" &&
            uemail != "" &&
            upassword != "" 
          ) {
            data.map((uR) => {
              if (uemail == uR.email) {
                window.alert("User Already Registered");
                isRegistered = true;
              }
            });
            if (isRegistered == false) {
              window.alert("User Registered");
              const uuid=uid()
              set(ref(database, "registration" + `/${uuid}`), {
                name: uuserName,
                
                email: uemail,
                password: upassword,
              });
      
              
              setTimeout(() => {
                navigate("/login");
              }, 100);
            }
          } else {
            window.alert("Please register");
          }
      
        //   if(uuserName && uemail && upassword){

        //       uuserName.current.value = null;
        //       uemail.current.value = null;
        //       upassword.current.value = null;
        //   }
        }
  return (
    <>
    
    <NavBar prop={'register'} />
    <div className='text-center' >

    <div className="register font-gorditaMedium ">
      <h1 className='text-[40px]' >Create an Account</h1>
      <h2 className='text-[40px]' >Personal Information</h2>
      <div className="informations">
        
        <label htmlFor="">User Name</label>
        <br />
        <input
          ref={userName}
          type="text"
          placeholder="Enter Your  Name"
        />
        <br />
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
        <input ref={password} type="password" placeholder="Password" />
      </div>
      <a onClick={userCreate} className="create">
        <p>CREATE</p>
      </a>
      <Link to="/" style={{ textDecoration: "none" }}>
        {" "}
        <a href="" className="return-store">
          Or Return to Home
        </a>
      </Link>
    </div>
    </div>
  </>
  )
}

export default Register
