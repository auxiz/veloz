
import React from 'react';

interface DashboardHeaderProps {
  title: string;
  description: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, description }) => {
  return (
    <div className="mb-10 animate-entrance">
      <h1 className="text-4xl font-bold text-veloz-yellow mb-3 font-montserrat tracking-tight">{title}</h1>
      <p className="text-gray-400 font-montserrat text-lg max-w-2xl">{description}</p>
      <div className="mt-5 h-1.5 w-24 bg-veloz-yellow rounded-full"></div>
    </div>
  );
};

export default DashboardHeader;
