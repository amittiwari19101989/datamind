// FileUploadComponent.js
import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import TableOne from '../../component/MainContents/TableOne/TableOne';

const FileUploadComponent = () => {
  const [tableData,setTableData] = useState();
  const formData = new FormData();
  
  const handleSubmit = (e)=>{
    e.preventDefault();
    let fileData = document.getElementById("fileupload");
    formData.append("file", fileData.files[0]);
    fetch("http://127.0.0.1:3500/api/predict",{
      method:"POST",
      // "Content-Type":"multipart/form-data",
      body:formData
    })
    .then((res)=>{
        console.log("res: ",res);
        return res.json();
    }).then((resp)=>{
      setTableData(JSON.parse(resp.data));
      console.log("data-> ",JSON.parse(resp.data))
    }).catch((err)=>{
      console.log("err: ",err)
    })
  };

  
  return (
    <>
  <form onSubmit={handleSubmit}>

    <div>
      <input type="file" id="fileupload" />
      <button id="upload" value="upload" >Upload File</button>

    </div>
  </form>
    <div id='csv_data'>
    {tableData.length > 0 ? (
        <table>
          <thead>
            <tr>
              {Object.keys(tableData[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(row).map((value, columnIndex) => (
                  <td key={columnIndex}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No table data available.</p>
      )}
    </div>
    </>
  )
}

export default FileUploadComponent;





const [tableData, setTableData] = useState([]);
const [fileName, setFileName] = useState('');
const navigate = useNavigate();
const formData = new FormData();

const handleFileChange = (e) => {
  const file = e.target.files[0];
  setFileName(file.name);
};

const handleSubmit = (e) => {
  e.preventDefault();
  const fileInput = document.getElementById('fileupload');
  formData.append('file', fileInput.files[0]);

  fetch('http://127.0.0.1:3500/api/predict', {
    method: 'POST',
    body: formData,
  })
    .then((res) => {
      return res.json();
    })
 
    .then((resp) => {
      const parsedData = JSON.parse(resp.data);
      setTableData(parsedData);
      
      navigate('/homepage', { state: { tableData: parsedData } });
      console.log('data-> ', parsedData);
    })
    .catch((err) => {
      console.log('err: ', err);
    });
};
