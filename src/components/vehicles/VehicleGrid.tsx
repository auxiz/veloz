
import React from 'react';
import { Link } from 'react-router-dom';
import { Vehicle } from '@/types/vehicle';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface VehicleGridProps {
  vehicles: Vehicle[];
  isLoading: boolean;
  onResetFilters: () => void;
}

const VehicleGrid: React.FC<VehicleGridProps> = ({ vehicles, isLoading, onResetFilters }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-gray-400">Carregando veículos...</p>
      </div>
    );
  }

  if (vehicles.length === 0) {
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
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map((vehicle) => (
        <Link to={`/vehicles/${vehicle.id}`} key={vehicle.id} className="group">
          <Card className="h-full overflow-hidden hover:border-veloz-yellow transition-colors bg-gray-800 border-gray-700 text-white">
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-900">
              {vehicle.photos && vehicle.photos.length > 0 ? (
                <img 
                  src={vehicle.photos[0]} 
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-800">
                  <p className="text-gray-500">Sem imagem</p>
                </div>
              )}
              <div className="absolute top-2 right-2 bg-veloz-yellow px-2 py-1 rounded text-sm font-medium text-veloz-black">
                {vehicle.status === 'available' ? 'Disponível' : vehicle.status}
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="text-lg font-bold text-white">{vehicle.brand} {vehicle.model}</h3>
              <div className="flex justify-between mt-2">
                <p className="text-gray-400">{vehicle.year}</p>
                <p className="font-bold text-lg text-veloz-yellow">R$ {vehicle.price.toLocaleString('pt-BR')}</p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-block bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                  {vehicle.transmission}
                </span>
                <span className="inline-block bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                  {vehicle.fuelType}
                </span>
                <span className="inline-block bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                  {vehicle.mileage.toLocaleString('pt-BR')} km
                </span>
              </div>
              <Button 
                className="w-full mt-4 bg-veloz-yellow text-veloz-black hover:bg-veloz-yellow/90 flex items-center justify-center"
              >
                Saiba Mais <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default VehicleGrid;
