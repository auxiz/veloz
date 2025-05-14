
import React from 'react';
import { FileUp } from 'lucide-react';

interface XmlFileDisplayProps {
  xmlUrl: string;
}

const XmlFileDisplay: React.FC<XmlFileDisplayProps> = ({ xmlUrl }) => {
  return (
    <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center bg-gray-900 hover:border-veloz-yellow/50 transition-colors">
      <div className="flex flex-col items-center space-y-2">
        <FileUp className="h-12 w-12 text-veloz-yellow" />
        <div className="text-gray-400">
          <p className="mb-2">{xmlUrl ? 'URL do XML configurada:' : 'URL do XML não configurada'}</p>
          <p className="text-veloz-yellow text-sm break-all">
            {xmlUrl || 'Configure a URL do arquivo XML nas configurações'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default XmlFileDisplay;
