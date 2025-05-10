
import { Vehicle, XmlImportResult } from "../types/vehicle";
import { v4 as uuidv4 } from 'uuid';

export function validateXmlFile(file: File): Promise<boolean> {
  return new Promise((resolve) => {
    // Basic validation by checking file type
    if (!file.name.toLowerCase().endsWith('.xml')) {
      resolve(false);
      return;
    }
    
    // More advanced validation could be added here
    resolve(true);
  });
}

export async function parseVehiclesXml(xmlContent: string): Promise<XmlImportResult> {
  try {
    // Create a DOM parser
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlContent, "text/xml");
    
    // Check for parsing errors
    const parserError = xmlDoc.querySelector('parsererror');
    if (parserError) {
      return {
        success: false,
        message: "Invalid XML format",
        errors: ["The XML file could not be parsed correctly"]
      };
    }
    
    // Get all vehicle nodes
    const vehicleNodes = xmlDoc.querySelectorAll('vehicle');
    if (!vehicleNodes || vehicleNodes.length === 0) {
      return {
        success: false,
        message: "No vehicles found in XML",
        errors: ["XML file does not contain any vehicle data"]
      };
    }
    
    const vehicles: Vehicle[] = [];
    const errors: string[] = [];
    
    // Process each vehicle
    vehicleNodes.forEach((vehicleNode, index) => {
      try {
        const getNodeText = (nodeName: string, defaultValue: string = '') => {
          const node = vehicleNode.querySelector(nodeName);
          return node ? node.textContent || defaultValue : defaultValue;
        };
        
        const getNodeNumber = (nodeName: string, defaultValue: number = 0) => {
          const text = getNodeText(nodeName, String(defaultValue));
          const number = parseFloat(text);
          return isNaN(number) ? defaultValue : number;
        };
        
        const getNodePhotos = () => {
          const photoNodes = vehicleNode.querySelectorAll('photo');
          const photos: string[] = [];
          photoNodes.forEach(photoNode => {
            if (photoNode.textContent) {
              photos.push(photoNode.textContent);
            }
          });
          return photos;
        };
        
        const getNodeFeatures = () => {
          const featureNodes = vehicleNode.querySelectorAll('feature');
          const features: string[] = [];
          featureNodes.forEach(featureNode => {
            if (featureNode.textContent) {
              features.push(featureNode.textContent);
            }
          });
          return features;
        };
        
        const now = new Date().toISOString();
        
        const vehicle: Vehicle = {
          id: uuidv4(),
          brand: getNodeText('brand'),
          model: getNodeText('model'),
          year: getNodeNumber('year'),
          price: getNodeNumber('price'),
          mileage: getNodeNumber('mileage'),
          fuelType: getNodeText('fuelType'),
          transmission: getNodeText('transmission'),
          color: getNodeText('color'),
          photos: getNodePhotos(),
          description: getNodeText('description'),
          features: getNodeFeatures(),
          status: getNodeText('status', 'available') as 'available' | 'sold' | 'reserved',
          createdAt: now,
          updatedAt: now
        };
        
        // Validate required fields
        if (!vehicle.brand || !vehicle.model || vehicle.year <= 0 || vehicle.price <= 0) {
          errors.push(`Vehicle at index ${index} is missing required fields or has invalid data`);
        } else {
          vehicles.push(vehicle);
        }
      } catch (error) {
        errors.push(`Error parsing vehicle at index ${index}: ${error instanceof Error ? error.message : String(error)}`);
      }
    });
    
    if (vehicles.length === 0) {
      return {
        success: false,
        message: "Failed to parse any vehicles from XML",
        errors
      };
    }
    
    return {
      success: true,
      message: `Successfully parsed ${vehicles.length} vehicles`,
      count: vehicles.length,
      vehicles,
      errors: errors.length > 0 ? errors : undefined
    };
  } catch (error) {
    return {
      success: false,
      message: "Error processing XML file",
      errors: [error instanceof Error ? error.message : String(error)]
    };
  }
}
