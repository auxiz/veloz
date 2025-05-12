
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { parseVehiclesXml } from '@/utils/xmlParser';
import { XmlImportResult } from '@/types/vehicle';
import { FileUp } from 'lucide-react';

interface XmlUploaderProps {
  onImportComplete: (result: XmlImportResult) => void;
}

const XmlUploader: React.FC<XmlUploaderProps> = ({ onImportComplete }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const xmlUrl = "http://app.revendamais.com.br/application/index.php/apiGeneratorXml/generator/sitedaloja/e64ccd1ada81eb551e2537627b54e6de11998.xml";

  const handleImport = async () => {
    try {
      setIsLoading(true);
      setErrors([]);
      setProgress(10);

      // Fetch the XML content from the URL
      const response = await fetch(xmlUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch XML: ${response.status} ${response.statusText}`);
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
            title: "Import Successful",
            description: `${result.vehicles?.length} vehicles imported successfully.`,
          });
        } else {
          setErrors(result.errors || ['An unknown error occurred']);
          toast({
            title: "Import Failed",
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
        title: "Import Failed",
        description: "An error occurred while processing the XML data.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-gray-800 border-gray-700 text-gray-100 font-montserrat">
      <CardHeader>
        <CardTitle className="text-xl text-veloz-yellow font-bold">Import Vehicles from XML</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center bg-gray-900 hover:border-veloz-yellow/50 transition-colors">
            <div className="flex flex-col items-center space-y-2">
              <FileUp className="h-12 w-12 text-veloz-yellow" />
              <div className="text-gray-400">
                <p className="mb-2">XML URL configured:</p>
                <p className="text-veloz-yellow text-sm break-all">{xmlUrl}</p>
              </div>
            </div>
          </div>

          {errors.length > 0 && (
            <div className="bg-red-900/20 border border-red-700 text-red-200 p-3 rounded">
              <h4 className="font-semibold mb-1">Errors:</h4>
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
                <span>Fetching and processing XML data...</span>
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
          disabled={isLoading}
          variant="veloz"
          className="w-full font-bold"
        >
          {isLoading ? "Processing..." : "Import Vehicles from XML"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default XmlUploader;
