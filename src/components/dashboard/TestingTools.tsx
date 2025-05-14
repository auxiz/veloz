
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import XmlParserTester from '@/components/xml/XmlParserTester';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BugPlay } from 'lucide-react';

interface TestingToolsProps {
  isVisible?: boolean;
}

const TestingTools: React.FC<TestingToolsProps> = ({ isVisible = true }) => {
  if (!isVisible) return null;
  
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-veloz-yellow flex items-center gap-2">
          <BugPlay className="h-5 w-5" />
          Testing Tools
        </CardTitle>
        <CardDescription className="text-gray-400">
          Utilities to test system components
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="xml-parser">
          <TabsList className="mb-4 bg-gray-900">
            <TabsTrigger value="xml-parser">XML Parser</TabsTrigger>
          </TabsList>
          <TabsContent value="xml-parser">
            <XmlParserTester />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TestingTools;
