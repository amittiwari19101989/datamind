// ResultPage.js
import React, { useState } from 'react';
import "./style.css";
import video from "../../assets/bg.mp4"
import { Link } from 'react-router-dom';
import { PieChart, Pie, Tooltip } from "recharts";


const ResultPage = ({ tableData }) => {
    const data = [
      { name: "AWS", count: 400 ,fill: '#57c0e8'},
      { name: "GCP", count: 700, fill: "#FF6565" },
      { name: "On Prem", count: 200 ,fill: "#e69138"},
      { name: "Azure", count: 1000 ,fill: "purple"},
      ];
      const cost = [
        { name: "AWS", price: 400 ,fill: '#57c0e8'},
        { name: "GCP", price: 700, fill: "#FF6565" },
        { name: "On Prem", price: 200 ,fill: "#e69138"},
        { name: "Azure", price: 1000 ,fill: "purple"},
      ];

    const [firstTableData, setFirstTableData] = useState(tableData)

    console.log("tableData",tableData)

  return (
    <>
      <div className="main-wrapper" >
        <div class="custom-layout-video-section">
          <div className='video-sec custom-video-section'>
            {/* <video className='' autoPlay loop muted>
                <source src={video} type='video/mp4' />            
            </video>   */}
          </div>
        </div>
        {/* <pre>{JSON.stringify(tableData.first_page_data, null, 2)}</pre> */}
        <div className='FirstPage'>
          {/* <video src={video}></video> */}
          <div className='firstPageSec'>
            <div className='container-sec'>
              <div className='firstPageContent'>
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
                <div className='chartSec'>              
                  <div className='chartData'>                
                    <h3 className='chartHeading'>
                        Current Host Wise VMS
                    </h3>
                    <PieChart width={450} height={250}>
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
                  <div className='chartData'>                
                      <h3 className='chartHeading'>
                          Current Host Wise Cost
                      </h3>
                      <PieChart width={450} height={250}>
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
       
    </>
  );
};

export default ResultPage;
