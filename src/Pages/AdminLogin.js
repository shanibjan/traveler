import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function AdminLogin() {
    const userName = useRef();
    const userPassword = useRef();
    const navigate=useNavigate()
    const userLoginClick = () => {
      let uUserName = userName.current.value;
      let uPassword = userPassword.current.value;
      console.log(uUserName);
      if(uUserName=="1" && uPassword=="1"){
          navigate('/admin',{ state: { name: 'shanibjan' } })
          window.alert("Welcome Admin")
      }else{
          window.alert("Login Failed")
      }
    };
  return (
    <>
     <div className='text-center' >

      <div className="register">
        <h1>Login Account</h1>
        <h2>Admin Information</h2>
        <div className="informations">
          <label htmlFor="">Username</label>
          <br />
          <input
            ref={userName}
            name="text"
            placeholder="Your Username"
            title="Your Email"
            type="email"
          />
          <br />
          <label htmlFor="">Password</label>
          <br />
          <input ref={userPassword} type="password" placeholder="Password" />
          <br />

          <img src="" id="jan" alt="" />
        </div>
        <a onClick={userLoginClick} className="create">
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

export default AdminLogin
