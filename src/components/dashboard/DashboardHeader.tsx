
import React from 'react';

interface DashboardHeaderProps {
  title: string;
  description: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, description }) => {
  return (
    <div className="mb-8 animate-entrance">
      <h1 className="text-3xl font-bold text-veloz-yellow mb-2 font-montserrat">{title}</h1>
      <p className="text-gray-400 font-montserrat">{description}</p>
      <div className="mt-4 h-1 w-20 bg-veloz-yellow rounded-full"></div>
    </div>
  );
};

export default DashboardHeader;
