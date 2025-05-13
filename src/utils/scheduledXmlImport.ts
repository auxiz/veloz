
import { parseVehiclesXml } from './xmlParser';
import { XmlImportResult, Vehicle } from '@/types/vehicle';
import { toast } from '@/hooks/use-toast';

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
    console.error('Failed to save vehicles to localStorage:', error);
  }
};

// Function to load vehicles from localStorage
export const loadVehiclesFromLocalStorage = (): Vehicle[] => {
  try {
    const storedVehicles = localStorage.getItem('vehicles');
    return storedVehicles ? JSON.parse(storedVehicles) : [];
  } catch (error) {
    console.error('Failed to load vehicles from localStorage:', error);
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
  if (isImportInProgress) {
    console.log('Import already in progress, skipping');
    return null;
  }
  
  isImportInProgress = true;
  
  try {
    console.log('Fetching XML from:', xmlUrl);
    const response = await fetch(xmlUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch XML: ${response.status} ${response.statusText}`);
    }
    
    const xmlContent = await response.text();
    const result = await parseVehiclesXml(xmlContent);
    
    if (result.success && result.vehicles) {
      // Save to localStorage
      saveVehiclesToLocalStorage(result.vehicles);
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      toast({
        title: "Auto Import Successful",
        description: `${result.vehicles.length} vehicles imported from XML.`
      });
    } else {
      if (onError) {
        onError(new Error(result.message));
      }
      
      toast({
        title: "Auto Import Failed",
        description: result.message,
        variant: "destructive"
      });
    }
    
    return result;
  } catch (error) {
    console.error('Error importing XML data:', error);
    
    if (onError && error instanceof Error) {
      onError(error);
    }
    
    toast({
      title: "Auto Import Failed",
      description: error instanceof Error ? error.message : "Unknown error occurred",
      variant: "destructive"
    });
    
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error occurred",
      errors: [error instanceof Error ? error.message : String(error)]
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
    console.log('Scheduled import already running');
    return;
  }
  
  console.log('Starting scheduled XML import');
  
  // Perform immediate check and import if needed
  if (isImportNeeded()) {
    importXmlData(xmlUrl, onSuccess, onError);
  }
  
  // Set up hourly check
  importInterval = window.setInterval(() => {
    if (isImportNeeded()) {
      importXmlData(xmlUrl, onSuccess, onError);
    }
  }, 60000); // Check every minute if import is needed (but only import if an hour has passed)
};

// Stop the scheduled import process
export const stopScheduledImport = (): void => {
  if (importInterval !== null) {
    clearInterval(importInterval);
    importInterval = null;
    console.log('Scheduled XML import stopped');
  }
};

// Get time of last XML import
export const getLastImportTime = (): Date | null => {
  const lastImportStr = localStorage.getItem('lastXmlImportTime');
  return lastImportStr ? new Date(Number(lastImportStr)) : null;
};

