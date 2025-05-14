
import { parseVehiclesXml } from './xml';
import { XmlImportResult } from '../types/vehicle';

/**
 * Test utility to validate XML parsing functionality,
 * particularly for the AD tags format.
 */
export const testXmlParser = async (xmlContent: string): Promise<{
  result: XmlImportResult;
  diagnostics: {
    detectedFormat: string;
    fieldsFound: string[];
    parsingTime: number;
    vehicleCount: number;
  }
}> => {
  console.log('Testing XML Parser with sample data...');

  // Record parsing time
  const startTime = performance.now();
  
  // Parse the XML content
  const result = await parseVehiclesXml(xmlContent);
  
  const endTime = performance.now();
  const parsingTime = endTime - startTime;
  
  // Identify the format based on the structure
  let detectedFormat = 'Unknown';
  let fieldsFound: string[] = [];
  
  if (xmlContent.includes('<AD>') || xmlContent.includes('<ADS>')) {
    detectedFormat = 'AD Tags Format';
    
    // Extract field names to verify what was found
    const fieldRegex = /<([A-Z0-9_]+)>/g;
    const matches = [...xmlContent.matchAll(fieldRegex)];
    fieldsFound = [...new Set(matches.map(m => m[1]))];
  } else if (xmlContent.includes('<vehicle>')) {
    detectedFormat = 'Standard Vehicle Format';
  } else if (xmlContent.includes('<item>')) {
    detectedFormat = 'Item Format';
  }
  
  const diagnostics = {
    detectedFormat,
    fieldsFound,
    parsingTime: parseFloat(parsingTime.toFixed(2)),
    vehicleCount: result.vehicles?.length || 0
  };
  
  console.log('XML Parser Test Results:', {
    success: result.success,
    message: result.message,
    diagnostics
  });
  
  return {
    result,
    diagnostics
  };
};

/**
 * Creates a sample XML string with AD tags format for testing
 */
export const createSampleAdXml = (vehicleCount: number = 3): string => {
  const generateVehicle = (index: number) => {
    return `
    <AD>
      <ID>${1000 + index}</ID>
      <TITLE>Chevrolet Celta ${2010 + index}</TITLE>
      <MAKE>Chevrolet</MAKE>
      <MODEL>Celta ${index % 2 === 0 ? 'Spirit' : 'Life'}</MODEL>
      <YEAR>${2010 + index}</YEAR>
      <PRICE>${25000 + (index * 1000)}.00</PRICE>
      <MILEAGE>${50000 + (index * 10000)}</MILEAGE>
      <FUEL>${index % 2 === 0 ? 'Flex' : 'Gasolina'}</FUEL>
      <GEAR>${index % 2 === 0 ? 'Manual' : 'Automático'}</GEAR>
      <COLOR>${index % 3 === 0 ? 'Preto' : index % 3 === 1 ? 'Prata' : 'Branco'}</COLOR>
      <DESCRIPTION>Veículo em excelente estado. Completo, com ar condicionado e direção hidráulica.</DESCRIPTION>
      <FEATURES>Ar condicionado, Direção hidráulica, Vidros elétricos, Travas elétricas</FEATURES>
      <PHOTOS>https://example.com/photo1.jpg,https://example.com/photo2.jpg</PHOTOS>
      <STATUS>available</STATUS>
    </AD>`;
  };

  const vehicles = Array.from({ length: vehicleCount }, (_, i) => generateVehicle(i)).join('\n');
  
  return `
  <?xml version="1.0" encoding="UTF-8"?>
  <ADS>
    ${vehicles}
  </ADS>
  `;
};

/**
 * Simple function to run a test of the XML parser with a sample AD format XML
 */
export const runXmlParserTest = async (): Promise<XmlImportResult> => {
  const sampleXml = createSampleAdXml(3);
  const { result } = await testXmlParser(sampleXml);
  
  if (result.success) {
    console.log('✅ XML Parser successfully parsed AD format');
    console.log('Vehicles found:', result.vehicles?.length);
    console.log('Sample vehicle:', result.vehicles?.[0]);
  } else {
    console.error('❌ XML Parser failed to parse AD format');
    console.error('Errors:', result.errors);
  }
  
  return result;
};
