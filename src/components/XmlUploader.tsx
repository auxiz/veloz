
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useXmlImport } from '@/hooks/useXmlImport';
import { XmlImportResult } from '@/types/vehicle';
import XmlFileDisplay from '@/components/xml/XmlFileDisplay';
import XmlImportInfo from '@/components/xml/XmlImportInfo';
import XmlStructureInfo from '@/components/xml/XmlStructureInfo';
import XmlErrorDisplay from '@/components/xml/XmlErrorDisplay';
import XmlImportProgress from '@/components/xml/XmlImportProgress';

interface XmlUploaderProps {
  onImportComplete: (result: XmlImportResult) => void;
  xmlUrl: string;
}

const XmlUploader: React.FC<XmlUploaderProps> = ({ onImportComplete, xmlUrl }) => {
  const {
    isLoading,
    progress,
    errors,
    xmlInfo,
    lastImport,
    nextImport,
    handleImport
  } = useXmlImport(xmlUrl, onImportComplete);

  return (
    <Card className="w-full max-w-3xl mx-auto bg-gray-800 border-gray-700 text-gray-100 font-montserrat">
      <CardHeader>
        <CardTitle className="text-xl text-veloz-yellow font-bold">Importar Veículos de XML</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <XmlFileDisplay xmlUrl={xmlUrl} />
          <XmlImportInfo lastImport={lastImport} nextImport={nextImport} />
          <XmlStructureInfo xmlInfo={xmlInfo} />
          <XmlErrorDisplay errors={errors} />
          <XmlImportProgress isLoading={isLoading} progress={progress} />
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
