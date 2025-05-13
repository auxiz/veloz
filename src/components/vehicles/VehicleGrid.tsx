
import React from 'react';
import { Vehicle } from '@/types/vehicle';
import { useToast } from '@/hooks/use-toast';
import { useComparisonStore } from '@/store/comparisonStore';
import VehicleGridCard from './VehicleGridCard';
import VehicleGridHeader from './VehicleGridHeader';
import VehiclePagination from './VehiclePagination';
import VehicleEmptyState from './VehicleEmptyState';
import VehicleLoadingState from './VehicleLoadingState';

interface VehicleGridProps {
  vehicles: Vehicle[];
  isLoading: boolean;
  onResetFilters: () => void;
  // Pagination props
  currentPage?: number;
  setCurrentPage?: (page: number) => void;
  pageSize?: number;
  setPageSize?: (size: number) => void;
  totalPages?: number;
  totalVehicles?: number;
}

const VehicleGrid: React.FC<VehicleGridProps> = ({ 
  vehicles, 
  isLoading, 
  onResetFilters,
  currentPage = 1,
  setCurrentPage = () => {},
  pageSize = 12,
  setPageSize = () => {},
  totalPages = 1,
  totalVehicles = 0
}) => {
  const { toast } = useToast();
  const { vehiclesToCompare, addVehicleToCompare, removeVehicleFromCompare, maxVehiclesReached } = useComparisonStore();

  const handleCompareToggle = (vehicle: Vehicle, checked: boolean) => {
    if (checked) {
      const added = addVehicleToCompare(vehicle);
      if (!added) {
        toast({
          title: "Limite atingido",
          description: "Você só pode comparar até 3 veículos ao mesmo tempo.",
          variant: "destructive"
        });
      }
    } else {
      removeVehicleFromCompare(vehicle.id);
    }
  };
  
  if (isLoading) {
    return <VehicleLoadingState />;
  }

  if (vehicles.length === 0) {
    return <VehicleEmptyState onResetFilters={onResetFilters} />;
  }

  const showCompareButton = vehiclesToCompare.length >= 2;

  return (
    <div>
      <VehicleGridHeader 
        vehicleCount={vehicles.length}
        totalVehicles={totalVehicles}
        showCompareButton={showCompareButton}
        compareCount={vehiclesToCompare.length}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />

      {/* Vehicle grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <VehicleGridCard 
            key={vehicle.id}
            vehicle={vehicle}
            isInCompareList={vehiclesToCompare.some(v => v.id === vehicle.id)}
            onCompareToggle={handleCompareToggle}
            isCompareDisabled={maxVehiclesReached}
          />
        ))}
      </div>

      {/* Pagination */}
      <VehiclePagination 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default VehicleGrid;
