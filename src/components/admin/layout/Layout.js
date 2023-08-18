import React from 'react'
import Navigation from './NavigationTemplete/Navigation'
// import User from '../user/User'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <div style={{width: "220px", float: "left"}}>
        <Navigation/>
      </div>
      <div>
      <Outlet />
      </div>
    </>
  )
}

export default Layout