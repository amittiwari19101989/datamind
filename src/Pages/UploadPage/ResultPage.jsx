// ResultPage.js
import React from 'react';
import "./style.css";
import video from "../../assets/bg.mp4"
import { Link } from 'react-router-dom';

const ResultPage = ({ tableData }) => {
  return (
    <div className='wrapper'>
      {/* <pre>{JSON.stringify(tableData.first_page_data, null, 2)}</pre> */}
      <div className='FirstPage'>
        {/* <video src={video}></video> */}
        <div className='firstPageSec'>
          <div className='container-sec'>
            <div className='hostCountTableSec'>
              <div className='hostCountTable'>              
                <h2 className='tableHeading'>Host Data</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Host</th>
                      <th>Count</th>
                      <th>Total Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td> <Link to="/secondpage"> AWS</Link></td>
                      <td>10</td>
                      <td>100$</td>
                    </tr>
                    <tr>
                      <td>GCP</td>
                      <td>10</td>
                      <td>130$</td>
                    </tr>
                    <tr>
                      <td>On-prem</td>
                      <td>15</td>
                      <td>120$</td>
                    </tr>
                    <tr>
                      <td>Azure</td>
                      <td>9</td>
                      <td>80$</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className='chartSec'>
           
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
