
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDownToLine, Info, AlertTriangle, FileText } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface ImportInstructionsProps {
  xmlUrl: string;
}

const ImportInstructions: React.FC<ImportInstructionsProps> = ({ xmlUrl }) => {
  return (
    <Card className="col-span-1 bg-veloz-black border-veloz-yellow/20 overflow-hidden transition-all duration-300 hover:border-veloz-yellow hover:shadow-veloz animate-entrance">
      <CardHeader className="bg-veloz-black border-b border-veloz-yellow/20">
        <CardTitle className="text-veloz-yellow flex items-center gap-2">
          <FileText className="h-5 w-5" /> 
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
            <AccordionItem value="xml-format">
              <AccordionTrigger className="text-sm text-veloz-yellow flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Formatos XML Suportados
              </AccordionTrigger>
              <AccordionContent className="text-sm">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-1">Estruturas XML suportadas:</h4>
                    <ul className="list-disc list-inside text-gray-400">
                      <li>Formato padrão: <code>&lt;vehicle&gt;</code> ou <code>&lt;item&gt;</code> como tags principais</li>
                      <li><strong className="text-veloz-yellow">Formato AD:</strong> <code>&lt;AD&gt;</code> ou <code>&lt;ad&gt;</code> como tags de anúncio</li>
                      <li>Outros formatos comuns: <code>&lt;product&gt;</code>, <code>&lt;car&gt;</code>, <code>&lt;entry&gt;</code></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1">Campos suportados:</h4>
                    <div className="bg-gray-900 p-3 rounded-md text-xs space-y-2">
                      <p className="text-green-400 font-medium">Campos em minúsculas:</p>
                      <p className="text-gray-400"><code>brand</code>, <code>model</code>, <code>year</code>, <code>price</code>, <code>mileage</code>/<code>km</code>, <code>fuelType</code>/<code>fuel</code>, <code>transmission</code>/<code>gear</code>, <code>color</code>, <code>photos</code>/<code>images</code>, <code>description</code></p>
                      
                      <p className="text-green-400 font-medium mt-3">Campos em MAIÚSCULAS (formato AD):</p>
                      <p className="text-yellow-300 font-medium text-xs">Recomendado para melhor compatibilidade</p>
                      <p className="text-gray-400"><code>BRAND</code>/<code>MAKE</code>, <code>MODEL</code>, <code>YEAR</code>, <code>PRICE</code>, <code>KM</code>, <code>FUEL</code>, <code>GEAR</code>, <code>COLOR</code>, <code>IMAGES</code>, <code>DESCRIPTION</code></p>
                      
                      <p className="text-green-400 font-medium mt-3">Campos em português:</p>
                      <p className="text-gray-400"><code>marca</code>, <code>modelo</code>, <code>ano</code>, <code>preco</code>, <code>km</code>, <code>combustivel</code>, <code>cambio</code>, <code>cor</code>, <code>fotos</code>, <code>descricao</code></p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1">Exemplo de formato AD (Recomendado):</h4>
                    <pre className="bg-gray-900 p-3 rounded-md text-xs overflow-x-auto">
{`<ADS>
  <AD>
    <MAKE>Honda</MAKE>
    <MODEL>Civic</MODEL>
    <YEAR>2022</YEAR>
    <PRICE>120000</PRICE>
    <COLOR>Preto</COLOR>
    <KM>15000</KM>
    <FUEL>Gasolina</FUEL>
    <GEAR>Automático</GEAR>
    <IMAGES>
      <IMAGE>https://exemplo.com/foto1.jpg</IMAGE>
      <IMAGE>https://exemplo.com/foto2.jpg</IMAGE>
    </IMAGES>
    <DESCRIPTION>Honda Civic em excelente estado</DESCRIPTION>
  </AD>
  <AD>
    <!-- Outro veículo -->
  </AD>
</ADS>`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-medium mb-1">Estrutura alternativa (minúsculas):</h4>
                    <pre className="bg-gray-900 p-3 rounded-md text-xs overflow-x-auto">
{`<vehicles>
  <vehicle>
    <brand>Toyota</brand>
    <model>Corolla</model>
    <year>2020</year>
    <price>90000</price>
    <km>35000</km>
    <fuel>Flex</fuel>
    <transmission>Manual</transmission>
    <color>Branco</color>
    <photos>
      <photo>https://exemplo.com/foto1.jpg</photo>
      <photo>https://exemplo.com/foto2.jpg</photo>
    </photos>
    <description>Toyota Corolla seminovo</description>
  </vehicle>
</vehicles>`}
                    </pre>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="cors-issues">
              <AccordionTrigger className="text-sm text-veloz-yellow flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Problemas com CORS?
              </AccordionTrigger>
              <AccordionContent className="text-sm">
                <p className="mb-2">Se você encontrar erros "Failed to fetch" ou "CORS error", tente:</p>
                <ol className="list-decimal list-inside space-y-1 text-gray-400">
                  <li>Verificar se o servidor do XML permite acesso de diferentes origens</li>
                  <li>Usar um proxy CORS (ativando a opção acima nas configurações)</li>
                  <li>Hospedar o arquivo XML no mesmo domínio do site</li>
                </ol>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="debugging">
              <AccordionTrigger className="text-sm text-veloz-yellow flex items-center gap-2">
                <Info className="h-4 w-4" />
                Dicas para Resolução de Problemas
              </AccordionTrigger>
              <AccordionContent className="text-sm">
                <ul className="list-disc list-inside space-y-2 text-gray-400">
                  <li>Certifique-se que seu arquivo XML está bem formatado e válido</li>
                  <li>Use as ferramentas de teste para validar seu XML antes da importação</li>
                  <li>Para arquivos grandes, divida-os em partes menores para facilitar o processamento</li>
                  <li>O sistema detecta automaticamente o formato do XML, mas seguir os formatos recomendados garante melhor compatibilidade</li>
                </ul>
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
