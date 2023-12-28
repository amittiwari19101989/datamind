// FileUploadComponent.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import Header from '../../component/Header/Header';

const FileUploadComponent = () => {

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
    .then((res) => res.json())
    .then((resp) => {
      if (resp && resp.first_page_data) {
        const parsedData = resp.first_page_data;
        setTableData(parsedData);
        console.log(parsedData);
    
        // Navigate to the ResultPage with tableData
        navigate('/result', { state: { tableData: parsedData } });
      } else {
        console.log('Invalid server response:', resp);
        // Handle the case where the response is not as expected
      }
    })
  .catch((err) => {
    console.log('err: ', err);
  });
  };
  return (
    <div className='wrapper'>
      <div className='uploadPage'>
        {/* <Header /> */}
        <div className='uploadpage-content'>
          <div className='uploadPageForm'>
            <form onSubmit={handleSubmit}>
              <div className='file-input-container'>
                <div className='inputFileContent'>
                  <span className='svgImg'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" id="upload">
                      <path d="M398.1 233.2c0-1.2.2-2.4.2-3.6 0-65-51.8-117.6-115.7-117.6-46.1 0-85.7 27.4-104.3 67-8.1-4.1-17.2-6.5-26.8-6.5-29.5 0-54.1 21.9-58.8 50.5C57.3 235.2 32 269.1 32 309c0 50.2 40.1 91 89.5 91H224v-80h-48.2l80.2-83.7 80.2 83.6H288v80h110.3c45.2 0 81.7-37.5 81.7-83.4 0-45.9-36.7-83.2-81.9-83.3z"></path>
                    </svg>
                  </span>
                  <input type='file' id='fileupload' className='inputFileUpload' onChange={handleFileChange} />
                  <label htmlFor='fileupload' className='upload-btn-label'>
                    Insert File
                  </label>
                </div>
                <div className='fileNameUploaded'>
                  <span className='file-name'>{fileName? `${fileName} Inserted` : ""}  </span>                
                </div>
              </div>
              
              <div className='uploadBtn-sec'>
                <button type='submit' className='upload-btn'>
                    Upload file
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadComponent;
