
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { validateXmlFile, parseVehiclesXml } from '@/utils/xmlParser';
import { XmlImportResult } from '@/types/vehicle';
import { FileUp } from 'lucide-react';

interface XmlUploaderProps {
  onImportComplete: (result: XmlImportResult) => void;
}

const XmlUploader: React.FC<XmlUploaderProps> = ({ onImportComplete }) => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setErrors([]);
    
    if (!selectedFile) {
      return;
    }

    const isValid = await validateXmlFile(selectedFile);
    if (!isValid) {
      setFile(null);
      setErrors(['Invalid file format. Please upload an XML file.']);
      toast({
        title: "Invalid File",
        description: "Please upload a valid XML file.",
        variant: "destructive"
      });
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please select an XML file first.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsUploading(true);
      setProgress(10);

      // Read the file
      const reader = new FileReader();
      
      reader.onload = async (event) => {
        try {
          setProgress(50);
          const xmlContent = event.target?.result as string;
          
          // Parse the XML content
          const result = await parseVehiclesXml(xmlContent);
          setProgress(90);
          
          setTimeout(() => {
            setIsUploading(false);
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
          setIsUploading(false);
          setProgress(0);
          setErrors([error instanceof Error ? error.message : String(error)]);
          toast({
            title: "Import Failed",
            description: "An error occurred while processing the file.",
            variant: "destructive"
          });
        }
      };
      
      reader.onerror = () => {
        setIsUploading(false);
        setProgress(0);
        setErrors(['Failed to read the file.']);
        toast({
          title: "Upload Failed",
          description: "Failed to read the file.",
          variant: "destructive"
        });
      };
      
      reader.readAsText(file);
    } catch (error) {
      setIsUploading(false);
      setProgress(0);
      setErrors([error instanceof Error ? error.message : String(error)]);
      toast({
        title: "Upload Failed",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-gray-800 border-gray-700 text-gray-100">
      <CardHeader>
        <CardTitle className="text-xl text-veloz-yellow">Import Vehicles from XML</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center bg-gray-900 hover:border-veloz-yellow/50 transition-colors">
            <label className="cursor-pointer">
              <div className="flex flex-col items-center space-y-2">
                <FileUp className="h-12 w-12 text-veloz-yellow" />
                <span className="text-gray-400">
                  {file ? file.name : "Click to select an XML file or drag and drop"}
                </span>
              </div>
              <input
                type="file"
                accept=".xml"
                className="hidden"
                onChange={handleFileChange}
                disabled={isUploading}
              />
            </label>
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

          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="bg-gray-700" />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleUpload} 
          disabled={!file || isUploading}
          variant="veloz"
          className="w-full"
        >
          {isUploading ? "Processing..." : "Import Vehicles"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default XmlUploader;
