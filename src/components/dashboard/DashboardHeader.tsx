
import React from 'react';

interface DashboardHeaderProps {
  title: string;
  description: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, description }) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-veloz-yellow">{title}</h1>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default DashboardHeader;
