
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { parseVehiclesXml } from '@/utils/xmlParser';
import { XmlImportResult } from '@/types/vehicle';
import { FileUp, Clock, AlertTriangle, Info } from 'lucide-react';
import { getLastImportTime, isImportNeeded } from '@/utils/scheduledXmlImport';
import { format } from 'date-fns';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface XmlUploaderProps {
  onImportComplete: (result: XmlImportResult) => void;
  xmlUrl: string;
}

const XmlUploader: React.FC<XmlUploaderProps> = ({ onImportComplete, xmlUrl }) => {
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
        
      console.log(`Fetching XML from: ${useCorsBypass ? 'CORS proxy -> ' : ''}${xmlUrl}`);

      // Fetch the XML content from the URL
      const response = await fetch(targetUrl);
      
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
      if (process.env.NODE_ENV !== 'production') {
        console.log('XML Content (sample):', xmlContent.substring(0, 200) + '...');
        console.log('XML Structure:', {
          rootElement: rootElement.tagName,
          childElements: Array.from(rootElement.children).map(el => el.tagName)
        });
      }
      
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
      
      // Provide more helpful error messages for common issues
      let description = "Ocorreu um erro ao processar os dados XML.";
      
      if (errorMessage.includes('CORS') || errorMessage.includes('Failed to fetch') || errorMessage.includes('Network Error')) {
        const useCorsBypass = localStorage.getItem('useCorsBypass') === 'true';
        description = useCorsBypass 
          ? "Erro de CORS persistiu mesmo com proxy. Tente um arquivo XML hospedado no mesmo domínio."
          : "Erro de CORS detectado. Ative a opção 'Usar proxy CORS' nas configurações e tente novamente.";
      }
      
      toast({
        title: "Falha na Importação",
        description: description,
        variant: "destructive"
      });
      
      console.error('Erro ao importar dados XML:', error);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-gray-800 border-gray-700 text-gray-100 font-montserrat">
      <CardHeader>
        <CardTitle className="text-xl text-veloz-yellow font-bold">Importar Veículos de XML</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center bg-gray-900 hover:border-veloz-yellow/50 transition-colors">
            <div className="flex flex-col items-center space-y-2">
              <FileUp className="h-12 w-12 text-veloz-yellow" />
              <div className="text-gray-400">
                <p className="mb-2">{xmlUrl ? 'URL do XML configurada:' : 'URL do XML não configurada'}</p>
                <p className="text-veloz-yellow text-sm break-all">
                  {xmlUrl || 'Configure a URL do arquivo XML nas configurações'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <div className="flex items-start">
              <Clock className="h-5 w-5 mr-2 text-veloz-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-sm font-medium text-gray-300">Cronograma de Importação Automática</h3>
                <p className="text-xs text-gray-400 mt-1">
                  O sistema importa automaticamente novos dados de veículos a cada hora.
                </p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="bg-gray-800 p-2 rounded text-center">
                    <p className="text-xs text-gray-400">Última Importação</p>
                    <p className="text-sm text-veloz-yellow">
                      {lastImport 
                        ? format(lastImport, 'dd/MM/yyyy HH:mm') 
                        : 'Nunca'}
                    </p>
                  </div>
                  <div className="bg-gray-800 p-2 rounded text-center">
                    <p className="text-xs text-gray-400">Próxima Importação</p>
                    <p className="text-sm text-veloz-yellow">
                      {nextImport 
                        ? format(nextImport, 'dd/MM/yyyy HH:mm')
                        : 'Em breve'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {xmlInfo.structure && (
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <Accordion type="single" collapsible>
                <AccordionItem value="xml-structure">
                  <AccordionTrigger className="flex items-center gap-2 text-sm text-veloz-yellow">
                    <Info className="h-4 w-4" />
                    Estrutura XML Detectada
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="text-xs text-gray-300">
                      <p className="mb-1"><strong>Elemento Raiz:</strong> {xmlInfo.rootElement}</p>
                      <p className="mb-1"><strong>Estrutura:</strong> {xmlInfo.structure}</p>
                      <p className="mt-2 text-gray-400">
                        Se estiver tendo problemas na importação, verifique se a estrutura do XML corresponde 
                        ao formato esperado pelo sistema.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}

          {errors.length > 0 && (
            <div className="bg-red-900/20 border border-red-700 text-red-200 p-3 rounded">
              <h4 className="flex items-center gap-2 font-semibold mb-2">
                <AlertTriangle className="h-4 w-4" />
                <span>Erros detectados:</span>
              </h4>
              <ul className="list-disc list-inside max-h-40 overflow-y-auto">
                {errors.map((error, index) => (
                  <li key={index} className="text-sm mb-1">{error}</li>
                ))}
              </ul>
              <div className="mt-3 pt-3 border-t border-red-700/50 text-xs">
                <p>Dica: Se o erro for relacionado a XML, verifique a estrutura do arquivo. O sistema agora suporta tags &lt;AD&gt; e campos em maiúsculas.</p>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Buscando e processando dados XML...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="bg-gray-700" />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleImport} 
          disabled={isLoading || !xmlUrl}
          variant="veloz"
          className="w-full font-bold"
        >
          {isLoading ? "Processando..." : "Importar Veículos Agora"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default XmlUploader;
