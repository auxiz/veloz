
import { logParsingDetails } from './logger';

/**
 * Detects and validates the XML structure
 */
export function detectXmlStructure(xmlDoc: Document) {
  // Check for parsing errors
  const parserError = xmlDoc.querySelector('parsererror');
  if (parserError) {
    const errorMessage = parserError.textContent || "Invalid XML format";
    logParsingDetails("XML parsing error", errorMessage);
    
    return {
      success: false,
      errorMessage: "Invalid XML format",
      errors: ["The XML file could not be parsed correctly", errorMessage]
    };
  }
  
  // Log the root element to help with debugging
  const rootElement = xmlDoc.documentElement;
  logParsingDetails("Root element detected", {
    tagName: rootElement.tagName,
    childCount: rootElement.childNodes.length
  });
  
  return {
    success: true,
    rootElement
  };
}

/**
 * Detects vehicle nodes in the XML document with flexible tag matching
 */
export function detectVehicleNodes(xmlDoc: Document, xmlContent: string): {
  success: boolean;
  vehicleNodes?: NodeListOf<Element> | Element[];
  errors?: string[];
} {
  // Get all potential vehicle nodes with flexible detection
  // First try standard <vehicle> tag
  let vehicleNodes = xmlDoc.querySelectorAll('vehicle');
  
  // If no vehicle tags found, try to detect alternative structures
  if (!vehicleNodes || vehicleNodes.length === 0) {
    // Try common alternatives like item, product, car, entry
    const alternativeTags = ['item', 'product', 'car', 'entry', 'veiculo', 'carro', 'AD', 'ad'];
    
    for (const tag of alternativeTags) {
      vehicleNodes = xmlDoc.querySelectorAll(tag);
      if (vehicleNodes && vehicleNodes.length > 0) {
        logParsingDetails(`Found vehicles using alternative tag: ${tag}`);
        break;
      }
    }
    
    // If we still have no nodes, look for any elements that might contain vehicle data
    if (!vehicleNodes || vehicleNodes.length === 0) {
      // Try to find nodes with common vehicle attributes
      const possibleVehicleNodes = xmlDoc.querySelectorAll('*');
      const vehicleCandidates = Array.from(possibleVehicleNodes).filter(node => {
        const hasVehicleAttributes = 
          node.querySelector('brand') || 
          node.querySelector('model') || 
          node.querySelector('make') || 
          node.querySelector('marca') ||
          node.querySelector('modelo') ||
          // Add uppercase variants for AD format
          node.querySelector('BRAND') ||
          node.querySelector('MODEL') ||
          node.querySelector('MAKE') ||
          node.querySelector('TITLE') ||
          node.querySelector('YEAR');
          
        return hasVehicleAttributes;
      });
      
      if (vehicleCandidates.length > 0) {
        vehicleNodes = vehicleCandidates as unknown as NodeListOf<Element>;
        logParsingDetails("Found vehicles by attribute detection");
      }
    }
  }
  
  if (!vehicleNodes || vehicleNodes.length === 0) {
    // Print sample of XML for debugging
    const xmlSample = xmlContent.substring(0, 500) + "...";
    logParsingDetails("No vehicle nodes found in XML", { xmlSample });
    
    return {
      success: false,
      errors: ["XML file does not contain any recognizable vehicle data", 
              "Please check the XML structure and ensure it contains vehicle information"]
    };
  }
  
  logParsingDetails(`Found ${vehicleNodes.length} potential vehicle nodes`);
  
  return {
    success: true,
    vehicleNodes
  };
}
