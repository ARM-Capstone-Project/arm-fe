import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import DeviceForm from './components/Device/DeviceForm';

function App() {
  return (
    <div>     
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/device-form">Device Form</Link>
          </li>
          <li>
            <Link to="/device-upd">Update Device Form</Link>
          </li>
        </ul>
      </nav> 
      <Routes>
        <Route
          path="/"
          element={
            <h1 className="text-xl font-bold text-rose-700">
              Alco Remote Monitoring
            </h1>
          }
        />
        <Route 
          path="/device-form/:deviceId" 
          element={<DeviceForm mode="view" />} // View mode
        />
        <Route 
          path="/device-upd/:deviceId" 
          element={<DeviceForm mode="edit" />} // Edit mode
        />
      </Routes>
    </div>
  );
}

export default App;