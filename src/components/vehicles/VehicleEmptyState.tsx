
import React from 'react';
import { Button } from '@/components/ui/button';

interface VehicleEmptyStateProps {
  onResetFilters: () => void;
}

const VehicleEmptyState: React.FC<VehicleEmptyStateProps> = ({ onResetFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-gray-800 rounded-lg p-8 shadow-sm">
      <p className="text-xl text-gray-400 text-center">
        Nenhum veículo encontrado com os filtros selecionados.
      </p>
      <Button 
        variant="outline" 
        className="mt-4 border-veloz-yellow text-veloz-yellow hover:bg-veloz-yellow/10" 
        onClick={onResetFilters}
      >
        Limpar filtros
      </Button>
    </div>
  );
};

export default VehicleEmptyState;
