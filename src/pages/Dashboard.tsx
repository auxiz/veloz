
import React, { useState } from 'react';
import AdminNavbar from '@/components/AdminNavbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ImportSection from '@/components/dashboard/ImportSection';
import InventorySection from '@/components/dashboard/InventorySection';
import { useVehicleManagement } from '@/hooks/useVehicleManagement';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('inventory');
  const xmlUrl = "http://app.revendamais.com.br/application/index.php/apiGeneratorXml/generator/sitedaloja/e64ccd1ada81eb551e2537627b54e6de11998.xml";

  const { 
    vehicles, 
    loading, 
    handleImportComplete, 
    handleVehicleUpdate, 
    handleVehicleDelete 
  } = useVehicleManagement(xmlUrl);
  
  const onImportComplete = (result: any) => {
    const success = handleImportComplete(result);
    if (success) {
      // Switch to inventory tab after successful upload
      setActiveTab('inventory');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <AdminNavbar />
      
      <main className="container mx-auto px-4 py-6">
        <DashboardHeader 
          title="Vehicle Management Dashboard" 
          description="Upload, view, and manage your vehicle inventory" 
        />
        
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
            <ImportSection 
              xmlUrl={xmlUrl} 
              onImportComplete={onImportComplete} 
            />
          </TabsContent>
          
          <TabsContent value="inventory">
            <div className="space-y-6">
              <InventorySection 
                vehicles={vehicles}
                loading={loading}
                onVehicleUpdate={handleVehicleUpdate}
                onVehicleDelete={handleVehicleDelete}
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
