import Device from './component/Device';
import Header from './component/Header';
import Log from './component/Log'
import Add from './component/Add'
import Edit from './component/Edit'
import Employee from './component/Employee';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    
    <BrowserRouter>
    <Header />
      

      <Routes>
        
        <Route path="/" element={<Device />} />
        <Route path="/log" element={<Log />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/add" element={<Add />} />
        <Route path="/update/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
