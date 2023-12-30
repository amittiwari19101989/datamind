import React from 'react';
import logo from "../../assets/logo.svg"
import "./style.css";

const Header = () => {
  return (
    <>
        <div className='header-section'>
          <div className='container'>
            <div className='row'>
              <div className='col-12'>
                <div className='m-header-parent'>
                  <img src={logo} alt="datamind" className='datamind-logo'/>
                  <span>Data Mind: <span className='text-red'> AI Storage Optimizer </span></span>
                  <img className='ib-logo' src='https://lh4.googleusercontent.com/5gWomdwZnzTT5kjYPNLNMZRGNa7zhUyROskgaZtTtIlDEOQdXqvEQRUIBZ65mA3wNgGl3V4bA8_1iPlIJykvf8Y=w16383' alt='InfoBeans' />
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Header