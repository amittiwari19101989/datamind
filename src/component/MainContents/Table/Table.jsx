import React, { useEffect, useState } from 'react';
import Testfile from "./test_dataset.csv";
import Papa from 'papaparse';
import "../TablePages/style.css";

import axios from 'axios';

const Table = () => {
  const [tableData, setTableData] = useState([]);
  const [editableRow, setEditableRow] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [dynamicTableData, setDynamicTableData] = useState([]);
  const [pieBeforeImage, setPieBeforeImage] = useState(null);
  const [pieAfterImage, setPieAfterImage] = useState(null);
  const [graphCostPath, setGraphCostPath] = useState(null);

  const visibleColumns = [
    'id',
    'cloud provider',
    'Total Ram',
    'Total CPU',
    'Total Disk Space (GB)',
    'Cpu Utilization',
    'Network Latency (milliseconds)',
    'Cost per Day ($)',
    'Average IOPS',
    "where to move",
    "Updated Cost",
    "Updated latency"    
  ];

  const rowsToShow = 6;
  const visibleRows = tableData.slice(0, rowsToShow);
  console.log(visibleRows, "visibleRows");

  const isColumnVisible = (columnName) => {    
    return visibleColumns.includes(columnName);
  };

  useEffect(() => {
    const fetchParseData = async () => {
      Papa.parse(Testfile, {
        download: true,
        delimiter: ",",
        header: false,
        complete: (result) => {
          setTableData(result.data);
        },
      });
    };
    fetchParseData();    
  }, []);  
  
  const handleInputChange = (event) => {
    setEditValue(event.target.value);
  };

  const startEditing = (rowIndex, value) => {
    setEditableRow(rowIndex);
    setEditValue(value);
  };

  const handleSave = (rowIndex) => {
    const newData = [...tableData];
    newData[rowIndex][1] = editValue;
    setTableData(newData);
    setEditableRow(null);
    console.log(newData);
  };

  const convertToCSV = (data) => {
    const csvRows = data.map(row => row.join(','));
    return csvRows.join('\n');
  };

 
  const handleRightSizing = async () => {
    try {
      const csvString = convertToCSV(tableData);
      const blob = new Blob([csvString], { type: 'text/csv' });
      const file = new File([blob], 'tabledata.csv', { type: 'text/csv' });
  
      const formData = new FormData();
      formData.append('file', file);
      const uploadResponse = await axios.post("http://127.0.0.1:3500/api/predict", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
     const responseData = uploadResponse.data;

      if (responseData && responseData.data) {
        const parsedData = JSON.parse(responseData.data);

        if (Array.isArray(parsedData)) {
          console.log('Parsed Data:', parsedData);
          setDynamicTableData(parsedData);
          
          // Check if the response contains images
          if (responseData.pie_before && responseData.pie_after && responseData.graph_cost_path) {
            setPieBeforeImage(responseData.pie_before);
            setPieAfterImage(responseData.pie_after);
            setGraphCostPath(responseData.graph_cost_path);
          }
        } else {
          console.error('Invalid data format. Expected an array.');
        }
      } else {
        console.error('Invalid response format. Missing "data" property.');
      }
  
    } catch (error) {
      // Handle errors
      console.error('Error handling right sizing:', error);
    }
  };


  return (
    <>
      <div className='tablePage'>
        {/* Static Table */}
        <div className='staticTable'>
          <div className='tableSec'>
            <div className='tableContent'>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>cloud provider</th>
                    <th>Total Ram</th>
                    <th>Total CPU</th>
                    <th>Total Disk Space (GB)</th>
                    <th>Cpu Utilization</th>
                    <th>Network Latency (milliseconds)</th>
                    <th>Cost per Day ($)</th>
                    <th>Average IOPS</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                {visibleRows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex}>
                          {editableRow === rowIndex && cellIndex === 1 ? (
                            <input
                              type="text"
                              value={editValue}
                              onChange={handleInputChange}
                              className='editableInput'
                            />
                          ) : (
                            cell
                          )}
                        </td>
                      ))}
                      <td>
                        {editableRow !== rowIndex ? (
                          <button
                            className='editBtn'
                            onClick={() => startEditing(rowIndex, row[1])}
                          >
                            {/* <img src={editicon} alt="" /> */}
                          </button>
                        ) : (
                          <>
                            <button className='editBtn' onClick={() => handleSave(rowIndex)}>
                              {/* <img src={saveicon} alt="" /> */}
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}           
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='rightSizingBtnSec'>                    
          <button className='right-sizing-btn' onClick={handleRightSizing}>
            Right Sizing
          </button>
        </div>
        {/* Dynamic API Table */}
        <div className='dynamicApiTable'>
          <div className='tableSec'>
            <div className='tableContent'>
              <table>
                <thead>
                  <tr>
                    {visibleColumns.map((columnName) => (
                      <th key={columnName}>{columnName}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                {dynamicTableData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                  {visibleColumns.map((columnName, columnIndex) => (
                    <td key={columnIndex}>{row[columnName]}</td>
                  ))}
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Charst sections */}
        <div className='barchartSec'>
          <div className='pieChartSec'>          
            {pieBeforeImage && (
              <div className='pieBeforeImage pieImages'>
                <p className='chartHeading'>Cloud Estimation</p>
                <img src={`data:image/png;base64, ${pieBeforeImage}`} alt="Pie Chart Before" />
              </div>
            )}
            {graphCostPath && (
              <div className='graphCostPath pieImages'>
                <p className='chartHeading'>Cost Saving Per Day</p>
                <img src={`data:image/png;base64, ${graphCostPath}`} alt="graph Cost Path" />
              </div>
            )}
            {pieAfterImage && (
              <div className='pieAfterImage pieImages'>
                <p className='chartHeading'>Rightsized Cloud Estimation</p>
                <img src={`data:image/png;base64, ${pieAfterImage}`} alt="Pie Chart After" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
