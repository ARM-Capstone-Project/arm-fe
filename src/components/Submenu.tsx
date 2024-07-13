// src/components/Submenu.tsx

import React from 'react';

interface SubmenuProps {
  onSelect: (section: string) => void;
}

const Submenu: React.FC<SubmenuProps> = ({ onSelect }) => {
  return (
    <div className="mt-4">
      <ul className="flex sub_menu">
        <li className="px-4 cursor-pointer hover:bg-gray-100 border-r border-gray-300" onClick={() => onSelect('liveData')}>
          <a href="#" className="block">Live Status</a>
        </li>
        <li className="px-4 cursor-pointer hover:bg-gray-100 border-r border-gray-300" onClick={() => onSelect('showMap')}>
          <a href="#" className="block">Map</a>
        </li>
        <li className="px-4 cursor-pointer hover:bg-gray-100 border-r border-gray-300" onClick={() => onSelect('alarmSetting')}>
          <a href="#" className="block">Alarm Setting</a>
        </li>
        <li className="px-4 cursor-pointer hover:bg-gray-100" onClick={() => onSelect('showActions')}>
          <a href="#" className="block">Actions</a>
        </li>
      </ul>
    </div>
  );
}

export default Submenu;
