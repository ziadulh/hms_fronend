import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loader from '../loader/Loader';
import { toast } from 'react-toastify';
import './Login.css'
import LoaderContext from '../../contexts/loadder/LoaderContext';

const Login = () => {

  // useNavigate to navigate url 
  const navigate = useNavigate();

  //root url 
  const url_local = process.env.REACT_APP_ROOT_URL;

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

  // context from LoaderContext
  const context = useContext(LoaderContext);
  const { isLoaderEnable, setIsLoaderEnable } = context;

  // login 
  const handleLogin = async (e) => {
    e.preventDefault(); //preventing form submission
    try {
      setIsLoaderEnable(true);
      const response = await fetch(url_local + "api/authentication/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        //sending body
        body: JSON.stringify({ email: loginData.email, password: loginData.password })
      });

      // converting response to json
      let json = await response.json();

      if (json.status === true) {
        localStorage.setItem('auth-token', json.authToken);
        navigate('/')
        json.success.forEach(el => {
          toast.success(el.msg);
        });
      } else {
        json.errors.forEach(el => {
          toast.error(el.msg);
        });
      }
    } catch (error) {
      toast.error("Oops! Something went wrong.");
    } finally {
      setIsLoaderEnable(false);
    }

  }


  return (
    <>
      {isLoaderEnable && <Loader />}
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