import React from 'react'
import "./style.css"
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';  
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Header from '../../component/Header/Header';
import { Col, Row } from 'react-bootstrap';


const SecondPage = () => {
  const data = [
    {
      name: 'Cost Difference',
      totalcost: 4000,
      whenmove: 2400,
      whennotmove: 3400,
      amt: 6400,
    },
    
  ];


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
                    <th>Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>VM1</td>
                    <td>AWS</td>
                    <td>1</td>
                    <td>10</td>
                    <td>10 %</td>
                    <td>$100</td>
                  </tr>
                  <tr>
                  <td>VM2</td>
                    <td>AWS</td>
                    <td>1</td>
                    <td>10</td>
                    <td>10 %</td>
                    <td>$100</td>
                  </tr>
                  <tr>
                  <td>VM3</td>
                    <td>AWS</td>
                    <td>1</td>
                    <td>10</td>
                    <td>10 %</td>
                    <td>$100</td>
                  </tr>
                  <tr>
                  <td>VM4</td>
                    <td>AWS</td>
                    <td>1</td>
                    <td>10</td>
                    <td>10 %</td>
                    <td>$100</td>
                  </tr>
                  <tr>
                  <td>VM5</td>
                    <td>AWS</td>
                    <td>1</td>
                    <td>10</td>
                    <td>10 %</td>
                    <td>$100</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className='rightSizingBtn'>
              <button >Right Sizing</button>
            </div>

            <div className='updatedTable'>
            <Row>
              <Col md={6}>
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
                      <td>AWS</td>
                      <td>10</td>
                      <td>100$</td>
                    </tr>
                    <tr>
                      <td>AWS</td>
                      <td>10</td>
                      <td>130$</td>
                    </tr>
                    <tr>
                      <td>AWS</td>
                      <td>15</td>
                      <td>120$</td>
                    </tr>
                    <tr>
                      <td>AWS</td>
                      <td>9</td>
                      <td>80$</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              </Col>
              <Col md={6}>
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
                    <td>AWS</td>
                    <td>10</td>
                    <td>100$</td>
                  </tr>
                  <tr>
                    <td>AWS</td>
                    <td>10</td>
                    <td>130$</td>
                  </tr>
                  <tr>
                    <td>AWS</td>
                    <td>15</td>
                    <td>120$</td>
                  </tr>
                  <tr>
                    <td>AWS</td>
                    <td>9</td>
                    <td>80$</td>
                  </tr>
                </tbody>
              </table>
            </div>  
              </Col>
            </Row>
               
              
            </div>


            

            <div className='finalizeDataSec'>
              <div className='leftList'>
                <div className='costList'>
                    <h4>When not moving then right size cost</h4>
                    <ul className='costListSec'>
                      <li><span className='iconsSec'><IoMdCheckmarkCircleOutline /> </span> <span>vm id reduce ram to 4</span></li>
                      <li><span className='iconsSec'><IoMdCheckmarkCircleOutline /> </span> <span>vm id reduce ram to 4</span></li>
                      <li><span className='iconsSec'><IoMdCheckmarkCircleOutline /> </span> <span>vm id reduce ram to 4</span></li>
                      <li><span className='iconsSec'><IoMdCheckmarkCircleOutline /> </span> <span>vm id reduce ram to 4</span></li>
                      
                    </ul>
                </div>
              </div>
              <div className='graphSec'>
                <BarChart
                    width={500}
                    height={300}
                    data={data}
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
                    <Bar dataKey="totalcost" fill="#2C71AA" activeBar={<Rectangle fill="#003a6a"  />} />
                    <Bar dataKey="whenmove" fill="#8F5D8E" activeBar={<Rectangle fill="#9f009b" />} />
                    <Bar dataKey="whennotmove" fill="#C9305C" activeBar={<Rectangle fill="#9f0330"  />} />
                </BarChart>
              </div>
              <div className='rightList'>
                <div className='costList'>
                    <h4>When not moving then right size cost</h4>
                    <ul className='costListSec'>
                      <li><span className='iconsSec'><IoMdCheckmarkCircleOutline /> </span> <span>vm id reduce ram to 4</span></li>
                      <li><span className='iconsSec'><IoMdCheckmarkCircleOutline /> </span> <span>vm id reduce ram to 4</span></li>
                      <li><span className='iconsSec'><IoMdCheckmarkCircleOutline /> </span> <span>vm id reduce ram to 4</span></li>
                      <li><span className='iconsSec'><IoMdCheckmarkCircleOutline /> </span> <span>vm id reduce ram to 4</span></li>
                      <li><span className='iconsSec'><IoMdCheckmarkCircleOutline /> </span> <span>vm id reduce ram to 4</span></li>
                     
                    </ul>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
    </>
  )
}

export default SecondPage