
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface ImportInstructionsProps {
  xmlUrl: string;
}

const ImportInstructions: React.FC<ImportInstructionsProps> = ({ xmlUrl }) => {
  return (
    <Card className="col-span-1 bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-veloz-yellow">XML Import Instructions</CardTitle>
        <CardDescription className="text-gray-400">
          Connected to RevendaMais XML Feed
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ol className="list-decimal list-inside space-y-2 text-gray-300">
          <li>The system automatically imports vehicle data every hour.</li>
          <li>You can also manually import by clicking the import button.</li>
          <li>New vehicles will be added to your inventory.</li>
          <li>Existing vehicles will remain unchanged.</li>
        </ol>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-gray-400">
          XML feed URL: {xmlUrl.substring(0, 50)}...
        </p>
      </CardFooter>
    </Card>
  );
};

export default ImportInstructions;
