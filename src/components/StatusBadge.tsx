import React from 'react';

interface StatusBadgeProps {
  status: 'active' | 'inactive';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const isActive = status === 'active';

  return (
    <dd
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
        isActive
          ? 'bg-green-50 text-green-700 ring-green-600/20'
          : 'bg-red-50 text-red-700 ring-red-600/20'
      }`}
    >
      {isActive ? 'Active' : 'Inactive'}
    </dd>
  );
};

export default StatusBadge;
