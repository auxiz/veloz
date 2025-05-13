
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

// Helper function to log detailed parsing information
const logParsingDetails = (message: string, data?: any) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`XML Parser: ${message}`, data);
  }
};

export async function parseVehiclesXml(xmlContent: string): Promise<XmlImportResult> {
  try {
    logParsingDetails("Starting XML parsing");
    
    // Create a DOM parser
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlContent, "text/xml");
    
    // Check for parsing errors
    const parserError = xmlDoc.querySelector('parsererror');
    if (parserError) {
      const errorMessage = parserError.textContent || "Invalid XML format";
      logParsingDetails("XML parsing error", errorMessage);
      
      return {
        success: false,
        message: "Invalid XML format",
        errors: ["The XML file could not be parsed correctly", errorMessage]
      };
    }
    
    // Get all potential vehicle nodes with flexible detection
    // First try standard <vehicle> tag
    let vehicleNodes = xmlDoc.querySelectorAll('vehicle');
    
    // If no vehicle tags found, try to detect alternative structures
    if (!vehicleNodes || vehicleNodes.length === 0) {
      // Try common alternatives like item, product, car, entry
      const alternativeTags = ['item', 'product', 'car', 'entry', 'veiculo', 'carro'];
      
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
            node.querySelector('modelo');
            
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
        message: "No vehicles found in XML",
        errors: ["XML file does not contain any recognizable vehicle data", 
                "Please check the XML structure and ensure it contains vehicle information"]
      };
    }
    
    logParsingDetails(`Found ${vehicleNodes.length} potential vehicle nodes`);
    
    const vehicles: Vehicle[] = [];
    const errors: string[] = [];
    let successfulParsedCount = 0;
    
    // Process each vehicle
    vehicleNodes.forEach((vehicleNode, index) => {
      try {
        // Helper function to get text from various possible node names
        const getNodeTextWithAlternatives = (nodeNames: string[], defaultValue: string = '') => {
          for (const name of nodeNames) {
            const node = vehicleNode.querySelector(name);
            if (node && node.textContent) {
              return node.textContent;
            }
          }
          return defaultValue;
        };
        
        const getNodeNumberWithAlternatives = (nodeNames: string[], defaultValue: number = 0) => {
          const text = getNodeTextWithAlternatives(nodeNames, String(defaultValue));
          const number = parseFloat(text);
          return isNaN(number) ? defaultValue : number;
        };
        
        const brand = getNodeTextWithAlternatives(['brand', 'make', 'manufacturer', 'marca']);
        const model = getNodeTextWithAlternatives(['model', 'name', 'title', 'modelo']);
        const year = getNodeNumberWithAlternatives(['year', 'modelYear', 'ano']);
        const price = getNodeNumberWithAlternatives(['price', 'value', 'cost', 'preco', 'valor']);
        const mileage = getNodeNumberWithAlternatives(['mileage', 'odometer', 'km', 'kilometragem', 'quilometragem'], 0);
        const fuelType = getNodeTextWithAlternatives(['fuelType', 'fuel', 'gas', 'combustivel']);
        const transmission = getNodeTextWithAlternatives(['transmission', 'gearbox', 'cambio']);
        const color = getNodeTextWithAlternatives(['color', 'exteriorColor', 'cor', 'colorExterno']);
        
        // Get photos with various possible structures
        const getNodePhotos = () => {
          // First try direct photo nodes
          const photoNodes = vehicleNode.querySelectorAll('photo, image, picture, img, imagem, foto');
          if (photoNodes && photoNodes.length > 0) {
            const photos: string[] = [];
            photoNodes.forEach(photoNode => {
              // Check if the photo is an attribute or text content
              const photoUrl = photoNode.getAttribute('url') || 
                           photoNode.getAttribute('src') || 
                           photoNode.getAttribute('href') || 
                           photoNode.textContent;
                           
              if (photoUrl) {
                photos.push(photoUrl);
              }
            });
            return photos;
          }
          
          // If no direct nodes, look for a single image or comma-separated list
          const singleImageNode = vehicleNode.querySelector('images, photos, pictures, fotos, imagens');
          if (singleImageNode && singleImageNode.textContent) {
            // Check if it's comma-separated
            const content = singleImageNode.textContent;
            if (content.includes(',')) {
              return content.split(',').map(url => url.trim()).filter(url => url.length > 0);
            } else {
              return [content];
            }
          }
          
          return [];
        };
        
        const getNodeFeatures = () => {
          // Try direct feature nodes
          const featureNodes = vehicleNode.querySelectorAll('feature, option, equipment, opcional, caracteristica');
          if (featureNodes && featureNodes.length > 0) {
            const features: string[] = [];
            featureNodes.forEach(featureNode => {
              if (featureNode.textContent) {
                features.push(featureNode.textContent);
              }
            });
            return features;
          }
          
          // If no direct nodes, look for a single features node with comma-separated list
          const singleFeaturesNode = vehicleNode.querySelector('features, options, equipments, opcionais, caracteristicas');
          if (singleFeaturesNode && singleFeaturesNode.textContent) {
            // Check if it's comma-separated
            const content = singleFeaturesNode.textContent;
            if (content.includes(',')) {
              return content.split(',').map(feature => feature.trim()).filter(feature => feature.length > 0);
            } else if (content.length > 0) {
              return [content];
            }
          }
          
          return [];
        };
        
        // Get description with alternatives
        const description = getNodeTextWithAlternatives([
          'description', 'details', 'comments', 'descricao', 'detalhes', 'comentarios'
        ]);
        
        // Get status with alternatives
        const statusText = getNodeTextWithAlternatives([
          'status', 'availability', 'state', 'disponibilidade', 'estado'
        ], 'available').toLowerCase();
        
        // Map the status text to one of our allowed values
        let status: 'available' | 'sold' | 'reserved' = 'available';
        if (['sold', 'vendido', 'indisponivel', 'unavailable'].includes(statusText)) {
          status = 'sold';
        } else if (['reserved', 'reservado', 'pending', 'pendente'].includes(statusText)) {
          status = 'reserved';
        }
        
        const now = new Date().toISOString();
        
        const vehicle: Vehicle = {
          id: uuidv4(),
          brand: brand || 'Unknown Brand',
          model: model || 'Unknown Model',
          year: year || new Date().getFullYear(),
          price: price || 0,
          mileage: mileage,
          fuelType: fuelType || 'Not specified',
          transmission: transmission || 'Not specified',
          color: color || 'Not specified',
          photos: getNodePhotos(),
          description: description || '',
          features: getNodeFeatures(),
          status: status,
          createdAt: now,
          updatedAt: now
        };
        
        // Validate required fields
        if (!brand && !model) {
          errors.push(`Vehicle at index ${index} is missing both brand and model`);
        } else {
          vehicles.push(vehicle);
          successfulParsedCount++;
        }
      } catch (error) {
        errors.push(`Error parsing vehicle at index ${index}: ${error instanceof Error ? error.message : String(error)}`);
      }
    });
    
    logParsingDetails(`Successfully parsed ${successfulParsedCount} vehicles with ${errors.length} errors`);
    
    if (vehicles.length === 0) {
      return {
        success: false,
        message: "Failed to parse any vehicles from XML",
        errors
      };
    }
    
    return {
      success: true,
      message: `Successfully parsed ${vehicles.length} vehicles${errors.length > 0 ? ` with ${errors.length} warnings` : ''}`,
      count: vehicles.length,
      vehicles,
      errors: errors.length > 0 ? errors : undefined
    };
  } catch (error) {
    logParsingDetails("Error processing XML", error);
    return {
      success: false,
      message: "Error processing XML file",
      errors: [error instanceof Error ? error.message : String(error)]
    };
  }
}
