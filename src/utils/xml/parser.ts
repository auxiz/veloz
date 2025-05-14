
import { Vehicle, XmlImportResult } from "../../types/vehicle";
import { logParsingDetails } from "./logger";
import { detectXmlStructure, detectVehicleNodes } from "./structureDetection";
import { mapNodeToVehicle } from "./vehicleMapper";

/**
 * Main function to parse vehicles from XML content
 */
export async function parseVehiclesXml(xmlContent: string): Promise<XmlImportResult> {
  try {
    logParsingDetails("Starting XML parsing");
    
    // Create a DOM parser
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlContent, "text/xml");
    
    // Check XML structure
    const structureResult = detectXmlStructure(xmlDoc);
    if (!structureResult.success) {
      return {
        success: false,
        message: structureResult.errorMessage || "Invalid XML format",
        errors: structureResult.errors
      };
    }
    
    // Detect vehicle nodes
    const nodesResult = detectVehicleNodes(xmlDoc, xmlContent);
    if (!nodesResult.success || !nodesResult.vehicleNodes) {
      return {
        success: false,
        message: "No vehicles found in XML",
        errors: nodesResult.errors
      };
    }
    
    const vehicleNodes = nodesResult.vehicleNodes;
    const vehicles: Vehicle[] = [];
    const errors: string[] = [];
    let successfulParsedCount = 0;
    
    // Process each vehicle
    vehicleNodes.forEach((vehicleNode, index) => {
      const mapResult = mapNodeToVehicle(vehicleNode, index);
      
      if (mapResult.success && mapResult.vehicle) {
        vehicles.push(mapResult.vehicle);
        successfulParsedCount++;
      } else if (mapResult.error) {
        errors.push(mapResult.error);
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
