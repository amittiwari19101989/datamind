import React from 'react'
import Header from '../component/Header/Header'
import "./style.css"
import Tablepage from '../component/MainContents/TablePages/Tablepage'
import { useLocation } from 'react-router-dom';
import Table from '../component/MainContents/Table/Table';
import ResultPage from './UploadPage/ResultPage';

const HomePage = () => {

  const location = useLocation();
  const tableData = location.state ? location.state.tableData : [];

  return (
    <>
      <div className=''>        
        <div className='homePage-sec'>
          {/* <Header /> */}
        
              <ResultPage tableData={tableData}/>
              {/* <ResultPage /> */}
              {/* <Table /> */}
            
        </div>  
      </div>       
    </>
  )
}

export default HomePage