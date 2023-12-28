import React from 'react'
import "./style.css"
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';  

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

            <div className='rightSizingBtn'>
              <button>Right Sizing</button>
            </div>

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

            <div className='finalizeDataSec'>
              <div className='leftList'></div>
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
                  <Bar dataKey="totalcost" fill="#2C71AA" activeBar={<Rectangle fill="#81b8e5"  />} />
                  <Bar dataKey="whenmove" fill="#8F5D8E" activeBar={<Rectangle fill="gold" />} />
                  <Bar dataKey="whennotmove" fill="#C9305C" activeBar={<Rectangle fill="blue"  />} />
                </BarChart>
              </div>
              <div className='rightList'></div>
            </div>
          </div>
        </div>
    </>
  )
}

export default SecondPage