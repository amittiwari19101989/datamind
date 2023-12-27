import React from 'react';
import logo from "../../assets/logo2.png"
import "./style.css";

const Header = () => {
  return (
    <>
        <div className='header-sec'>
          <div className='container'>
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