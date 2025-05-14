
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { createSampleAdXml, runXmlParserTest, testXmlParser } from '@/utils/xmlParserTester';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, ArrowDown, CheckCircle, XCircle } from 'lucide-react';

const XmlParserTester: React.FC = () => {
  const { toast } = useToast();
  const [xmlContent, setXmlContent] = useState(createSampleAdXml(1));
  const [testResult, setTestResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('sample');

  const handleTest = async () => {
    setIsLoading(true);
    try {
      const { result, diagnostics } = await testXmlParser(xmlContent);
      setTestResult({
        result,
        diagnostics
      });
      
      toast({
        title: result.success ? 'XML parser test succeeded' : 'XML parser test failed',
        description: result.message,
        variant: result.success ? 'default' : 'destructive'
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      toast({
        title: 'Test error',
        description: errorMessage,
        variant: 'destructive'
      });
      setTestResult({
        error: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleQuickTest = async () => {
    setIsLoading(true);
    try {
      const result = await runXmlParserTest();
      toast({
        title: result.success ? 'Quick test succeeded' : 'Quick test failed',
        description: result.message,
        variant: result.success ? 'default' : 'destructive'
      });
    } catch (error) {
      toast({
        title: 'Quick test error',
        description: error instanceof Error ? error.message : String(error),
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full bg-gray-800 border-gray-700 text-gray-100">
      <CardHeader>
        <CardTitle className="text-xl text-veloz-yellow font-bold flex items-center gap-2">
          <Code className="h-5 w-5" /> XML Parser Tester
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleQuickTest} 
              disabled={isLoading}
              className="text-sm"
            >
              Run Quick Test with Sample AD Format
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setXmlContent(createSampleAdXml(3))}
            >
              Reset to Sample
            </Button>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-gray-900">
              <TabsTrigger value="sample">Test XML</TabsTrigger>
              <TabsTrigger value="results">Test Results</TabsTrigger>
            </TabsList>
            
            <TabsContent value="sample" className="space-y-4 pt-4">
              <Textarea 
                value={xmlContent}
                onChange={(e) => setXmlContent(e.target.value)}
                className="min-h-[300px] font-mono text-sm bg-gray-900"
                placeholder="Paste XML content here..."
              />
            </TabsContent>
            
            <TabsContent value="results" className="min-h-[300px] pt-4">
              {testResult ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex-shrink-0">
                      {testResult.result?.success ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-500" />
                      )}
                    </div>
                    <div>
                      <h3 className={`font-medium ${testResult.result?.success ? 'text-green-400' : 'text-red-400'}`}>
                        {testResult.result?.success ? 'Success' : 'Failed'}
                      </h3>
                      <p className="text-sm text-gray-300">{testResult.result?.message}</p>
                    </div>
                  </div>
                  
                  {testResult.diagnostics && (
                    <div className="bg-gray-900 p-4 rounded-md">
                      <h3 className="font-medium text-veloz-yellow mb-2">Diagnostics</h3>
                      <dl className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <dt className="text-gray-400">Detected Format:</dt>
                          <dd>{testResult.diagnostics.detectedFormat}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-400">Parsing Time:</dt>
                          <dd>{testResult.diagnostics.parsingTime} ms</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-400">Vehicles Found:</dt>
                          <dd>{testResult.diagnostics.vehicleCount}</dd>
                        </div>
                      </dl>
                      
                      {testResult.diagnostics.fieldsFound?.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm text-gray-400 mb-1">Fields Detected:</h4>
                          <div className="flex flex-wrap gap-2">
                            {testResult.diagnostics.fieldsFound.map((field: string) => (
                              <span 
                                key={field}
                                className="bg-gray-700 text-xs text-gray-300 px-2 py-1 rounded"
                              >
                                {field}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {testResult.result?.vehicles && testResult.result.vehicles.length > 0 && (
                    <div className="mt-4">
                      <h3 className="font-medium text-veloz-yellow mb-2">First Vehicle Parsed:</h3>
                      <pre className="bg-gray-900 p-4 rounded-md overflow-x-auto text-xs">
                        {JSON.stringify(testResult.result.vehicles[0], null, 2)}
                      </pre>
                    </div>
                  )}
                  
                  {testResult.result?.errors && testResult.result.errors.length > 0 && (
                    <div className="mt-4">
                      <h3 className="font-medium text-red-400 mb-2">Errors:</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {testResult.result.errors.map((error: string, index: number) => (
                          <li key={index} className="text-red-300">{error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[300px] text-gray-400">
                  <ArrowDown className="h-8 w-8 mb-2" />
                  <p>Run the XML parser test to see results</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleTest}
          disabled={isLoading || !xmlContent}
          variant="veloz"
          className="w-full font-bold"
        >
          {isLoading ? "Testing..." : "Test XML Parser"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default XmlParserTester;
