
import React from 'react';
import XmlUploader from '@/components/XmlUploader';
import ImportInstructions from './ImportInstructions';
import { XmlImportResult } from '@/types/vehicle';

interface ImportSectionProps {
  xmlUrl: string;
  onImportComplete: (result: XmlImportResult) => void;
}

const ImportSection: React.FC<ImportSectionProps> = ({ xmlUrl, onImportComplete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ImportInstructions xmlUrl={xmlUrl} />
      
      <div className="col-span-1 md:col-span-2">
        <XmlUploader onImportComplete={onImportComplete} />
      </div>
    </div>
  );
};

export default ImportSection;
