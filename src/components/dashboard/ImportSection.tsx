
import React from 'react';
import XmlUploader from '@/components/XmlUploader';
import ImportInstructions from './ImportInstructions';
import XmlUrlConfiguration from './XmlUrlConfiguration';
import { XmlImportResult } from '@/types/vehicle';

interface ImportSectionProps {
  xmlUrl: string;
  onImportComplete: (result: XmlImportResult) => void;
  onXmlUrlChange: (url: string) => void;
}

const ImportSection: React.FC<ImportSectionProps> = ({ xmlUrl, onImportComplete, onXmlUrlChange }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-3">
          <XmlUrlConfiguration 
            currentUrl={xmlUrl} 
            onUrlChange={onXmlUrlChange} 
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ImportInstructions xmlUrl={xmlUrl} />
        
        <div className="col-span-1 md:col-span-2">
          <XmlUploader 
            onImportComplete={onImportComplete}
            xmlUrl={xmlUrl} 
          />
        </div>
      </div>
    </div>
  );
};

export default ImportSection;
