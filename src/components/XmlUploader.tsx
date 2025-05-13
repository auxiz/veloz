
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { parseVehiclesXml } from '@/utils/xmlParser';
import { XmlImportResult } from '@/types/vehicle';
import { FileUp, Clock } from 'lucide-react';
import { getLastImportTime, isImportNeeded } from '@/utils/scheduledXmlImport';
import { format } from 'date-fns';

interface XmlUploaderProps {
  onImportComplete: (result: XmlImportResult) => void;
  xmlUrl: string;
}

const XmlUploader: React.FC<XmlUploaderProps> = ({ onImportComplete, xmlUrl }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
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

      // Fetch the XML content from the URL
      const response = await fetch(xmlUrl);
      
      if (!response.ok) {
        throw new Error(`Falha ao buscar XML: ${response.status} ${response.statusText}`);
      }

      setProgress(50);
      const xmlContent = await response.text();
      
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
      setErrors([error instanceof Error ? error.message : String(error)]);
      toast({
        title: "Falha na Importação",
        description: "Ocorreu um erro ao processar os dados XML.",
        variant: "destructive"
      });
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

          {errors.length > 0 && (
            <div className="bg-red-900/20 border border-red-700 text-red-200 p-3 rounded">
              <h4 className="font-semibold mb-1">Erros:</h4>
              <ul className="list-disc list-inside">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
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
