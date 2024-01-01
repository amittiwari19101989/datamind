import React, { useState, useEffect } from 'react'
import axios from 'axios';
import "./style.css"
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Header from '../../component/Header/Header';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Footer from '../../component/Header/Footer';


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
        console.log("fetchedData.cloud_movement_table", fetchedData.cloud_movement_table)
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
      <div className='wrapper'>
        <Header />
        <div className='custContainer'>
          <div className='hostCountTableSec'>
            <div className='hostCountTable'>
              <h2 className='tableHeading'>Existing Clusters on Host</h2>
              <table>
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

            <div className='rightSizingBtn'>
              <button onClick={fetchData} >Right Sizing</button>
            </div>

            <div className='updatedTable'>
              {isLoading && <p>Loading...</p>}
              {error && <p>Error: {error.message}</p>}
              {rightdata.length > 0 && (
                <Row>
                  <Col md={6}>
                    <div className='hostCountTable'>

                      <h2 className='tableHeading'>RightSizing Within Hosts</h2>
                      <table>
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
                  <Col md={6}>
                    <div className='hostCountTable'>
                      <h2 className='tableHeading'>RightSizing Across Hosts</h2>
                      <table>
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




            <div className='finalizeDataSec'>
            {isLoading && <p>Loading...</p>}
              {error && <p>Error: {error.message}</p>}
              

            {suggestionslist.length > 0 && 
              <div className='leftList'>
                <div className='costList'>
                  <h4 className='listHeading'>Recommendations on Same Host</h4>
                  <ul>
                    {suggestionslist.map((suggestion, index) => (
                      <li key={index}><span className='iconsSec'><IoMdCheckmarkCircleOutline/> </span> <span className='listcontent'>{suggestion}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            }
            {graphdata.length > 0 && graphdata[0].CurrentCost !== undefined && graphdata[0].CrossHostRightSizing !== undefined && graphdata[0].SameHostRightSizing !== undefined &&
              <div className='graphSec'>
                <BarChart
                  width={500}
                  height={300}
                  data={graphdata}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="CurrentCost" fill="#2C71AA" activeBar={<Rectangle fill="#003a6a" />} />
                  <Bar dataKey="CrossHostRightSizing" fill="#8F5D8E" activeBar={<Rectangle fill="#9f009b" />} />
                  <Bar dataKey="SameHostRightSizing" fill="#C9305C" activeBar={<Rectangle fill="#9f0330" />} />
                </BarChart>
              </div>
            }
            {movedvmList.length > 0 && 
              <div className='rightList'>
                <div className='costList'>

                  <h4 className='listHeading'>Host change Recommendations</h4>
                  <ul>
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

      <Footer />
    </>
  )
}

export default CloudMovementTable;