
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { parseVehiclesXml } from '@/utils/xml';
import { Check, AlertTriangle } from 'lucide-react';

const TestingTools = () => {
  const { toast } = useToast();
  const [xmlSample, setXmlSample] = useState(`<vehicles>
  <vehicle>
    <brand>Toyota</brand>
    <model>Corolla</model>
    <year>2022</year>
    <price>120000</price>
  </vehicle>
</vehicles>`);
  const [parseResult, setParseResult] = useState<any>(null);
  const [testMode, setTestMode] = useState('parser');
  const [cssTestActive, setCssTestActive] = useState(false);

  const handleParseTest = async () => {
    try {
      const result = await parseVehiclesXml(xmlSample);
      setParseResult(result);
      
      toast({
        title: result.success ? "Análise bem-sucedida" : "Falha na análise",
        description: result.message,
        variant: result.success ? "default" : "destructive"
      });
    } catch (error) {
      setParseResult({ success: false, message: String(error) });
      toast({
        title: "Erro ao analisar XML",
        description: String(error),
        variant: "destructive"
      });
    }
  };

  const handleCssTest = () => {
    setCssTestActive(!cssTestActive);
    toast({
      title: "Teste de CSS",
      description: "Mostrando cores do tema Veloz para diagnóstico",
    });
  };

  return (
    <Card className="bg-veloz-black border border-gray-800 text-white">
      <CardHeader>
        <CardTitle className="text-veloz-yellow">Ferramentas de Diagnóstico</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ToggleGroup type="single" value={testMode} onValueChange={(value) => value && setTestMode(value)}>
          <ToggleGroupItem value="parser" className="text-xs">Teste do Parser XML</ToggleGroupItem>
          <ToggleGroupItem value="css" className="text-xs">Teste de Estilos CSS</ToggleGroupItem>
          <ToggleGroupItem value="network" className="text-xs">Teste de Rede</ToggleGroupItem>
        </ToggleGroup>
        
        {testMode === 'parser' && (
          <div className="space-y-4">
            <div>
              <Label>Amostra de XML para teste</Label>
              <Textarea 
                className="font-mono text-xs h-[200px] bg-gray-900 border-gray-700"
                value={xmlSample}
                onChange={(e) => setXmlSample(e.target.value)}
              />
            </div>
            <Button onClick={handleParseTest} variant="outline" className="w-full">Testar Parser</Button>
            
            {parseResult && (
              <div className={`p-3 rounded-md text-sm ${parseResult.success ? 'bg-green-900/20 border border-green-800' : 'bg-red-900/20 border border-red-800'}`}>
                <div className="flex items-center gap-2 mb-2">
                  {parseResult.success ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  )}
                  <span>{parseResult.message}</span>
                </div>
                {parseResult.vehicles && (
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Veículos encontrados: {parseResult.vehicles.length}</p>
                    <pre className="text-xs bg-gray-950 p-2 rounded overflow-auto max-h-[200px]">
                      {JSON.stringify(parseResult.vehicles[0], null, 2)}
                    </pre>
                  </div>
                )}
                {parseResult.errors && parseResult.errors.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-red-400 mb-1">Erros:</p>
                    <ul className="text-xs list-disc list-inside">
                      {parseResult.errors.map((err: string, i: number) => (
                        <li key={i} className="text-red-400">{err}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        
        {testMode === 'css' && (
          <div className="space-y-4">
            <Button onClick={handleCssTest} variant="outline" className="w-full">
              {cssTestActive ? "Esconder Diagnóstico CSS" : "Mostrar Diagnóstico CSS"}
            </Button>
            
            {cssTestActive && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-veloz-black p-4 rounded flex items-center justify-center">
                    bg-veloz-black
                  </div>
                  <div className="bg-veloz-yellow p-4 rounded text-veloz-black flex items-center justify-center">
                    bg-veloz-yellow
                  </div>
                  <div className="bg-veloz-dark-gray p-4 rounded flex items-center justify-center">
                    bg-veloz-dark-gray
                  </div>
                  <div className="bg-veloz-light-gray p-4 rounded text-veloz-black flex items-center justify-center">
                    bg-veloz-light-gray
                  </div>
                </div>
                
                <div className="p-4 border border-veloz-yellow rounded">
                  <p className="text-veloz-yellow">Text em text-veloz-yellow</p>
                  <p className="text-veloz-white">Text em text-veloz-white</p>
                </div>
                
                <Button variant="veloz" className="mr-2">Botão variant="veloz"</Button>
                <Button variant="veloz-outline">Botão variant="veloz-outline"</Button>
              </div>
            )}
          </div>
        )}
        
        {testMode === 'network' && (
          <div className="space-y-4">
            <div>
              <Label>URL para teste</Label>
              <Input 
                className="font-mono text-xs bg-gray-900 border-gray-700"
                placeholder="https://exemplo.com/api.xml"
                id="test-url"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  const url = (document.getElementById('test-url') as HTMLInputElement).value;
                  if (url) {
                    window.open(url, '_blank');
                    toast({
                      title: "Abrindo URL",
                      description: `Abrindo ${url} em uma nova aba`,
                    });
                  }
                }}
              >
                Abrir URL
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  const url = (document.getElementById('test-url') as HTMLInputElement).value;
                  if (url) {
                    console.log(`Testando CORS para: ${url}`);
                    fetch(url)
                      .then(response => {
                        console.log('Resposta CORS:', response);
                        toast({
                          title: "Teste de CORS bem-sucedido",
                          description: `URL acessível: ${response.status} ${response.statusText}`,
                        });
                      })
                      .catch(error => {
                        console.error('Erro CORS:', error);
                        toast({
                          title: "Erro de CORS",
                          description: String(error),
                          variant: "destructive"
                        });
                      });
                  }
                }}
              >
                Testar CORS
              </Button>
            </div>
          </div>
        )}
        
        <div className="text-xs text-gray-500 italic mt-4">
          Essas ferramentas são destinadas apenas para fins de diagnóstico e testes.
          Pressione Alt+T para mostrar/esconder esta seção.
        </div>
      </CardContent>
    </Card>
  );
};

export default TestingTools;
