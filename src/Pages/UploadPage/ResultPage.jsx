// ResultPage.js
import React, { useState } from 'react';
import "./style.css";
import video from "../../assets/bg.mp4"
import { Link } from 'react-router-dom';
import { PieChart, Pie, Tooltip } from "recharts";
import Header from '../../component/Header/Header';
import Footer from '../../component/Header/Footer';


const ResultPage = ({ tableData }) => {
    const data = [
      { name: "AWS", count: 400 ,fill: '#83af34'},
      { name: "GCP", count: 700, fill: "#ea1b3d" },
      { name: "On Prem", count: 200 ,fill: "#5b6dd9"},
      { name: "Azure", count: 1000 ,fill: "#477ba8"},
      ];
      const cost = [
        { name: "AWS", price: 400 ,fill: '#83af34'},
        { name: "GCP", price: 700, fill: "#ea1b3d" },
        { name: "On Prem", price: 200 ,fill: "#5b6dd9"},
        { name: "Azure", price: 1000 ,fill: "#477ba8"},
      ];

    const [firstTableData, setFirstTableData] = useState(tableData)

    console.log("tableData",tableData)

  return (
    <>
      <Header />
      <div className="container pt-3 pb-3">
        {/* <div class="custom-layout-video-section">
          <div className='video-sec custom-video-section'>
            <video className='' autoPlay loop muted>
                <source src={video} type='video/mp4' />            
            </video>  
          </div>
        </div> */}
        {/* <pre>{JSON.stringify(tableData.first_page_data, null, 2)}</pre> */}
        <div className='FirstPage'>
          {/* <video src={video}></video> */}
          <div className='firstPageSec'>
            <div className='container-sec'>
              <div className='firstPageContent-row row'>
                <div className='hostCountTableSec col-6 offset-3'>
                  <div className='m-custom-hostCountTable'>
                    <h2 className='tableHeading'>Host <span className='text-red'>Data</span></h2>
                    <table className='m-custom-table'>
                      <thead>
                        <tr>
                          <th>Host</th>
                          <th>Count</th>
                          <th>Total Cost</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(firstTableData.cloud_count).map(([host, count]) => (
                          <tr key={host}>
                            <td>
                              <Link to="/secondpage">{host}</Link>
                            </td>
                            <td>{count}</td>
                            {/* Assuming the cloud_total_cost object has the same structure */}
                            <td>{firstTableData.cloud_total_cost[host]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className='chartSec row'>  
                  <div className='col-10 offset-1 chartData-custom-parent'>            
                  <div className='chartData-custom'> 
                    <h2 className='tableHeading'>Current Host <span className='text-red'>Wise VMS</span></h2>               
                    {/* <h3 className='chartHeading-custom'>
                        Current Host Wise VMS
                    </h3> */}
                    <PieChart width={450} height={250} className='pieChart-custom'>
                        <Tooltip />
                        <Pie
                            data={data}
                            dataKey="count"
                            outerRadius={100}
                            innerRadius={50}
                          // fill={data.colo}}
                            label={({ name, count }) =>
                                `${name}: ${count}`
                            }
                        />
                    </PieChart>
                  </div>
                  <div className='chartData-custom'> 
                      <h2 className='tableHeading'>Current Host <span className='text-red'>Wise Cost</span></h2>               
                      {/* <h3 className='chartHeading-custom'>
                          Current Host Wise Cost
                      </h3> */}
                      <PieChart width={450} height={250} className='pieChart-custom'>
                          <Tooltip />
                          <Pie
                              data={cost}
                              dataKey="price"
                              outerRadius={100}
                            innerRadius={50}
                              //fill="green"
                              label={({ name, price }) =>
                                  `${name}: ${price}`
                              }
                          />
                      </PieChart>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
       <Footer />
    </>
  );
};

export default ResultPage;
