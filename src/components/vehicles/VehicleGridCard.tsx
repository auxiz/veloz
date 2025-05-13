
import React from 'react';
import { Link } from 'react-router-dom';
import { Vehicle } from '@/types/vehicle';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

interface VehicleGridCardProps {
  vehicle: Vehicle;
  isInCompareList: boolean;
  onCompareToggle: (vehicle: Vehicle, checked: boolean) => void;
  isCompareDisabled: boolean;
}

const VehicleGridCard: React.FC<VehicleGridCardProps> = ({ 
  vehicle, 
  isInCompareList, 
  onCompareToggle, 
  isCompareDisabled 
}) => {
  return (
    <div className="group relative">
      <div className="absolute top-2 left-2 z-10 bg-black/70 rounded-full p-1">
        <Checkbox
          checked={isInCompareList}
          onCheckedChange={(checked) => onCompareToggle(vehicle, checked === true)}
          disabled={isCompareDisabled && !isInCompareList}
          className="data-[state=checked]:bg-veloz-yellow data-[state=checked]:text-veloz-black border-veloz-yellow"
        />
      </div>
      
      <Link to={`/vehicles/${vehicle.id}`} className="block">
        <Card className="h-full overflow-hidden hover:border-veloz-yellow transition-colors bg-veloz-black border-veloz-yellow/20 text-white">
          <div className="relative aspect-[16/10] overflow-hidden bg-veloz-black">
            {vehicle.photos && vehicle.photos.length > 0 ? (
              <img 
                src={vehicle.photos[0]} 
                alt={`${vehicle.brand} ${vehicle.model}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-veloz-black">
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
              <span className="inline-block bg-veloz-black text-gray-300 text-xs px-2 py-1 rounded border border-veloz-yellow/20">
                {vehicle.transmission}
              </span>
              <span className="inline-block bg-veloz-black text-gray-300 text-xs px-2 py-1 rounded border border-veloz-yellow/20">
                {vehicle.fuelType}
              </span>
              <span className="inline-block bg-veloz-black text-gray-300 text-xs px-2 py-1 rounded border border-veloz-yellow/20">
                {vehicle.mileage.toLocaleString('pt-BR')} km
              </span>
            </div>
            <Button 
              className="w-full mt-4"
            >
              Saiba Mais <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default VehicleGridCard;
