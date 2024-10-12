// src/components/Sidebar.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faUsers, faCogs, faBell, faChartLine, faBars, faMap } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import logoImg from '../assets/Logo.jpg';
import ListItem from './sidebar/ListItem';
import isAdmin from '../common/Helpers.jsx';
const Sidebar= ({ currentUser }) => {
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
      <nav>
        <ul>
          {/* <ListItem
            to="/company"
            icon={faBuilding}
            text="Company"
            isOpen={isOpen}
          /> */}
          {/* {
          isAdmin(currentUser) && (
            <> */}
              <ListItem
                to="/users"
                icon={faUsers}
                text="Users"
                isOpen={isOpen}
              />
            {/* </>
          )
          
          } */}
          
          <ListItem
            to="/devices"
            icon={faCogs}
            text="Devices"
            isOpen={isOpen}
          />
          <ListItem
            to="/zones"
            icon={faMap}
            text="Zones"
            isOpen={isOpen}
          />
          <ListItem
            to="/notifications"
            icon={faBell}
            text="Notifications"
            isOpen={isOpen}
          />
          <ListItem
            to="/analytics"
            icon={faChartLine}
            text="Analytics"
            isOpen={isOpen}
          />
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
