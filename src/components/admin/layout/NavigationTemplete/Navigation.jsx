import { Nav } from '../NavIconTemplete/Nav'
import './Navigation.css'
import { VscDashboard } from "react-icons/vsc";
import { HiChevronLeft } from "react-icons/hi";
import { BiMoney, BiUser } from "react-icons/bi";
import { useState } from 'react';
import { Link } from 'react-router-dom';


function Navigation() {


  const [nav, setNav] = useState(false);

  


  return (
    <div className={`navigation ${nav && "active"}`}>
      <div className={`menu ${nav && "active"}`} onClick={
        () => {
          setNav((prevState) => !prevState);
        }}>
        <HiChevronLeft className="menu-icon" />
      </div>
      <header>
        <div className="profile">
          <img className='profile-img' src="https://media.licdn.com/dms/image/C5103AQHMfYmDL6OLuw/profile-displayphoto-shrink_800_800/0/1526486531900?e=2147483647&v=beta&t=CqbG-GzVt_ymW93n641cTZFvbaxMpWXrzuO4q1XPy3E" alt="Ziadul" />
        </div>
        <span>Ziadul</span>
      </header>

      <Nav title="Dashboard" Icon={VscDashboard}></Nav>
      <div className="divider">
      </div>
      
      <Link to="/admin/user"><Nav title="User" Icon={BiUser}></Nav></Link>
      <Link to="/admin/meal"><Nav title="Meal" Icon={BiUser}></Nav></Link>
      <Link to="/admin/expenditure"><Nav title="Expenditure" Icon={BiMoney}></Nav></Link>
    </div>
  )
}

export default Navigation