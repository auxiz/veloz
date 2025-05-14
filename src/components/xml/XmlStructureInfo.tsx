
import React from 'react';
import { Info } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface XmlStructureInfoProps {
  xmlInfo: {
    structure?: string;
    rootElement?: string;
  };
}

const XmlStructureInfo: React.FC<XmlStructureInfoProps> = ({ xmlInfo }) => {
  if (!xmlInfo.structure) {
    return null;
  }
  
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="xml-structure">
          <AccordionTrigger className="flex items-center gap-2 text-sm text-veloz-yellow">
            <Info className="h-4 w-4" />
            Estrutura XML Detectada
          </AccordionTrigger>
          <AccordionContent>
            <div className="text-xs text-gray-300">
              <p className="mb-1"><strong>Elemento Raiz:</strong> {xmlInfo.rootElement}</p>
              <p className="mb-1"><strong>Estrutura:</strong> {xmlInfo.structure}</p>
              <p className="mt-2 text-gray-400">
                Se estiver tendo problemas na importação, verifique se a estrutura do XML corresponde 
                ao formato esperado pelo sistema.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default XmlStructureInfo;
