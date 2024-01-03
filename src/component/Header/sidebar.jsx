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
                            <Link to={`/`}><i class="bi bi-speedometer2"></i> <span>Home</span></Link>
                        </li>
                        <li>
                            <Link to={`/optimizer/AWS`}><i class="bi bi-amazon"></i> <span> AWS</span></Link>
                        </li>
                        <li>
                            <Link to={`/optimizer/GCP`}><i class="bi bi-cloud-check"></i> <span>GCP</span></Link>
                        </li>
                        <li>
                            <Link to={`/optimizer/On-prem`}><i class="bi bi-database"></i> <span>On-prem</span></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </>
  )
}

export default Sidebar