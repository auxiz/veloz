
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Check, LinkIcon } from 'lucide-react';

interface XmlUrlConfigurationProps {
  onUrlChange: (url: string) => void;
  currentUrl: string;
}

const XmlUrlConfiguration: React.FC<XmlUrlConfigurationProps> = ({ onUrlChange, currentUrl }) => {
  const { toast } = useToast();
  const [xmlUrl, setXmlUrl] = useState(currentUrl);
  const [isSaved, setIsSaved] = useState(false);

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
      onUrlChange(xmlUrl);
      
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
      
      toast({
        title: "URL Salva",
        description: "A URL do XML foi salva com sucesso.",
      });
    } catch (e) {
      toast({
        title: "URL Inválida",
        description: "Por favor, insira uma URL válida incluindo http:// ou https://",
        variant: "destructive"
      });
    }
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
          <div className="text-sm text-gray-400">
            <p>Insira a URL do arquivo XML hospedado no seu servidor Hostinger.</p>
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
