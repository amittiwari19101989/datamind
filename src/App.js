import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage';
// import UploadPage from './Pages/UploadPage/UploadPage';
import FileUploadComponent from './Pages/UploadPage/FileUploadComponent';
import ResultPage from './Pages/UploadPage/ResultPage';
import SecondPage from './Pages/UploadPage/SecondPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<UploadPage />} />/ */}
          {/* <Route path="/" element={<FileUploadComponent />} /> */}
          <Route path="/" element={<HomePage />} /> 
          <Route path='/fileuploadcomponent' element={<FileUploadComponent />} />
          {/* <Route path='/result' element={<ResultPage />} /> */}

          {/* <Route path='/secondpage' element={<SecondPage />} /> */}
          <Route path="/optimizer/:host" element={<SecondPage />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
