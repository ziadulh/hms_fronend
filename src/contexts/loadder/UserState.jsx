import React, { useState } from 'react'
import UserContext from './UserContext'

const LoaderState = (props) => {
    //root url
    const url_local = process.env.REACT_APP_ROOT_URL;
  let [users, setUsers] = useState({})

  //get users 
  const getUsers = async () => {
    try {
      // setIsLoaderEnable(true);
      let page = 0;
      let limit = 1;
      const response = await fetch(url_local + `api/users/?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth_token': localStorage.getItem('auth-token')
        },
      });

      // converting response to json
      let json = await response.json();
      console.log(json);
    } catch (error) {
      // toast.error("Oops! Something went wrong.");
    } finally {
      // setIsLoaderEnable(false);
    }
  }
  return (
    <div>
        <UserContext.Provider value={{users, setUsers, getUsers}}>
            {props.children}
        </UserContext.Provider>
    </div>
  )
}

export default LoaderState