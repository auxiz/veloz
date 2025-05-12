
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Vehicle } from '@/types/vehicle';
import { Eye, Pencil } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  onView: (vehicle: Vehicle) => void;
  onEdit: (vehicle: Vehicle) => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onView, onEdit }) => {
  const statusColors = {
    available: 'bg-green-500',
    sold: 'bg-red-500',
    reserved: 'bg-yellow-500'
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };
  
  return (
    <Card className="h-full flex flex-col overflow-hidden bg-gray-800 border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="aspect-[16/9] relative bg-gray-900 overflow-hidden">
        {vehicle.photos && vehicle.photos.length > 0 ? (
          <img 
            src={vehicle.photos[0]} 
            alt={`${vehicle.brand} ${vehicle.model}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image
          </div>
        )}
        <Badge 
          className={`absolute top-2 right-2 ${statusColors[vehicle.status]}`}
        >
          {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <div>
          <h3 className="text-lg font-bold text-white">{vehicle.brand} {vehicle.model}</h3>
          <p className="text-gray-400">{vehicle.year} • {vehicle.mileage} km</p>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2 flex-grow">
        <p className="text-2xl font-bold text-veloz-yellow mb-2">
          {formatCurrency(vehicle.price)}
        </p>
        <div className="flex flex-wrap gap-1 mt-2">
          <Badge variant="outline" className="bg-gray-700 text-gray-200">{vehicle.fuelType}</Badge>
          <Badge variant="outline" className="bg-gray-700 text-gray-200">{vehicle.transmission}</Badge>
          <Badge variant="outline" className="bg-gray-700 text-gray-200">{vehicle.color}</Badge>
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
            <Eye className="h-4 w-4 mr-1" /> View
          </Button>
          <Button 
            variant="veloz" 
            size="sm" 
            className="flex-1"
            onClick={() => onEdit(vehicle)}
          >
            <Pencil className="h-4 w-4 mr-1" /> Edit
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default VehicleCard;
