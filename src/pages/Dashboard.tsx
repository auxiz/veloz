
import React, { useState, useEffect } from 'react';
import AdminNavbar from '@/components/AdminNavbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ImportSection from '@/components/dashboard/ImportSection';
import InventorySection from '@/components/dashboard/InventorySection';
import { useVehicleManagement } from '@/hooks/useVehicleManagement';
import Footer from '@/components/Footer';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('inventory');
  const [xmlUrl, setXmlUrl] = useState(() => {
    return localStorage.getItem('xmlUrlConfig') || "";
  });

  useEffect(() => {
    // Initialize from localStorage if available
    const savedUrl = localStorage.getItem('xmlUrlConfig');
    if (savedUrl) {
      setXmlUrl(savedUrl);
    }
  }, []);

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

  const handleXmlUrlChange = (url: string) => {
    setXmlUrl(url);
    localStorage.setItem('xmlUrlConfig', url);
  };
  
  return (
    <div className="min-h-screen bg-veloz-black text-veloz-white flex flex-col">
      <AdminNavbar />
      
      <main className="container mx-auto px-4 py-6 flex-grow">
        <DashboardHeader 
          title="Painel de Gerenciamento" 
          description="Carregue, visualize e gerencie seu inventário de veículos" 
        />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full animate-fade-in">
          <TabsList className="mb-6 bg-gray-800 border border-gray-700">
            <TabsTrigger 
              value="upload" 
              className="data-[state=active]:bg-veloz-yellow data-[state=active]:text-veloz-black font-bold transition-all duration-300"
            >
              Importar Veículos
            </TabsTrigger>
            <TabsTrigger 
              value="inventory" 
              className="data-[state=active]:bg-veloz-yellow data-[state=active]:text-veloz-black font-bold transition-all duration-300"
            >
              Inventário ({vehicles.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-6 animate-entrance">
            <ImportSection 
              xmlUrl={xmlUrl} 
              onImportComplete={onImportComplete}
              onXmlUrlChange={handleXmlUrlChange}
            />
          </TabsContent>
          
          <TabsContent value="inventory" className="animate-entrance">
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

      <Footer />
    </div>
  );
};

export default Dashboard;
