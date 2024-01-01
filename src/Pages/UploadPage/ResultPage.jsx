// ResultPage.js
import React, { useState } from 'react';
import "./style.css";
import video from "../../assets/bg.mp4"
import { Link, useNavigate } from 'react-router-dom';
import { PieChart, Pie, Tooltip } from "recharts";
import Header from '../../component/Header/Header';
import Footer from '../../component/Header/Footer';



const ResultPage = ({ tableData }) => {

  const history = useNavigate();
    // const location = useLocation();
    // const tableData = location.state

    console.log(" table data from reul page",tableData)// table data from reul page

    const [firstTableData, setFirstTableData] = useState(tableData)
  

    const data = Object.entries(firstTableData.cloud_count).map(([name, value], index) => ({
      name,
      value,
      fill: ['#83af34', '#ea1b3d', '#5b6dd9'][index]
    }));

    const costdata = Object.entries(firstTableData.cloud_total_cost).map(([name, cost], index) => ({
      name,
      cost,
      fill: ['#83af34','#ea1b3d', '#5b6dd9' ][index]
    }));  
    

    console.log("cost",costdata) 

  return (
    <>
      <Header />
      <div className="container pt-3 pb-3">
       
        {/* <pre>{JSON.stringify(tableData.first_page_data, null, 2)}</pre> */}
        <div className='FirstPage'>
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
                            <Link className='hostName' to={`/secondpage/${host}`}>{host}</Link>
                              {/* {console.log("host-check", host)} */}
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
                            dataKey="value"
                            outerRadius={100}
                            innerRadius={50}
                          // fill={data.colo}}
                          label={({ name, value }) => `${name}: ${value}`}
                          fill={data.map(item => item.fill)}
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
                              data={costdata}
                              dataKey="cost"
                              outerRadius={100}
                            innerRadius={50}
                              //fill="green"
                              label={({ name, cost }) =>
                                  `${name}: ${cost}`
                              }
                              fill={costdata.map(item => item.fill)}
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
