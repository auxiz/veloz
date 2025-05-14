
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AdminNavbar from '@/components/AdminNavbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ImportSection from '@/components/dashboard/ImportSection';
import InventorySection from '@/components/dashboard/InventorySection';
import TestingTools from '@/components/dashboard/TestingTools'; 
import { useVehicleManagement } from '@/hooks/useVehicleManagement';
import Footer from '@/components/Footer';
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get tab from URL query parameter or default to 'inventory'
  const initialTab = searchParams.get('tab') || 'inventory';
  const [activeTab, setActiveTab] = useState(initialTab);
  
  const [xmlUrl, setXmlUrl] = useState(() => {
    return localStorage.getItem('xmlUrlConfig') || "";
  });
  
  const [showTestTools, setShowTestTools] = useState(() => {
    // Only show test tools in development or if explicitly enabled
    return process.env.NODE_ENV !== 'production' || localStorage.getItem('showTestTools') === 'true';
  });

  useEffect(() => {
    console.log('Dashboard montado. Tab ativo:', activeTab);
    console.log('XML URL atual:', xmlUrl);
    
    // Initialize from localStorage if available
    const savedUrl = localStorage.getItem('xmlUrlConfig');
    if (savedUrl) {
      console.log('URL carregada do localStorage:', savedUrl);
      setXmlUrl(savedUrl);
    }
    
    // Check for test tools keyboard shortcut
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+T to toggle test tools
      if (e.altKey && e.key === 't') {
        const newValue = !showTestTools;
        setShowTestTools(newValue);
        localStorage.setItem('showTestTools', String(newValue));
        console.log('Ferramentas de teste:', newValue ? 'ativadas' : 'desativadas');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showTestTools, activeTab]);

  // Update URL when tab changes
  useEffect(() => {
    if (activeTab) {
      setSearchParams({ tab: activeTab });
    }
  }, [activeTab, setSearchParams]);

  // Update active tab when URL changes
  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams, activeTab]);

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
    console.log('URL XML alterada para:', url);
    setXmlUrl(url);
    localStorage.setItem('xmlUrlConfig', url);
    
    toast({
      title: "URL XML Atualizada",
      description: "A configuração da URL de importação foi atualizada."
    });
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
          <TabsList className="mb-6 bg-veloz-black border border-veloz-yellow/20">
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
            {showTestTools && (
              <TabsTrigger 
                value="testing" 
                className="data-[state=active]:bg-veloz-yellow data-[state=active]:text-veloz-black font-bold transition-all duration-300"
              >
                Ferramentas de Teste
              </TabsTrigger>
            )}
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
          
          {showTestTools && (
            <TabsContent value="testing" className="animate-entrance">
              <div className="space-y-6">
                <TestingTools />
              </div>
            </TabsContent>
          )}
        </Tabs>
        
        {/* Small indicator for test tools shortcut */}
        {process.env.NODE_ENV !== 'production' && (
          <div className="text-xs text-gray-500 mt-4 text-center">
            Pressione Alt+T para {showTestTools ? 'esconder' : 'mostrar'} as ferramentas de teste
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
