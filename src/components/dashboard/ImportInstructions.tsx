
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDownToLine, Info } from 'lucide-react';

interface ImportInstructionsProps {
  xmlUrl: string;
}

const ImportInstructions: React.FC<ImportInstructionsProps> = ({ xmlUrl }) => {
  return (
    <Card className="col-span-1 bg-gray-800 border-gray-700 overflow-hidden transition-all duration-300 hover:border-veloz-yellow hover:shadow-veloz animate-entrance">
      <CardHeader className="bg-gray-900 border-b border-gray-700">
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
          <li className="pb-2 border-b border-gray-700">Configure a URL do seu arquivo XML na seção acima.</li>
          <li className="pb-2 border-b border-gray-700">O sistema importa automaticamente os dados dos veículos a cada hora.</li>
          <li className="pb-2 border-b border-gray-700">Você também pode importar manualmente clicando no botão "Importar Veículos Agora".</li>
          <li>Novos veículos serão adicionados ao seu inventário sem duplicações.</li>
        </ol>
      </CardContent>
      <CardFooter className="flex items-center gap-2 bg-gray-900 border-t border-gray-700 text-xs text-gray-400">
        <ArrowDownToLine className="h-4 w-4 text-veloz-yellow" />
        <span>URL do feed XML: {xmlUrl ? (xmlUrl.length > 40 ? `${xmlUrl.substring(0, 40)}...` : xmlUrl) : "Não configurado"}</span>
      </CardFooter>
    </Card>
  );
};

export default ImportInstructions;
