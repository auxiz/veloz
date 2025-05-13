
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Vehicle } from '@/types/vehicle';
import { Eye, Pencil, Calendar, MapPin, Fuel, Settings } from 'lucide-react';
import VehicleBadge from './VehicleBadge';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

interface VehicleCardProps {
  vehicle: Vehicle;
  onView: (vehicle: Vehicle) => void;
  onEdit: (vehicle: Vehicle) => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onView, onEdit }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };
  
  return (
    <Card className="h-full flex flex-col overflow-hidden bg-gray-800 border-gray-700 shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:border-veloz-yellow animate-entrance">
      <div className="aspect-[16/9] relative bg-gray-900 overflow-hidden group">
        {vehicle.photos && vehicle.photos.length > 0 ? (
          <img 
            src={vehicle.photos[0]} 
            alt={`${vehicle.brand} ${vehicle.model}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <VehicleBadge status={vehicle.status} size="sm" />
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">{vehicle.brand} {vehicle.model}</h3>
          <div className="flex items-center gap-1 text-gray-400 text-sm">
            <Calendar className="h-3 w-3" />
            <span>{vehicle.year}</span>
            <span className="mx-1">•</span>
            <MapPin className="h-3 w-3" />
            <span>{vehicle.mileage.toLocaleString('pt-BR')} km</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2 flex-grow">
        <p className="text-2xl font-bold text-veloz-yellow mb-3 flex items-center gap-2">
          {formatCurrency(vehicle.price)}
          {vehicle.price > 100000 && (
            <HoverCard>
              <HoverCardTrigger>
                <Badge variant="outline" className="bg-veloz-yellow text-veloz-black cursor-help">Premium</Badge>
              </HoverCardTrigger>
              <HoverCardContent className="bg-gray-900 border-gray-700 text-white w-64">
                <p className="text-sm">Este é um veículo de alto valor, com características premium.</p>
              </HoverCardContent>
            </HoverCard>
          )}
        </p>
        <div className="flex flex-wrap gap-1 mt-2">
          <Badge variant="outline" className="bg-gray-700 text-gray-200 transition-colors hover:bg-gray-600 flex items-center gap-1">
            <Fuel className="h-3 w-3" /> {vehicle.fuelType}
          </Badge>
          <Badge variant="outline" className="bg-gray-700 text-gray-200 transition-colors hover:bg-gray-600 flex items-center gap-1">
            <Settings className="h-3 w-3" /> {vehicle.transmission}
          </Badge>
          <Badge variant="outline" className="bg-gray-700 text-gray-200 transition-colors hover:bg-gray-600">{vehicle.color}</Badge>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <div className="flex gap-2 w-full">
          <Button 
            variant="veloz-outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onView(vehicle)}
          >
            <Eye className="h-4 w-4 mr-1" /> Visualizar
          </Button>
          <Button 
            variant="veloz" 
            size="sm" 
            className="flex-1"
            onClick={() => onEdit(vehicle)}
          >
            <Pencil className="h-4 w-4 mr-1" /> Editar
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default VehicleCard;
