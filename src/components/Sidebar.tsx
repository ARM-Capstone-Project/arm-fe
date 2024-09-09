// src/components/Sidebar.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faUsers, faCogs, faBell, faChartLine, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
//import logoImg from '../assets/Logo.jpg';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside className={`h-screen bg-stone-800 text-white transition-width duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="p-4 flex items-center justify-between bg-rose-700">
        <a href="/">
        <h1 className={`text-xl hover:text-white font-bold ${isOpen ? 'inline' : 'hidden'}`}>
          Alco Remote Monitoring
        </h1></a>
        <button onClick={toggleSidebar} className="nav_toggle rounded-full">
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      <nav className="">
        <ul>
          <li className="border-b border-gray-700">
            <Link to="/company" className="flex items-center p-4 hover:bg-gray-700">
              <FontAwesomeIcon icon={faBuilding} className="mr-3" />
              <span className={`${isOpen ? 'inline' : 'hidden'}`}>Company</span>
            </Link>
          </li>
          <li className="border-b border-gray-700">
            <Link to="/users" className="flex items-center p-4 hover:bg-gray-700">
              <FontAwesomeIcon icon={faUsers} className="mr-3" />
              <span className={`${isOpen ? 'inline' : 'hidden'}`}>Users</span>
            </Link>
          </li>
          <li className="border-b border-gray-700">
            <Link to="/devices" className="flex items-center p-4 hover:bg-gray-700">
              <FontAwesomeIcon icon={faCogs} className="mr-3" />
              <span className={`${isOpen ? 'inline' : 'hidden'}`}>Devices</span>
            </Link>
          </li>
          <li className="border-b border-gray-700">
            <Link to="/notifications" className="flex items-center p-4 hover:bg-gray-700">
              <FontAwesomeIcon icon={faBell} className="mr-3" />
              <span className={`${isOpen ? 'inline' : 'hidden'}`}>Notifications</span>
            </Link>
          </li>
          <li className="border-b border-gray-700">
            <Link to="/analytics" className="flex items-center p-4 hover:bg-gray-700">
              <FontAwesomeIcon icon={faChartLine} className="mr-3" />
              <span className={`${isOpen ? 'inline' : 'hidden'}`}>Analytics</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
