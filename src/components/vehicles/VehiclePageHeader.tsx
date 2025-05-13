
import React from 'react';

interface VehiclePageHeaderProps {
  totalVehicles: number;
}

const VehiclePageHeader: React.FC<VehiclePageHeaderProps> = ({ totalVehicles }) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
      <div className="mb-4 md:mb-0">
        <h1 className="text-3xl font-bold text-veloz-yellow">Nossos Veículos</h1>
        <p className="text-gray-400">Explore nossa seleção completa de veículos disponíveis</p>
      </div>
      <div className="bg-gray-800 rounded-lg p-4 shadow-sm">
        <p className="text-sm text-gray-300">
          Encontramos <span className="text-veloz-yellow font-semibold">{totalVehicles}</span> veículos
        </p>
      </div>
    </div>
  );
};

export default VehiclePageHeader;
