
import { create } from 'zustand';
import { Vehicle } from '@/types/vehicle';

interface ComparisonState {
  vehiclesToCompare: Vehicle[];
  maxVehiclesToCompare: number;
  maxVehiclesReached: boolean;
  addVehicleToCompare: (vehicle: Vehicle) => boolean;
  removeVehicleFromCompare: (vehicleId: string) => void;
  clearComparisonList: () => void;
}

export const useComparisonStore = create<ComparisonState>((set, get) => ({
  vehiclesToCompare: [],
  maxVehiclesToCompare: 3,
  maxVehiclesReached: false,
  addVehicleToCompare: (vehicle) => {
    const { vehiclesToCompare, maxVehiclesToCompare } = get();
    
    // Check if this vehicle is already in the comparison
    if (vehiclesToCompare.some(v => v.id === vehicle.id)) {
      return true;
    }
    
    // Check if we've reached the maximum number of vehicles
    if (vehiclesToCompare.length >= maxVehiclesToCompare) {
      return false;
    }
    
    // Add the vehicle to the comparison list
    set(state => ({
      vehiclesToCompare: [...state.vehiclesToCompare, vehicle],
      maxVehiclesReached: state.vehiclesToCompare.length + 1 >= maxVehiclesToCompare
    }));
    
    return true;
  },
  
  removeVehicleFromCompare: (vehicleId) => {
    set(state => ({
      vehiclesToCompare: state.vehiclesToCompare.filter(v => v.id !== vehicleId),
      maxVehiclesReached: state.vehiclesToCompare.filter(v => v.id !== vehicleId).length >= state.maxVehiclesToCompare
    }));
  },
  
  clearComparisonList: () => {
    set({
      vehiclesToCompare: [],
      maxVehiclesReached: false
    });
  }
}));
