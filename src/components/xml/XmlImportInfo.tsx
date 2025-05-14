
import React from 'react';
import { Clock } from 'lucide-react';
import { format } from 'date-fns';

interface XmlImportInfoProps {
  lastImport: Date | null;
  nextImport: Date | null;
}

const XmlImportInfo: React.FC<XmlImportInfoProps> = ({ lastImport, nextImport }) => {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
      <div className="flex items-start">
        <Clock className="h-5 w-5 mr-2 text-veloz-yellow flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-sm font-medium text-gray-300">Cronograma de Importação Automática</h3>
          <p className="text-xs text-gray-400 mt-1">
            O sistema importa automaticamente novos dados de veículos a cada hora.
          </p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="bg-gray-800 p-2 rounded text-center">
              <p className="text-xs text-gray-400">Última Importação</p>
              <p className="text-sm text-veloz-yellow">
                {lastImport 
                  ? format(lastImport, 'dd/MM/yyyy HH:mm') 
                  : 'Nunca'}
              </p>
            </div>
            <div className="bg-gray-800 p-2 rounded text-center">
              <p className="text-xs text-gray-400">Próxima Importação</p>
              <p className="text-sm text-veloz-yellow">
                {nextImport 
                  ? format(nextImport, 'dd/MM/yyyy HH:mm')
                  : 'Em breve'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default XmlImportInfo;
