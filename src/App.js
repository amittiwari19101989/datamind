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
          {/* <Route path="/" element={<FileUploadComponent />} />
          <Route path="/homepage" element={<HomePage />} /> */}
          {/* <Route path='/' element={<FileUploadComponent />} /> */}
        <Route path='/' element={<ResultPage />} />
        <Route path='/secondpage' element={<SecondPage />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
