import React, { useEffect, useState } from 'react';
import editicon from "../../../assets/editicon.svg"
import saveicon from "../../../assets/saveicon.svg"

const TableOne = ({tableData, setUpdatedFunction}) => {

  const [tData, setTadata] = useState(tableData);
  const [editableRow, setEditableRow] = useState(null);
  
  const rowsToShow = 5;

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
    
  ];

  useEffect(()=>{
    setUpdatedFunction(tData)
  },[tData])

  // console.log("tData", tData)

  const isColumnVisible = (columnName) => {    
    return visibleColumns.includes(columnName);
  };
  const visibleRows = tData.slice(0, rowsToShow);

  const startEditing = (rowIndex) => {
    setEditableRow(rowIndex);
  };

  const handleInputChange = (event, rowIndex, columnName) => {
    const newValue = event.target.value;

    setTadata((prevData) =>
      prevData.map((row, i) =>
        i === rowIndex ? { ...row, [columnName]: newValue } : row
      )
    );
   
   
  };

  const stopEditing = () => {
    setEditableRow(null);
  };

  return (
    <>      
      <div className='tableSec'>
        {/* <h2>Data Table</h2> */}
        <div id="csv_data">
          <div className='tableContent'>
           {/* <h3 className='tableHeading'>Without Right Sizing</h3> */}
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
                  </tr>
                </thead>
                <tbody>                 
                  {visibleRows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.entries(row).map(([key, value]) => (
                      isColumnVisible(key) && (
                        <td key={key}>
                          
                            value
                         
                        </td>
                      )
                    ))}
                    <td>
                      {editableRow !== rowIndex ? (
                        <button className='editBtn' onClick={() => startEditing(rowIndex)}>
                          <img src={editicon} alt="" />
                        </button>
                      ) : (
                        <button className='editBtn' onClick={stopEditing}>
                            <img src={saveicon} alt="" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableOne;
