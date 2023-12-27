import React, { useEffect, useState } from 'react';
import Testfile from "./test_dataset.csv";
import Papa from 'papaparse';
import "../TablePages/style.css";
import editicon from "../../../assets/editicon.svg"
import saveicon from "../../../assets/saveicon.svg"
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

const Table = () => {
  const [tableData, setTableData] = useState([]);
  const [editableRow, setEditableRow] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [dynamicTableData, setDynamicTableData] = useState([]);
  

  const [pieChartData, setPieChartData] = useState({
    staticTable: {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF8C00', '#8A2BE2', '#4CAF50', '#FFD700'],
      }],
    },
    dynamicTable: {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF8C00', '#8A2BE2', '#4CAF50', '#FFD700'],
      }],
    },
  });

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

         

      // Extract data for the pie chart
            const staticTableData = tableData.map(row => ({ label: row[1], data: parseFloat(row[7]) }));
            const dynamicTableData = parsedData.map(row => ({ label: row['cloud provider'], data: parseFloat(row['Cost per Day ($)']) }));

            const staticCloudProviders = staticTableData.map(item => item.label);
            const dynamicCloudProviders = dynamicTableData.map(item => item.label);

            // Create a mapping of unique cloud provider names
            const uniqueCloudProviders = Array.from(new Set([...staticCloudProviders, ...dynamicCloudProviders]));

            // Map cloud provider names to unique indices
            const staticTableMappedData = staticTableData.map(item => ({ label: uniqueCloudProviders.indexOf(item.label), data: item.data }));
            const dynamicTableMappedData = dynamicTableData.map(item => ({ label: uniqueCloudProviders.indexOf(item.label), data: item.data }));

            // Set up initial state with empty arrays for datasets
            setPieChartData({
              staticTable: {
                labels: uniqueCloudProviders,
                datasets: [{
                  data: Array(uniqueCloudProviders.length).fill(0),
                  backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF8C00', '#8A2BE2', '#4CAF50', '#FFD700'],
                }],
              },
              dynamicTable: {
                labels: uniqueCloudProviders,
                datasets: [{
                  data: Array(uniqueCloudProviders.length).fill(0),
                  backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF8C00', '#8A2BE2', '#4CAF50', '#FFD700'],
                }],
              },
            });

            // Update the datasets with the actual data
            staticTableMappedData.forEach(item => {
              setPieChartData(prevState => ({
                staticTable: {
                  ...prevState.staticTable,
                  datasets: [{
                    data: prevState.staticTable.datasets[0].data.map((value, index) => (index === item.label ? value + item.data : value)),
                    backgroundColor: prevState.staticTable.datasets[0].backgroundColor,
                  }],
                },
                dynamicTable: prevState.dynamicTable, // Maintain the state for dynamicTable
              }));
            });

            dynamicTableMappedData.forEach(item => {
              setPieChartData(prevState => ({
                staticTable: prevState.staticTable, // Maintain the state for staticTable
                dynamicTable: {
                  ...prevState.dynamicTable,
                  datasets: [{
                    data: prevState.dynamicTable.datasets[0].data.map((value, index) => (index === item.label ? value + item.data : value)),
                    backgroundColor: prevState.dynamicTable.datasets[0].backgroundColor,
                  }],
                },
              }));
            });




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
                            <img src={editicon} alt="" />
                          </button>
                        ) : (
                          <>
                            <button className='editBtn' onClick={() => handleSave(rowIndex)}>
                              <img src={saveicon} alt="" />
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
          {/* Pie Chart for Static Table */}
          <div className='pie-ChartSec' style={{width:"300px", height:"300px"}}>
            <h2>Static Table Pie Chart</h2>
            <Pie data={pieChartData.staticTable} />
          </div>

          {/* Pie Chart for Dynamic Table */}
          <div className='pie-ChartSec' style={{width:"300px", height:"300px"}}>
            <h2>Dynamic Table Pie Chart</h2>
            <Pie data={pieChartData.dynamicTable} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
