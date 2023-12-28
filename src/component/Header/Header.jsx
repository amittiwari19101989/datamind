import React from 'react';
import logo from "../../assets/logo.svg"
import "./style.css";

const Header = () => {
  return (
    <>
        <div className='header-sec'>
          <div className='custContainer'>
            <div className='header-content'>
              <div className='logo-sec'>
                <img src={logo} alt="" />
              </div>
              {/* <div className='welcome-sec'>
                <h3>Welcome UserName</h3>             
              </div> */}
            </div>
          </div>
        </div>
    </>
  )
}

export default Header