
import { parseVehiclesXml } from './xmlParser';
import { XmlImportResult, Vehicle } from '@/types/vehicle';

// Store the last import time
let lastImportTime = 0;
let isImportInProgress = false;
let importInterval: number | null = null;

// Function to load and save vehicles to localStorage
export const saveVehiclesToLocalStorage = (vehicles: Vehicle[]): void => {
  try {
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
    localStorage.setItem('lastXmlImportTime', Date.now().toString());
  } catch (error) {
    console.error('Falha ao salvar veículos no localStorage:', error);
  }
};

// Function to load vehicles from localStorage
export const loadVehiclesFromLocalStorage = (): Vehicle[] => {
  try {
    const storedVehicles = localStorage.getItem('vehicles');
    return storedVehicles ? JSON.parse(storedVehicles) : [];
  } catch (error) {
    console.error('Falha ao carregar veículos do localStorage:', error);
    return [];
  }
};

// Function to check if an import is needed (hourly)
export const isImportNeeded = (): boolean => {
  const now = Date.now();
  const lastImport = Number(localStorage.getItem('lastXmlImportTime') || '0');
  
  // Import if it's been more than an hour since the last import
  // 3600000 ms = 1 hour
  return now - lastImport >= 3600000;
};

// Function to import XML data
export const importXmlData = async (
  xmlUrl: string,
  onSuccess?: (result: XmlImportResult) => void,
  onError?: (error: Error) => void
): Promise<XmlImportResult | null> => {
  if (!xmlUrl) {
    const error = new Error("URL do XML não configurada");
    if (onError) onError(error);
    return {
      success: false,
      message: "URL do XML não configurada",
      errors: ["Por favor, configure a URL do XML nas configurações"]
    };
  }

  if (isImportInProgress) {
    console.log('Importação já em andamento, ignorando');
    return null;
  }
  
  isImportInProgress = true;
  
  try {
    // Check if CORS bypass is enabled
    const useCorsBypass = localStorage.getItem('useCorsBypass') === 'true';
    const targetUrl = useCorsBypass 
      ? `https://corsproxy.io/?${encodeURIComponent(xmlUrl)}`
      : xmlUrl;
    
    console.log(`Buscando XML de: ${useCorsBypass ? 'CORS proxy -> ' : ''}${xmlUrl}`);
    
    const response = await fetch(targetUrl, {
      headers: {
        'Accept': 'application/xml, text/xml, */*'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Falha ao buscar XML: ${response.status} ${response.statusText}`);
    }
    
    const xmlContent = await response.text();
    
    // For debugging, show a sample of the XML content
    if (process.env.NODE_ENV !== 'production') {
      console.log('XML Content (sample):', xmlContent.substring(0, 200) + '...');
    }
    
    const result = await parseVehiclesXml(xmlContent);
    
    if (result.success && result.vehicles) {
      // Save to localStorage
      saveVehiclesToLocalStorage(result.vehicles);
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      // Use toast service if available
      if (typeof window !== 'undefined' && window.toast) {
        window.toast({
          title: "Importação Automática Bem-sucedida",
          description: `${result.vehicles.length} veículos importados do XML.`
        });
      }
    } else {
      if (onError) {
        onError(new Error(result.message));
      }
      
      // Use toast service if available
      if (typeof window !== 'undefined' && window.toast) {
        window.toast({
          title: "Falha na Importação Automática",
          description: result.message,
          variant: "destructive"
        });
      }
    }
    
    return result;
  } catch (error) {
    console.error('Erro ao importar dados XML:', error);
    
    // Provide more helpful error messages for common issues
    let errorMessage = error instanceof Error ? error.message : "Ocorreu um erro desconhecido";
    let errorForUser = errorMessage;
    
    if (errorMessage.includes('CORS') || errorMessage.includes('Failed to fetch') || errorMessage.includes('Network Error')) {
      const useCorsBypass = localStorage.getItem('useCorsBypass') === 'true';
      errorForUser = useCorsBypass 
        ? "Erro de CORS persistiu mesmo com proxy. Tente um arquivo XML hospedado no mesmo domínio."
        : "Erro de CORS detectado. Ative a opção 'Usar proxy CORS' nas configurações e tente novamente.";
    }
    
    if (onError && error instanceof Error) {
      onError(error);
    }
    
    // Use toast service if available
    if (typeof window !== 'undefined' && window.toast) {
      window.toast({
        title: "Falha na Importação Automática",
        description: errorForUser,
        variant: "destructive"
      });
    }
    
    return {
      success: false,
      message: errorForUser,
      errors: [errorMessage]
    };
  } finally {
    isImportInProgress = false;
  }
};

// Start the scheduled import process
export const startScheduledImport = (
  xmlUrl: string,
  onSuccess?: (result: XmlImportResult) => void,
  onError?: (error: Error) => void
): void => {
  if (importInterval !== null) {
    console.log('Importação programada já em execução');
    return;
  }
  
  console.log('Iniciando importação programada de XML');
  
  // Perform immediate check and import if needed
  if (xmlUrl && isImportNeeded()) {
    importXmlData(xmlUrl, onSuccess, onError);
  }
  
  // Set up hourly check
  importInterval = window.setInterval(() => {
    if (xmlUrl && isImportNeeded()) {
      importXmlData(xmlUrl, onSuccess, onError);
    }
  }, 60000); // Check every minute if import is needed (but only import if an hour has passed)
};

// Stop the scheduled import process
export const stopScheduledImport = (): void => {
  if (importInterval !== null) {
    clearInterval(importInterval);
    importInterval = null;
    console.log('Importação programada de XML interrompida');
  }
};

// Get time of last XML import
export const getLastImportTime = (): Date | null => {
  const lastImportStr = localStorage.getItem('lastXmlImportTime');
  return lastImportStr ? new Date(Number(lastImportStr)) : null;
};

// Declare toast for type safety with window
declare global {
  interface Window {
    toast?: (props: { title: string; description: string; variant?: string }) => void;
  }
}
