import React, {  useState } from 'react'
import TableOne from '../TableOne/TableOne';
import "./style.css";
import axios from 'axios';

const Tablepage = ({tableData}) => {

    const [updatedData, setUpdatedData] = useState("");
    const handleClick = async (e) => {
        e.preventDefault();    
    };
    
    
  return (
    <>
        <div className='TablePage-sec'>
            <div className='Table-page-Content'>
                <div className='staticTable-sec'>
                    <TableOne tableData={tableData} setUpdatedFunction={setUpdatedData}/>
                </div>
                <div className='rightSizingBtnSec'>                    
                    <button className='right-sizing-btn' onClick={handleClick}>
                        Right Sizing
                    </button>
                </div>
                
            </div>
        </div>
    </>
  )
}

export default Tablepage