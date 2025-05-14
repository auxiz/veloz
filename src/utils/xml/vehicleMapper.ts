
import { Vehicle } from '../../types/vehicle';
import { v4 as uuidv4 } from 'uuid';
import { 
  getNodeTextWithAlternatives,
  getNodeNumberWithAlternatives,
  extractBrandModelFromTitle,
  getNodePhotos,
  getNodeFeatures,
  mapStatusText
} from './dataExtraction';

/**
 * Maps XML node data to a Vehicle object
 */
export function mapNodeToVehicle(vehicleNode: Element, index: number): {
  success: boolean;
  vehicle?: Vehicle;
  error?: string;
} {
  try {
    // Special handling for TITLE tag (common in AD format)
    const title = getNodeTextWithAlternatives(vehicleNode, ['TITLE', 'title']);
    
    // Try to extract brand and model from title if available
    const { brand: extractedBrand, model: extractedModel } = extractBrandModelFromTitle(title);
    
    const brand = getNodeTextWithAlternatives(vehicleNode, ['brand', 'make', 'manufacturer', 'marca']) || extractedBrand;
    const model = getNodeTextWithAlternatives(vehicleNode, ['model', 'name', 'title', 'modelo']) || extractedModel;
    const year = getNodeNumberWithAlternatives(vehicleNode, ['year', 'modelYear', 'ano']);
    const price = getNodeNumberWithAlternatives(vehicleNode, ['price', 'value', 'cost', 'preco', 'valor']);
    const mileage = getNodeNumberWithAlternatives(vehicleNode, ['mileage', 'odometer', 'km', 'kilometragem', 'quilometragem'], 0);
    const fuelType = getNodeTextWithAlternatives(vehicleNode, ['fuelType', 'fuel', 'gas', 'combustivel']);
    const transmission = getNodeTextWithAlternatives(vehicleNode, ['transmission', 'gearbox', 'cambio', 'gear']);
    const color = getNodeTextWithAlternatives(vehicleNode, ['color', 'exteriorColor', 'cor', 'colorExterno']);
    
    // Get description with alternatives
    const description = getNodeTextWithAlternatives(vehicleNode, [
      'description', 'details', 'comments', 'descricao', 'detalhes', 'comentarios', 'DESCRIPTION'
    ]);
    
    // Get status with alternatives
    const statusText = getNodeTextWithAlternatives(vehicleNode, [
      'status', 'availability', 'state', 'disponibilidade', 'estado', 'STATUS'
    ], 'available');
    
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
      photos: getNodePhotos(vehicleNode),
      description: description || '',
      features: getNodeFeatures(vehicleNode),
      status: mapStatusText(statusText),
      createdAt: now,
      updatedAt: now
    };
    
    // Validate required fields
    if (!brand && !model) {
      return {
        success: false,
        error: `Vehicle at index ${index} is missing both brand and model`
      };
    }
    
    return {
      success: true,
      vehicle
    };
  } catch (error) {
    return {
      success: false,
      error: `Error parsing vehicle at index ${index}: ${error instanceof Error ? error.message : String(error)}`
    };
  }
}
