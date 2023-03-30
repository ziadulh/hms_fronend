import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css'

const Login = () => {

  // useNavigate to navigate url
  const navigate = useNavigate();

  //root url
  const url_local = process.env.REACT_APP_URL;

  // checking whether already logged in 
  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      navigate('/')
    }
  }, [navigate]);

  // to hold and update login credentials
  let [loginData, setLoginData] = useState({ email: "", password: "" });

  // updating login credentials 
  let changeData = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value })
  }

  //login 
  const handleLogin = async (e) => {
    e.preventDefault(); //preventing form submission
    try {
      const response = await fetch(url_local + "api/authentication/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        //sending body
        body: JSON.stringify({ email: loginData.email, password: loginData.password })
      });

      // converting response to jso
      let json = await response.json();

      if (json.status === true) {
        localStorage.setItem('auth-token', json.authToken);
        navigate('/')
        console.log(json);
      } else {
        console.log(json);
        // json.errors.forEach(el => {
        //   toast.error(el.msg);
        // });
      }
    } catch (error) {
      console.log(error);

    }

  }


  return (
    <>
      <div className="login-box">
        <h2 className="heading-login-box">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="user-box">
            <input className="user-box-input" type="email" name="email" value={loginData.email} onChange={changeData} required />
            <label className="user-box-label">Email</label>
          </div>
          <div className="user-box">
            <input className="user-box-input" type="password" name="password" value={loginData.password} onChange={changeData} required />
            <label className="user-box-label">Password</label>
          </div>
          <button type="submit" className="login-box-button">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

export default Login