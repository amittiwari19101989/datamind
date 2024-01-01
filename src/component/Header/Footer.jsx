import React from 'react';
import logo from "../../assets/logo.svg";
import tick from "../../assets/ib-tick.png";
import "./style.css";

const Footer = () => {
  return (
    <>
        <div className='footer-section'>
          <div className='container'>
            <div className='row'>
              <div className='col-12'>
                <div className='m-footer-parent'>
                 <img alt='logo' src={tick} />
                  <span><span>© Copyright 2024 Data Mind InfoBeans </span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Footer