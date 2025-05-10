
import React, { useState } from 'react';
import { XmlImportResult, Vehicle } from '@/types/vehicle';
import AdminNavbar from '@/components/AdminNavbar';
import XmlUploader from '@/components/XmlUploader';
import VehicleList from '@/components/VehicleList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [activeTab, setActiveTab] = useState('upload');
  
  const handleImportComplete = (result: XmlImportResult) => {
    if (result.success && result.vehicles && result.vehicles.length > 0) {
      setVehicles(prevVehicles => {
        // Merge new vehicles with existing ones, avoiding duplicates
        const existingIds = new Set(prevVehicles.map(v => v.id));
        const newVehicles = result.vehicles!.filter(v => !existingIds.has(v.id));
        
        return [...prevVehicles, ...newVehicles];
      });
      
      // Switch to inventory tab after successful upload
      setActiveTab('inventory');
    }
  };
  
  const handleVehicleUpdate = (updatedVehicle: Vehicle) => {
    setVehicles(prevVehicles => 
      prevVehicles.map(vehicle => 
        vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle
      )
    );
    
    toast({
      title: "Vehicle Updated",
      description: `${updatedVehicle.brand} ${updatedVehicle.model} has been updated.`
    });
  };
  
  const handleVehicleDelete = (vehicleId: string) => {
    const vehicleToDelete = vehicles.find(v => v.id === vehicleId);
    
    setVehicles(prevVehicles => 
      prevVehicles.filter(vehicle => vehicle.id !== vehicleId)
    );
    
    if (vehicleToDelete) {
      toast({
        title: "Vehicle Deleted",
        description: `${vehicleToDelete.brand} ${vehicleToDelete.model} has been removed.`
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Vehicle Management Dashboard</h1>
          <p className="text-gray-500">Upload, view, and manage your vehicle inventory</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="upload">Import Vehicles</TabsTrigger>
            <TabsTrigger value="inventory">Inventory ({vehicles.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>XML Upload Instructions</CardTitle>
                  <CardDescription>
                    Follow these steps to import vehicles from an XML file.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Prepare your XML file with vehicle data.</li>
                    <li>Click the upload button to select your file.</li>
                    <li>Verify the information is correct.</li>
                    <li>Click Import to add vehicles to your inventory.</li>
                  </ol>
                </CardContent>
                <CardFooter>
                  <p className="text-xs text-gray-500">
                    Supported fields: brand, model, year, price, mileage, fuelType, 
                    transmission, color, photos, description, features, status.
                  </p>
                </CardFooter>
              </Card>
              
              <div className="col-span-1 md:col-span-2">
                <XmlUploader onImportComplete={handleImportComplete} />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="inventory">
            <div className="space-y-6">
              {vehicles.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <p className="text-xl text-gray-500 mb-4">Your inventory is empty.</p>
                    <p className="text-gray-400">
                      Import vehicles using XML files or add them manually.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <VehicleList 
                  vehicles={vehicles}
                  onVehicleUpdate={handleVehicleUpdate}
                  onVehicleDelete={handleVehicleDelete}
                />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
