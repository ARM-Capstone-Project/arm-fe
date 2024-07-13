// src/components/DeviceIcons.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerHalf, faTachometerAlt, faTint, faWater } from '@fortawesome/free-solid-svg-icons';

interface DeviceIconsProps {
  type: 'temperature' | 'pressure' | 'moisture' | 'humidity';
}

const DeviceIcons: React.FC<DeviceIconsProps> = ({ type }) => {
  let icon;
  switch (type) {
    case 'temperature':
      icon = faThermometerHalf;
      break;
    case 'pressure':
      icon = faTachometerAlt;
      break;
    case 'moisture':
      icon = faTint;
      break;
    case 'humidity':
      icon = faWater;
      break;
    default:
      icon = faThermometerHalf;
  }

  return (
    <FontAwesomeIcon icon={icon} className="text-blue-500 text-4xl" />
  );
}

export default DeviceIcons;
