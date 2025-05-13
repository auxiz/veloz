
import React from 'react';
import { Loader2 } from 'lucide-react';

const VehicleLoadingState: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-72 bg-veloz-black rounded-lg shadow-lg border border-gray-800 animate-fade-in p-10">
      <div className="relative w-20 h-20 mb-8">
        <Loader2 className="h-20 w-20 text-veloz-yellow animate-spin absolute" />
        <div className="h-20 w-20 rounded-full border-t-2 border-veloz-yellow/30 animate-spin absolute" style={{ animationDuration: '3.5s' }}></div>
      </div>
      <p className="text-2xl text-gray-300 font-montserrat mb-3">Carregando veículos...</p>
      <p className="text-sm text-gray-500 text-center max-w-sm font-montserrat">
        Estamos buscando os melhores veículos para você. Isso pode levar alguns segundos.
      </p>
    </div>
  );
};

export default VehicleLoadingState;
