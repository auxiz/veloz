
import React, { useState, useEffect } from 'react';
import { XmlImportResult, Vehicle } from '@/types/vehicle';
import AdminNavbar from '@/components/AdminNavbar';
import XmlUploader from '@/components/XmlUploader';
import VehicleList from '@/components/VehicleList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { parseVehiclesXml } from '@/utils/xmlParser';

const Dashboard = () => {
  const { toast } = useToast();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [activeTab, setActiveTab] = useState('inventory');
  const [loading, setLoading] = useState(false);
  
  // Fetch XML data on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      const storedVehicles = localStorage.getItem('vehicles');
      
      if (storedVehicles) {
        try {
          setVehicles(JSON.parse(storedVehicles));
        } catch (error) {
          console.error("Error parsing stored vehicles:", error);
        }
      } else {
        // If no vehicles in localStorage, fetch from XML
        setLoading(true);
        try {
          const xmlUrl = "http://app.revendamais.com.br/application/index.php/apiGeneratorXml/generator/sitedaloja/e64ccd1ada81eb551e2537627b54e6de11998.xml";
          const response = await fetch(xmlUrl);
          
          if (response.ok) {
            const xmlContent = await response.text();
            const result = await parseVehiclesXml(xmlContent);
            
            if (result.success && result.vehicles) {
              setVehicles(result.vehicles);
              localStorage.setItem('vehicles', JSON.stringify(result.vehicles));
              
              toast({
                title: "Auto-Import Successful",
                description: `${result.vehicles.length} vehicles imported from XML.`,
              });
            }
          }
        } catch (error) {
          console.error("Error fetching initial XML data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchInitialData();
  }, [toast]);
  
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
      
      // Switch to inventory tab after successful upload
      setActiveTab('inventory');
    }
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
      title: "Vehicle Updated",
      description: `${updatedVehicle.brand} ${updatedVehicle.model} has been updated.`
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
        title: "Vehicle Deleted",
        description: `${vehicleToDelete.brand} ${vehicleToDelete.model} has been removed.`
      });
    }
  };

  // Load vehicles from localStorage on component mount
  React.useEffect(() => {
    const storedVehicles = localStorage.getItem('vehicles');
    if (storedVehicles) {
      try {
        setVehicles(JSON.parse(storedVehicles));
      } catch (error) {
        console.error("Error parsing stored vehicles:", error);
      }
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <AdminNavbar />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-veloz-yellow">Vehicle Management Dashboard</h1>
          <p className="text-gray-400">Upload, view, and manage your vehicle inventory</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 bg-gray-800">
            <TabsTrigger value="upload" className="data-[state=active]:bg-veloz-yellow data-[state=active]:text-black">
              Import Vehicles
            </TabsTrigger>
            <TabsTrigger value="inventory" className="data-[state=active]:bg-veloz-yellow data-[state=active]:text-black">
              Inventory ({vehicles.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="col-span-1 bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-veloz-yellow">XML Import Instructions</CardTitle>
                  <CardDescription className="text-gray-400">
                    Connected to RevendaMais XML Feed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal list-inside space-y-2 text-gray-300">
                    <li>Click the import button to fetch vehicle data.</li>
                    <li>The system will automatically download and process the XML.</li>
                    <li>New vehicles will be added to your inventory.</li>
                    <li>Existing vehicles will remain unchanged.</li>
                  </ol>
                </CardContent>
                <CardFooter>
                  <p className="text-xs text-gray-400">
                    XML feed URL: http://app.revendamais.com.br/application/...
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
              {loading ? (
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <p className="text-xl text-gray-400 mb-4">Loading inventory data...</p>
                  </CardContent>
                </Card>
              ) : vehicles.length === 0 ? (
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <p className="text-xl text-gray-400 mb-4">Your inventory is empty.</p>
                    <p className="text-gray-500">
                      Import vehicles using the XML import feature.
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

export default Dashboard;
