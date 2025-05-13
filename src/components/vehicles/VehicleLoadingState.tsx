
import React from 'react';
import { Loader2 } from 'lucide-react';

const VehicleLoadingState: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-64 bg-veloz-black rounded-lg shadow-md border border-gray-800 animate-fade-in">
      <Loader2 className="h-10 w-10 text-veloz-yellow animate-spin mb-4" />
      <p className="text-xl text-gray-300 font-montserrat">Carregando veículos...</p>
    </div>
  );
};

export default VehicleLoadingState;
