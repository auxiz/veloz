
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import VehicleList from '@/components/VehicleList';
import { Vehicle } from '@/types/vehicle';

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
  if (loading) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-xl text-gray-400 mb-4">Loading inventory data...</p>
        </CardContent>
      </Card>
    );
  }
  
  if (vehicles.length === 0) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-xl text-gray-400 mb-4">Your inventory is empty.</p>
          <p className="text-gray-500">
            Import vehicles using the XML import feature.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <VehicleList 
      vehicles={vehicles}
      onVehicleUpdate={onVehicleUpdate}
      onVehicleDelete={onVehicleDelete}
    />
  );
};

export default InventorySection;
