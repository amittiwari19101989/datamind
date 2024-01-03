import React from 'react';
import logo from "../../assets/logo.svg";
import ibLogo from "../../assets/black-ib-logo.png"
import "./style.css";
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <>
        <div className='sidebar-parent-section'>
            <div className='m-sidebar-parent'>
                <div className='m-sidebar-logo'>
                    <img src={logo} alt="datamind" className='datamind-logo'/>
                </div>
                <div className='m-sidebar-list-section'>
                    <ul>
                        <li>
                            <Link to={`/`}>Home</Link>
                        </li>
                        <li>
                            <Link to={`/optimizer/AWS`}>AWS</Link>
                        </li>
                        <li>
                            <Link to={`/optimizer/GCP`}>GCP</Link>
                        </li>
                        <li>
                            <Link to={`/optimizer/On-prem`}>On-prem</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </>
  )
}

export default Sidebar