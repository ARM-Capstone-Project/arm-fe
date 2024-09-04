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
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
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
            {/* Add other routes here */}
          </Routes>
        </main>
      </div>
    </div>
  </Router>
    // <Router>
    //   <div className="flex flex-col min-h-screen">
    //     <nav className="bg-white border-gray-200 light:bg-gray-900 shadow">
    //       <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
    //         <a href="/" className="flex items-center text-rose-700">
    //           <span className="self-center text-1xl font-semibold whitespace-nowrap dark:text-white">
    //             Alco Remote Monitoring
    //           </span>
    //         </a>
    //         {/* <RenderAuthLinks currentUser={currentUser} logOut={logOut} /> */}
    //       </div>
    //     </nav>
    //     <div className="boxed-container w-full px-2">
    //       <div className="flex-wrap lg:flex">
    //         <div className="w-full">
    //           <Routes>
    //             <Route path="/" element={<Dashboard />} />
    //             {/* <Route path="/home" element={<Home />} />
    //             <Route path="/login" element={<Login />} />
    //             <Route path="/register" element={<Register />} />
    //             <Route path="/profile" element={<Profile />} /> */}
    //           </Routes>
    //         </div>
    //       </div>
    //     </div>
    //     <Footer />
    //   </div>
    // </Router>
  );
}

export default App