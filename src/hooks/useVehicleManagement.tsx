
import { useState, useEffect } from 'react';
import { Vehicle, XmlImportResult } from '@/types/vehicle';
import { useToast } from '@/hooks/use-toast';
import { startScheduledImport, loadVehiclesFromLocalStorage } from '@/utils/scheduledXmlImport';

export function useVehicleManagement(xmlUrl: string) {
  const { toast } = useToast();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Initialize vehicles and start scheduled imports
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      
      // Load vehicles from localStorage first
      const storedVehicles = loadVehiclesFromLocalStorage();
      setVehicles(storedVehicles);
      
      if (xmlUrl) {
        // Start the scheduled import process
        startScheduledImport(
          xmlUrl,
          (result) => {
            if (result.success && result.vehicles) {
              setVehicles(result.vehicles);
            }
          },
          (error) => {
            console.error("Erro na importação programada:", error);
          }
        );
      }
      
      setLoading(false);
    };

    loadInitialData();
  }, [toast, xmlUrl]);
  
  const handleImportComplete = (result: XmlImportResult) => {
    if (result.success && result.vehicles && result.vehicles.length > 0) {
      setVehicles(prevVehicles => {
        // Merge new vehicles with existing ones, avoiding duplicates
        const existingIds = new Set(prevVehicles.map(v => v.id));
        const newVehicles = result.vehicles!.filter(v => !existingIds.has(v.id));
        
        const allVehicles = [...prevVehicles, ...newVehicles];
        
        // Store in localStorage for our demo
        localStorage.setItem('vehicles', JSON.stringify(allVehicles));
        
        return allVehicles;
      });
      
      return true; // Import was successful
    }
    
    return false; // Import failed or no vehicles
  };
  
  const handleVehicleUpdate = (updatedVehicle: Vehicle) => {
    setVehicles(prevVehicles => {
      const updatedVehicles = prevVehicles.map(vehicle => 
        vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle
      );
      
      // Update localStorage
      localStorage.setItem('vehicles', JSON.stringify(updatedVehicles));
      
      return updatedVehicles;
    });
    
    toast({
      title: "Veículo Atualizado",
      description: `${updatedVehicle.brand} ${updatedVehicle.model} foi atualizado.`
    });
  };
  
  const handleVehicleDelete = (vehicleId: string) => {
    const vehicleToDelete = vehicles.find(v => v.id === vehicleId);
    
    setVehicles(prevVehicles => {
      const filteredVehicles = prevVehicles.filter(vehicle => vehicle.id !== vehicleId);
      
      // Update localStorage
      localStorage.setItem('vehicles', JSON.stringify(filteredVehicles));
      
      return filteredVehicles;
    });
    
    if (vehicleToDelete) {
      toast({
        title: "Veículo Excluído",
        description: `${vehicleToDelete.brand} ${vehicleToDelete.model} foi removido.`
      });
    }
  };
  
  return {
    vehicles,
    loading,
    handleImportComplete,
    handleVehicleUpdate,
    handleVehicleDelete
  };
}
