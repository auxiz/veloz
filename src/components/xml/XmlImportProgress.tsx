
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface XmlImportProgressProps {
  isLoading: boolean;
  progress: number;
}

const XmlImportProgress: React.FC<XmlImportProgressProps> = ({ isLoading, progress }) => {
  if (!isLoading) {
    return null;
  }
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Buscando e processando dados XML...</span>
        <span>{progress}%</span>
      </div>
      <Progress value={progress} className="bg-gray-700" />
    </div>
  );
};

export default XmlImportProgress;
