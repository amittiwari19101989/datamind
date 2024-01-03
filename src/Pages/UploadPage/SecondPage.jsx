import React, { useState, useEffect } from 'react'
import axios from 'axios';
import "./style.css"
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Header from '../../component/Header/Header';
import { Col, Row } from 'react-bootstrap';
import Footer from '../../component/Header/Footer';
import { useParams } from 'react-router-dom';
import Sidebar from '../../component/Header/sidebar';


function CloudMovementTable() {
  const [data, setData] = useState([]);
  const [rightdata, setRightData] = useState([]);
  const [suggestionslist, setsuggestionslist] = useState([]);
  const [movedvmList, setmovedvmlist] = useState([]);
  const [graphdatavalue, setgraphdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const graphdata = [
    {
      name: 'Cost Difference',
      CurrentCost: graphdatavalue.filtered_total_cost_sum,
      CrossHostRightSizing: graphdatavalue.filtered_updated_cost_moved,
      SameHostRightSizing: graphdatavalue.filtered_updated_right_sized_cost,

    },
  ];

  const { host } = useParams();
  const formattedHost = host.replace("-", '_').toLowerCase(); 


  useEffect(() => {    
    fetch(`http://127.0.0.1:3500/api/predict/${formattedHost}`)
      .then(response => response.json())
      .then(fetchedData => {setData(fetchedData.cloud_movement_table)
        console.log("fetchedData.cloud_movement_table", fetchedData.cloud_movement_table);
        setRightData([]);
        setsuggestionslist([]);
        setmovedvmlist([]);
        setgraphdata({});
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [host]);



  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:3500/api/predict/${formattedHost}/right_size`); // Replace with your endpoint
      setRightData(response.data.cloud_right_size_table); // Access the specific data array
      setsuggestionslist(response.data.suggestions_list.right_sized_vm);
      setmovedvmlist(response.data.suggestions_list.moved_vm_data);
      setgraphdata(response.data.graph_data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("graphdata:", graphdata);

  return (
    <>
      <div className="m-custom-layout-section">
      <div className="m-sidebar-section">
        <div id="sidebar">
          <Sidebar />
        </div>
      </div>
      <div className='m-custom-root'>
        <Header />
        <div className='second-page-parent-section'>
          {/* <Header /> */}
          <div className='container'>
          <div className='hostCountTableSec second-page-shild-section row'>
            <div className='col-12'>
              <div className='second-page-table-section m-custom-hostCountTable'>              
                <h2 className='tableHeading'>Existing Clusters <span className='text-red'> on Host</span></h2>
                <table className='m-custom-table'>
                  <thead>
                    <tr>
                      <th>VM ID</th>
                      <th>Host</th>
                      <th>RAM</th>
                      <th>Storage</th>
                      <th>Storage Utilization</th>
                      <th>Cost Per Year ($)</th>
                    </tr>
                  </thead>
                  <tbody>
                  {data.map(row => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row['cloud provider']}</td>
                      <td>{row['Total Ram']}</td>
                      <td>{row['Total CPU']}</td>
                      <td>{row['Cpu Utilization']} %</td>
                      <td>${Math.floor(row['Cost Per Year ($)'])}</td>
                    </tr>
                  ))}
                </tbody>
                </table>
              </div>
            </div>

            <div className='rightSizingBtn col-12 mb-3'>
              <button onClick={fetchData}>Right Sizing</button>
            </div>
            
            <div className=''>
              {isLoading && <p>Loading...</p>}
              {error && <p>Error: {error.message}</p>}
              {rightdata.length > 0 && (
                <Row>
                  <Col md={7}>
                    <div className='m-custom-hostCountTable min-height-295'>

                      <h2 className='tableHeading'>RightSizing <span className='text-red'>Within Hosts</span></h2>
                      <table className='m-custom-table'>
                        <thead>
                          <tr>
                            <th>id</th>
                            <th>Cloud Provider</th>

                            <th>Recommended RAM</th>

                            <th>Recommended Storage (GB)</th>
                            <th>Updated Cost ($)</th>
                            <th>Predictions</th>

                          </tr>
                        </thead>
                        <tbody>
                          {rightdata.map((item) => (
                            <tr key={item.id}>
                              <td>{item.id}</td>
                              <td>{item['cloud provider']}</td>
                              <td>{item['Updated Ram']}</td>
                              <td>{item['Updated CPU']}</td>
                              <td>${Math.floor(item['Updated Cost'])}</td>
                              <td>{item.Predictions}</td>

                            </tr>
                          ))}
                        </tbody>
                      </table>

                    </div>
                  </Col>
                  <Col md={5}>
                    <div className='m-custom-hostCountTable min-height-295'>
                      <h2 className='tableHeading'>RightSizing <span className='text-red'> Across Hosts</span></h2>
                      <table className='m-custom-table'>
                        <thead>
                          <tr>
                            <th>VM ID</th>
                            <th>Recommendated Host</th>
                            <th>Updated Cost</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map(row => (
                            <tr key={row.id}>
                              <td>{row.id}</td>
                              <td>{row['where to move']}</td>

                              <td>${Math.floor(row['Updated Cost'])}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Col>
                </Row>

              )}
            </div>

            <div className='col-12'>
              <div className='m-custom-finalizeDataSec'>
              {isLoading && <p>Loading...</p>}
              {error && <p>Error: {error.message}</p>}
              

            {suggestionslist.length > 0 && 
                <div className='leftList min-height-355'>
                  <div className='costList'>
                      <h2 className='tableHeading'>RightSizing Within Host <span className='text-red'> Recommendations</span></h2>
                      <ul className='m-costListSec'>
                      {suggestionslist.map((suggestion, index) => (
                        <li key={index}><span className='iconsSec'><IoMdCheckmarkCircleOutline/> </span> <span className='listcontent'>{suggestion}</span></li>
                      ))}
                      </ul>
                  </div>
                </div>
            }
                {graphdata.length > 0 && graphdata[0].CurrentCost !== undefined && graphdata[0].CrossHostRightSizing !== undefined && graphdata[0].SameHostRightSizing !== undefined &&
                <div className='graphSec'>
                <h2 className='tableHeading mb-4 text-center'>Graph <span className='text-red'> data</span></h2>
                  <BarChart
                      width={400}
                      height={300}
                      data={graphdata}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                      className="m-graphSec-pie-chart"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="CurrentCost" fill="#83af34" activeBar={<Rectangle fill="#83af34"  />} />
                      <Bar dataKey="CrossHostRightSizing" fill="#ea1b3d" activeBar={<Rectangle fill="#ea1b3d" />} />
                      <Bar dataKey="SameHostRightSizing" fill="#5b6dd9" activeBar={<Rectangle fill="#5b6dd9"  />} />
                  </BarChart>
                </div>
              }
                {movedvmList.length > 0 && 
                <div className='leftList min-height-355'>
                  <div className='costList'>
                      <h2 className='tableHeading'>RightSizing Across Hosts <span className='text-red'>Recommendations</span></h2>
                      <ul className='m-costListSec'>
                      {movedvmList.map((suggestion, index) => (
                        <li key={index}><span className='iconsSec'><IoMdCheckmarkCircleOutline/></span> <span className='listcontent'>{suggestion}</span></li>
                      ))}
                      
                      </ul>
                  </div>
                </div>
                }
              </div>           
            </div>
          </div>
        </div>
        </div>
        <Footer />
        </div>
        </div>
    </>
  )
}

export default CloudMovementTable;