import React from 'react';
import logo from "../../assets/logo.svg"
import "./style.css";

const Footer = () => {
  return (
    <>
        <div className='footer-section'>
          <div className='container'>
            <div className='row'>
              <div className='col-12'>
                <div className='m-footer-parent'>
                 <img alt='logo' src='https://lh5.googleusercontent.com/MI5XHv3VNKSNLxajyHRw3pHJSqiBCifSQ5VP1hgV5lhGKfsnNv5Y05gifUvRKEEJEmlogX4k_khP5uL09r6zIqUzrU8Ng0Mi-6alP4WKF0EKVjv3' />
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