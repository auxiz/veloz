
import React from 'react';
import { Loader2 } from 'lucide-react';

const VehicleLoadingState: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-64 bg-veloz-black rounded-lg shadow-lg border border-gray-800 animate-fade-in p-8">
      <div className="relative w-16 h-16 mb-6">
        <Loader2 className="h-16 w-16 text-veloz-yellow animate-spin absolute" />
        <div className="h-16 w-16 rounded-full border-t-2 border-veloz-yellow/30 animate-spin absolute" style={{ animationDuration: '3s' }}></div>
      </div>
      <p className="text-xl text-gray-300 font-montserrat mb-2">Carregando veículos...</p>
      <p className="text-sm text-gray-500 text-center max-w-sm">
        Estamos buscando os melhores veículos para você. Isso pode levar alguns segundos.
      </p>
    </div>
  );
};

export default VehicleLoadingState;
