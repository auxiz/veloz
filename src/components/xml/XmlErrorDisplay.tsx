
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface XmlErrorDisplayProps {
  errors: string[];
}

const XmlErrorDisplay: React.FC<XmlErrorDisplayProps> = ({ errors }) => {
  if (errors.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-red-900/20 border border-red-700 text-red-200 p-3 rounded">
      <h4 className="flex items-center gap-2 font-semibold mb-2">
        <AlertTriangle className="h-4 w-4" />
        <span>Erros detectados:</span>
      </h4>
      <ul className="list-disc list-inside max-h-40 overflow-y-auto">
        {errors.map((error, index) => (
          <li key={index} className="text-sm mb-1">{error}</li>
        ))}
      </ul>
      <div className="mt-3 pt-3 border-t border-red-700/50 text-xs">
        <p>Dica: Se o erro for relacionado a XML, verifique a estrutura do arquivo. O sistema agora suporta tags &lt;AD&gt; e campos em maiúsculas.</p>
      </div>
    </div>
  );
};

export default XmlErrorDisplay;
