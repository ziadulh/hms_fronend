import React from 'react'
import Navigation from './NavigationTemplete/Navigation'
import User from '../user/User'

const Layout = () => {
  return (
    <>
      <div style={{width: "220px", float: "left"}}>
        <Navigation/>
      </div>
      <div>
        <User/>
      </div>
    </>
  )
}

export default Layout