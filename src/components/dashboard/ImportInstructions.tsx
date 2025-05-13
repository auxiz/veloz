
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDownToLine, Info, AlertTriangle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface ImportInstructionsProps {
  xmlUrl: string;
}

const ImportInstructions: React.FC<ImportInstructionsProps> = ({ xmlUrl }) => {
  return (
    <Card className="col-span-1 bg-veloz-black border-veloz-yellow/20 overflow-hidden transition-all duration-300 hover:border-veloz-yellow hover:shadow-veloz animate-entrance">
      <CardHeader className="bg-veloz-black border-b border-veloz-yellow/20">
        <CardTitle className="text-veloz-yellow flex items-center gap-2">
          <Info className="h-5 w-5" /> 
          <span>Instruções de Importação XML</span>
        </CardTitle>
        <CardDescription className="text-gray-400">
          Importe veículos de arquivos XML
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <ol className="list-decimal list-inside space-y-3 text-gray-300">
          <li className="pb-2 border-b border-veloz-yellow/10">Configure a URL do seu arquivo XML na seção acima.</li>
          <li className="pb-2 border-b border-veloz-yellow/10">O sistema importa automaticamente os dados dos veículos a cada hora.</li>
          <li className="pb-2 border-b border-veloz-yellow/10">Você também pode importar manualmente clicando no botão "Importar Veículos Agora".</li>
          <li>Novos veículos serão adicionados ao seu inventário sem duplicações.</li>
        </ol>
        
        <div className="mt-4 pt-4 border-t border-veloz-yellow/10">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="cors-issues">
              <AccordionTrigger className="text-sm text-veloz-yellow flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Problemas com CORS?
              </AccordionTrigger>
              <AccordionContent className="text-sm">
                <p className="mb-2">Se você encontrar erros "Failed to fetch" ou "CORS error", tente:</p>
                <ol className="list-decimal list-inside space-y-1 text-gray-400">
                  <li>Verificar se o servidor do XML permite acesso de diferentes origens</li>
                  <li>Usar um proxy CORS (ativando a opção abaixo)</li>
                  <li>Hospedar o arquivo XML no mesmo domínio do site</li>
                </ol>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="xml-format">
              <AccordionTrigger className="text-sm text-veloz-yellow flex items-center gap-2">
                <Info className="h-4 w-4" />
                Formato XML esperado
              </AccordionTrigger>
              <AccordionContent className="text-sm">
                <p className="mb-2">O arquivo XML deve conter elementos &lt;vehicle&gt; com campos como:</p>
                <p className="text-gray-400">brand, model, year, price, mileage, fuelType, transmission, color, photos, description, features, status</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </CardContent>
      <CardFooter className="flex items-center gap-2 bg-veloz-black border-t border-veloz-yellow/20 text-xs text-gray-400">
        <ArrowDownToLine className="h-4 w-4 text-veloz-yellow" />
        <span>URL do feed XML: {xmlUrl ? (xmlUrl.length > 40 ? `${xmlUrl.substring(0, 40)}...` : xmlUrl) : "Não configurado"}</span>
      </CardFooter>
    </Card>
  );
};

export default ImportInstructions;
