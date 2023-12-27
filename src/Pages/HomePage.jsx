import React from 'react'
import Header from '../component/Header/Header'
import "./style.css"
import Tablepage from '../component/MainContents/TablePages/Tablepage'
import { useLocation } from 'react-router-dom';
import Table from '../component/MainContents/Table/Table';

const HomePage = () => {

  const location = useLocation();
  const tableData = location.state ? location.state.tableData : [];

  return (
    <>
      <div className='wrapper'>        
        <div className='homePage-sec'>
          {/* <Header /> */}
          <div className='main-page-data'>
            <div className='container'>
              <Tablepage tableData={tableData}/>
            </div>
          </div>
        </div>  
      </div>       
    </>
  )
}

export default HomePage