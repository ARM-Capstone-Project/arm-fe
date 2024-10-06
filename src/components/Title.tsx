// src/components/Title.tsx

import React from 'react';

interface TitleProps {
  title: string;
}

const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
    </div>
  );
};

export default Title;
