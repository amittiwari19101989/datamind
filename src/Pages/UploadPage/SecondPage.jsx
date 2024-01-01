import React from 'react'
import "./style.css"
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';  
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Header from '../../component/Header/Header';
import { Col, Row } from 'react-bootstrap';
import Footer from '../../component/Header/Footer';


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
            </div>

            <div className='rightSizingBtn col-12 mb-3'>
              <button >Right Sizing</button>
            </div>

              <Col md={6}>
              <div className='m-custom-hostCountTable'>              
                <h2 className='tableHeading'>RightSizing <span className='text-red'> Within Hosts </span></h2>
                <table className='m-custom-table'>
                  <thead>
                    <tr>
                      <th>VM ID</th>
                      <th>Updated Ram</th>
                      <th>Updated Storage</th>
                      <th>Updated Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Vm1</td>
                      <td>1</td>
                      <td>5</td>
                      <td>$100</td>
                    </tr>
                    <tr>
                      <td>Vm1</td>
                      <td>6</td>
                      <td>5</td>
                      <td>$100</td>
                    </tr>
                    <tr>
                      <td>Vm1</td>
                      <td>20</td>
                      <td>5</td>
                      <td>$100</td>
                    </tr>
                    <tr>
                      <td>Vm1</td>
                      <td>10</td>
                      <td>6</td>
                      <td>$100</td>
                    </tr>
                    <tr>
                      <td>Vm1</td>
                      <td>10</td>
                      <td>8</td>
                      <td>$100</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              </Col>
              <Col md={6}>
              <div className='m-custom-hostCountTable'>              
              <h2 className='tableHeading'>RightSizing <span className='text-red'> Across Hosts</span> </h2>
              <table className='m-custom-table'>
                <thead>
                  <tr>
                  <th>VM ID</th>
                      <th>Recommendated Host</th>
                      <th>Updated Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>VM1</td>
                    <td>GCP</td>
                    <td>$100</td>
                  </tr>
                  <tr>
                  <td>VM1</td>
                    <td>On Premise</td>
                    <td>$100</td>
                  </tr>
                  <tr>
                  <td>VM1</td>
                    <td>On Premise</td>
                    <td>$100</td>
                  </tr>
                  <tr>
                  <td>VM1</td>
                    <td>On Premise</td>
                    <td>$100</td>
                  </tr>
                  <tr>
                  <td>VM1</td>
                    <td>On Premise</td>
                    <td>$100</td>
                  </tr>
                </tbody>
              </table>
            </div>  
              </Col>

            <div className='col-12'>
              <div className='m-custom-finalizeDataSec'>
                <div className='leftList'>
                  <div className='costList'>
                      <h2 className='tableHeading'>When not moving then <span className='text-red'> right size cost</span></h2>
                      <ul className='m-costListSec'>
                        <li><span className='iconsSec'><IoMdCheckmarkCircleOutline /> </span> <span>vm id reduce ram to 4</span></li>
                        <li><span className='iconsSec'><IoMdCheckmarkCircleOutline /> </span> <span>vm id reduce ram to 4</span></li>
                        <li><span className='iconsSec'><IoMdCheckmarkCircleOutline /> </span> <span>vm id reduce ram to 4</span></li>
                        <li><span className='iconsSec'><IoMdCheckmarkCircleOutline /> </span> <span>vm id reduce ram to 4</span></li>
                        <li><span className='iconsSec'><IoMdCheckmarkCircleOutline /> </span> <span>vm id reduce ram to 4</span></li>
                      </ul>
                  </div>
                </div>
                <div className='graphSec'>
                <h2 className='tableHeading mb-4 text-center'>Graph <span className='text-red'> data</span></h2>
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
                      className="m-graphSec-pie-chart"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="totalcost" fill="#83af34" activeBar={<Rectangle fill="#83af34"  />} />
                      <Bar dataKey="whenmove" fill="#ea1b3d" activeBar={<Rectangle fill="#ea1b3d" />} />
                      <Bar dataKey="whennotmove" fill="#5b6dd9" activeBar={<Rectangle fill="#5b6dd9"  />} />
                  </BarChart>
                </div>
                <div className='leftList'>
                  <div className='costList'>
                      <h2 className='tableHeading'>When not moving then <span className='text-red'> right size cost</span></h2>
                      <ul className='m-costListSec'>
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
        </div>
        <Footer />
    </>
  )
}

export default SecondPage