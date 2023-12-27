import React from 'react'
import "./style.css"

const SecondPage = () => {
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
            </div>
        </div>
    </>
  )
}

export default SecondPage