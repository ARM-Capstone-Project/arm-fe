import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "../src/components/Header.tsx";
import Sidebar from "../src/components/Sidebar.tsx";
import Dashboard from "../src/pages/dashboard/Dashboard.page";
import DevicePage from "./pages/device/DeviceSummary.page.tsx";
import AssignDevices from "../src/pages/device/AssignDevices.page";
import Notification from "../src/pages/notification/Notification.page";
import UserList from "../src/pages/users/UserList.page";
import UserDetails from "./pages/users/UserDetails.page.tsx";
import CreateUser from "../src/pages/users/CreateUser.page";
import AnalyticsPage from "../src/pages/analytics/Analytics.page";
import CompanyHierarchy from "../src/pages/company/CompanyHierarchy.page";

import { Routes, Route } from "react-router-dom";
import DeviceDetail from "./pages/device/DeviceDetail.page.tsx";
import UpdDeviceForm from "./components/UpdDeviceForm";
import DevicesList from "./pages/device/DevicesList.page.tsx";
import CreateDevice from "./components/CreateDevice";
import ZoneList from "./pages/zone/ZoneList.page.tsx";
import ZoneForm from "./pages/zone/ZoneForm.page.tsx";
import Register from "./pages/register/Register.page.tsx";
import Login from "./pages/login/Login.page.tsx";

import * as AuthService from "./services/auth.service";

function App() {
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);
  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      setCurrentUser(currentUser);
      console.log(currentUser);
    }
  }, []);

  if (!currentUser) {
    // If the user is not logged in, show the login page only
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    );
  }

  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  return (
    //<Router>
    <div className="flex min-h-screen">
      <Sidebar currentUser={currentUser} />
      <div className="flex-grow flex flex-col">
        <Header currentUser={currentUser} logOut={logOut} />
        <main className="flex-grow bg-gray-100 p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/devices" element={<DevicePage />} />
            <Route path="/zones" element={<ZoneList />} />
            <Route path="/zone/new" element={<ZoneForm />} />
            <Route path="/zones/:id" element={<ZoneForm />} />
            <Route path="/zones/:id/edit" element={<ZoneForm />} />
            <Route path="/notifications" element={<Notification />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/new_user" element={<CreateUser />} />
            <Route path="/assign_device" element={<AssignDevices />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/company" element={<CompanyHierarchy />} />
            <Route path="/deviceslist" element={<DevicesList />} />
            <Route path="/device-form" element={<DeviceDetail />} />
            <Route path="/device-upd" element={<UpdDeviceForm />} />
            <Route path="/device-create" element={<CreateDevice />} />
            <Route path="/users/:userId" element={<UserDetails />} />
            {/* Add other routes here */}
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
