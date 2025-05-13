
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface VehicleEmptyStateProps {
  onResetFilters: () => void;
}

const VehicleEmptyState: React.FC<VehicleEmptyStateProps> = ({ onResetFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-veloz-black rounded-lg p-8 shadow-md border border-gray-800 animate-fade-in">
      <p className="text-xl text-gray-300 text-center mb-6 font-montserrat">
        Nenhum veículo encontrado com os filtros selecionados.
      </p>
      <Button 
        variant="veloz" 
        className="font-montserrat font-bold transition-all duration-300"
        onClick={onResetFilters}
      >
        <RefreshCw className="mr-2 h-5 w-5" />
        Limpar filtros
      </Button>
    </div>
  );
};

export default VehicleEmptyState;
