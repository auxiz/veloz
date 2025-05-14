
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Check, LinkIcon, ShieldAlert, Globe } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface XmlUrlConfigurationProps {
  onUrlChange: (url: string) => void;
  currentUrl: string;
}

const XmlUrlConfiguration: React.FC<XmlUrlConfigurationProps> = ({ onUrlChange, currentUrl }) => {
  const { toast } = useToast();
  const [xmlUrl, setXmlUrl] = useState(currentUrl);
  const [isSaved, setIsSaved] = useState(false);
  const [useCorsBypass, setUseCorsBypass] = useState(() => {
    return localStorage.getItem('useCorsBypass') === 'true';
  });

  useEffect(() => {
    console.log('XmlUrlConfiguration montado. URL atual:', currentUrl);
  }, [currentUrl]);

  const handleSave = () => {
    if (!xmlUrl || !xmlUrl.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira uma URL válida",
        variant: "destructive"
      });
      return;
    }

    // Basic URL validation
    try {
      new URL(xmlUrl);
      localStorage.setItem('xmlUrlConfig', xmlUrl);
      localStorage.setItem('useCorsBypass', useCorsBypass.toString());
      onUrlChange(xmlUrl);
      
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
      
      toast({
        title: "URL Salva",
        description: "A URL do XML foi salva com sucesso.",
      });
      
      console.log('URL salva com sucesso:', xmlUrl, 'CORS bypass:', useCorsBypass);
    } catch (e) {
      toast({
        title: "URL Inválida",
        description: "Por favor, insira uma URL válida incluindo http:// ou https://",
        variant: "destructive"
      });
    }
  };
  
  const handleCorsToggle = (checked: boolean) => {
    setUseCorsBypass(checked);
    localStorage.setItem('useCorsBypass', checked.toString());
    console.log('CORS bypass alterado para:', checked);
  };

  const testConnection = () => {
    if (!xmlUrl) return;
    
    const testUrl = useCorsBypass
      ? `https://corsproxy.io/?${encodeURIComponent(xmlUrl)}`
      : xmlUrl;
    
    toast({
      title: "Testando conexão",
      description: "Aguarde enquanto testamos a conexão com o servidor XML...",
    });
    
    console.log('Testando conexão com:', testUrl);
    
    fetch(testUrl, {
      headers: {
        'Accept': 'application/xml, text/xml, */*'
      }
    })
      .then(response => {
        if (response.ok) {
          toast({
            title: "Conexão bem-sucedida",
            description: "A URL do XML está acessível.",
          });
        } else {
          toast({
            title: "Falha na conexão",
            description: `Erro ${response.status}: ${response.statusText}`,
            variant: "destructive"
          });
        }
      })
      .catch(error => {
        toast({
          title: "Erro de conexão",
          description: `${error.message}. Tente ativar a opção de proxy CORS.`,
          variant: "destructive"
        });
      });
  };

  return (
    <Card className="bg-gray-800 border-gray-700 text-gray-100 animate-entrance">
      <CardHeader>
        <CardTitle className="text-veloz-yellow flex items-center gap-2">
          <LinkIcon className="h-5 w-5" /> 
          <span>Configurar URL do XML</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="xmlUrl" className="text-gray-300">URL do arquivo XML</Label>
            <div className="flex mt-1.5">
              <Input
                id="xmlUrl"
                placeholder="https://seu-servidor.com/veiculos.xml"
                value={xmlUrl}
                onChange={(e) => setXmlUrl(e.target.value)}
                className="bg-gray-900 border-gray-600 text-gray-100"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between bg-gray-900 p-3 rounded-md">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <ShieldAlert className="h-4 w-4 text-veloz-yellow" />
                <Label htmlFor="use-cors-bypass" className="font-medium text-sm text-gray-300">
                  Usar proxy CORS
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0 text-gray-400">
                        ?
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>Ative esta opção se você receber erros CORS ou "Failed to fetch". 
                      Isso encaminhará sua solicitação através de um proxy para contornar restrições de CORS.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-xs text-gray-400">
                Ative se encontrar erros "Failed to fetch" ou "CORS"
              </p>
            </div>
            <Switch 
              id="use-cors-bypass" 
              checked={useCorsBypass}
              onCheckedChange={handleCorsToggle}
            />
          </div>
          
          <div className="flex justify-end">
            <Button 
              onClick={testConnection}
              variant="outline"
              size="sm"
              className="text-xs flex items-center gap-1.5"
            >
              <Globe className="h-3.5 w-3.5" />
              Testar conexão
            </Button>
          </div>
          
          <div className="text-sm text-gray-400">
            <p>Insira a URL do arquivo XML hospedado no seu servidor.</p>
            <p className="mt-1">O sistema importará automaticamente os veículos deste arquivo.</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSave} 
          variant="veloz"
          className="w-full"
          disabled={isSaved}
        >
          {isSaved ? (
            <>
              <Check className="h-4 w-4 mr-1" /> URL Salva
            </>
          ) : (
            "Salvar URL"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default XmlUrlConfiguration;
