
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { parseVehiclesXml } from '@/utils/xml';
import { XmlImportResult } from '@/types/vehicle';
import { getLastImportTime } from '@/utils/scheduledXmlImport';

export function useXmlImport(xmlUrl: string, onImportComplete: (result: XmlImportResult) => void) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [xmlInfo, setXmlInfo] = useState<{structure?: string, rootElement?: string}>({});
  const [lastImport, setLastImport] = useState<Date | null>(null);
  const [nextImport, setNextImport] = useState<Date | null>(null);

  // Update the last and next import times
  useEffect(() => {
    const updateTimes = () => {
      const last = getLastImportTime();
      setLastImport(last);
      
      if (last) {
        // Next import is 1 hour after the last one
        const next = new Date(last.getTime() + 3600000);
        setNextImport(next);
      }
    };
    
    updateTimes();
    const interval = setInterval(updateTimes, 60000); // Update times every minute
    
    return () => clearInterval(interval);
  }, []);

  const handleImport = async () => {
    if (!xmlUrl) {
      toast({
        title: "Erro",
        description: "Por favor, configure uma URL de XML válida primeiro",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsLoading(true);
      setErrors([]);
      setProgress(10);
      setXmlInfo({});

      // Check if we should use CORS proxy
      const useCorsBypass = localStorage.getItem('useCorsBypass') === 'true';
      const targetUrl = useCorsBypass 
        ? `https://corsproxy.io/?${encodeURIComponent(xmlUrl)}`
        : xmlUrl;
        
      console.log(`Tentando buscar XML de: ${useCorsBypass ? 'CORS proxy -> ' : ''}${xmlUrl}`);

      // Fetch the XML content from the URL
      const response = await fetch(targetUrl, {
        headers: {
          'Accept': 'application/xml, text/xml, */*'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Falha ao buscar XML: ${response.status} ${response.statusText}`);
      }

      setProgress(50);
      const xmlContent = await response.text();
      
      // For debugging, analyze the XML structure
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlContent, "text/xml");
      const rootElement = xmlDoc.documentElement;
      
      setXmlInfo({
        rootElement: rootElement.tagName,
        structure: `Root: <${rootElement.tagName}>, Children: ${Array.from(rootElement.children).map(
          child => `<${child.tagName}>`
        ).join(', ').substring(0, 100)}...`
      });
      
      // For debugging, show a sample of the XML content
      console.log('XML recebido com sucesso. Amostra:', xmlContent.substring(0, 200) + '...');
      console.log('Estrutura XML:', {
        rootElement: rootElement.tagName,
        childElements: Array.from(rootElement.children).map(el => el.tagName)
      });
      
      // Parse the XML content
      const result = await parseVehiclesXml(xmlContent);
      setProgress(90);
      
      setTimeout(() => {
        setIsLoading(false);
        setProgress(100);
        
        if (result.success) {
          toast({
            title: "Importação Bem-Sucedida",
            description: `${result.vehicles?.length} veículos importados com sucesso.`,
          });
          
          // Update last import time display
          setLastImport(new Date());
          setNextImport(new Date(Date.now() + 3600000));
        } else {
          setErrors(result.errors || ['Ocorreu um erro desconhecido']);
          toast({
            title: "Falha na Importação",
            description: result.message,
            variant: "destructive"
          });
        }
        
        onImportComplete(result);
      }, 500);
      
    } catch (error) {
      setIsLoading(false);
      setProgress(0);
      
      const errorMessage = error instanceof Error ? error.message : String(error);
      setErrors([errorMessage]);
      console.error('Erro detalhado ao importar XML:', error);
      
      // Provide more helpful error messages for common issues
      let description = "Ocorreu um erro ao processar os dados XML.";
      
      if (errorMessage.includes('CORS') || errorMessage.includes('Failed to fetch') || errorMessage.includes('Network Error')) {
        const useCorsBypass = localStorage.getItem('useCorsBypass') === 'true';
        description = useCorsBypass 
          ? "Erro de CORS persistiu mesmo com proxy. Tente um arquivo XML hospedado no mesmo domínio ou use um arquivo local."
          : "Erro de CORS detectado. Ative a opção 'Usar proxy CORS' nas configurações e tente novamente.";
      }
      
      toast({
        title: "Falha na Importação",
        description: description,
        variant: "destructive"
      });
    }
  };

  return {
    isLoading,
    progress,
    errors,
    xmlInfo,
    lastImport,
    nextImport,
    handleImport
  };
}
