import './App.css'
import Header from '../src/components/Header.tsx';
import Sidebar from '../src/components/Sidebar.tsx';
import Footer from '../src/components/Footer.tsx';
import Dashboard from "../src/pages/dashboard/Dashboard.page";
import DevicePage from "./pages/device/DeviceSummary.page.tsx";
import AssignDevices from "../src/pages/device/AssignDevices.page";
import Notification from "../src/pages/notification/Notification.page";
import UserList from "../src/pages/users/UserList.page";
import CreateUser from "../src/pages/users/CreateUser.page";
import AnalyticsPage from "../src/pages/analytics/Analytics.page";
import CompanyHierarchy from "../src/pages/company/CompanyHierarchy.page";
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import DeviceDetail from './pages/device/DeviceDetail.page.tsx';
import UpdDeviceForm from './components/UpdDeviceForm';
import DevicesList from "./pages/device/DevicesList.page.tsx";
import CreateDevice from './components/CreateDevice';
function App() {
  return (
    //<Router>
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-grow flex flex-col">
        <Header />
        <main className="flex-grow bg-gray-100 p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/devices" element={<DevicePage />} />
            <Route path="/notifications" element={<Notification />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/new_user" element={<CreateUser />} />
            <Route path="/assign_device" element={<AssignDevices />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/company" element={<CompanyHierarchy />} />
            <Route path="/deviceslist" element={<DevicesList />} />
            <Route path="/device-form/:deviceId" element={<DeviceDetail />} />
            <Route path="/device-upd/:deviceId" element={<UpdDeviceForm />} />// Edit mode
            <Route path="/device-create" element={<CreateDevice />} />
            {/* Add other routes here */}
          </Routes>
        </main>
      </div>
    </div>  
  );
}

export default App