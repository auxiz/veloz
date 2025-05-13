
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import VehicleList from '@/components/VehicleList';
import { Vehicle } from '@/types/vehicle';
import { Loader2, Car, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface InventorySectionProps {
  vehicles: Vehicle[];
  loading: boolean;
  onVehicleUpdate: (updatedVehicle: Vehicle) => void;
  onVehicleDelete: (vehicleId: string) => void;
}

const InventorySection: React.FC<InventorySectionProps> = ({ 
  vehicles, 
  loading, 
  onVehicleUpdate, 
  onVehicleDelete 
}) => {
  const [sortBy, setSortBy] = useState('newest');
  
  if (loading) {
    return (
      <Card className="bg-gray-800 border-gray-700 shadow-md animate-pulse">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Loader2 className="h-12 w-12 text-veloz-yellow animate-spin mb-4" />
          <p className="text-xl text-gray-400 mb-2 font-montserrat">Carregando inventário...</p>
          <p className="text-sm text-gray-500">Por favor, aguarde enquanto buscamos seus veículos</p>
        </CardContent>
      </Card>
    );
  }
  
  if (vehicles.length === 0) {
    return (
      <Card className="bg-gray-800 border-gray-700 shadow-md animate-entrance">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <AlertTriangle className="h-16 w-16 text-veloz-yellow mb-6" />
          <p className="text-2xl text-gray-300 mb-3 font-montserrat font-bold">Seu inventário está vazio</p>
          <p className="text-gray-400 max-w-md text-center mb-6">
            Importe veículos usando o recurso de importação XML ou adicione-os manualmente.
          </p>
          <Button variant="veloz" onClick={() => window.location.hash = 'upload'}>
            <Car className="mr-2 h-5 w-5" />
            Importar Veículos
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6 animate-entrance">
      <div className="flex justify-between items-center mb-4 bg-gray-800 p-4 rounded-lg border border-gray-700">
        <div className="text-sm text-gray-300">
          <span className="font-bold text-veloz-yellow">{vehicles.length}</span> veículos encontrados
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Ordenar por:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700 text-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700">
              <SelectItem value="newest">Mais recentes</SelectItem>
              <SelectItem value="oldest">Mais antigos</SelectItem>
              <SelectItem value="price-high">Preço (maior)</SelectItem>
              <SelectItem value="price-low">Preço (menor)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <VehicleList 
        vehicles={vehicles}
        onVehicleUpdate={onVehicleUpdate}
        onVehicleDelete={onVehicleDelete}
      />
    </div>
  );
};

export default InventorySection;
