// src/components/Submenu.tsx
import React, { useState } from 'react';

interface SubmenuProps {
  onSelect: (section: string) => void;
}

const Submenu: React.FC<SubmenuProps> = ({ onSelect }) => {
    const [activeSection, setActiveSection] = useState('liveData');

    const handleSelect = (section: string) => {
      setActiveSection(section);
      onSelect(section);
    };
  return (
    <div className="mt-4">
     <ul className="flex sub_menu">
     <li
          className={`px-4 py-2 cursor-pointer hover:bg-gray-100  ${
            activeSection === 'liveData' ? 'bg-gray-200 border-b-2 border-rose-500' : ''
          }`}
          onClick={() => handleSelect('liveData')}
        >
          <a href="#" className="block">Live Status</a>
        </li>   
        <li
          className={`px-4 py-2 cursor-pointer hover:bg-gray-100  ${
            activeSection === 'showMap' ? 'bg-gray-200 border-b-2 border-rose-500' : ''
          }`}
          onClick={() => handleSelect('showMap')}
        >
          <a href="#" className="block">Map</a>
        </li>

        <li
          className={`px-4 py-2 cursor-pointer hover:bg-gray-100  ${
            activeSection === 'deviceslist' ? 'bg-gray-200 border-b-2 border-rose-500' : ''
          }`}
          onClick={() => handleSelect('deviceslist')}
        >
          <a href="#" className="block">Devices List</a>
        </li>       
        <li
          className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
            activeSection === 'showActions' ? 'bg-gray-200 border-b-2 border-rose-500' : ''
          }`}
          onClick={() => handleSelect('showActions')}
        >
          <a href="#" className="block">Device Setup</a>
        </li>
                

        <li
          className={`px-4 py-2 cursor-pointer hover:bg-gray-100  ${
            activeSection === 'alarmSetting' ? 'bg-gray-200 border-b-2 border-rose-500' : ''
          }`}
          onClick={() => handleSelect('alarmSetting')}
        >
          <a href="#" className="block">Threshold Setting</a>
        </li>
      </ul>
    </div>
  );
}

export default Submenu;
