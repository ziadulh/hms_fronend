import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../../contexts/loadder/UserContext';
import './User.css'
import { BiEditAlt } from "react-icons/bi";

const User = () => {

  const context = useContext(UserContext);   // using context
  const { users, getUsers, setUsers } = context;   // extracting value from context

  useEffect(() => {   // conmonentDidMount(work on document ready)
    getUsers();   // getting all users (implemented on User Context API)
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Email</td>
            <td>Role</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {(users).map((element) => {
            return <tr className="col-md-4" key={element.id}>
              <td>{element.id}</td>
              <td>{element.name}</td>
              <td>{element.email}</td>
              <td>{element.role}</td>
              <td><button> <BiEditAlt style={{ color: 'blue' }} /> </button></td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  )
}

export default User