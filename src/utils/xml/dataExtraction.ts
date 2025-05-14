
/**
 * Helper functions for extracting vehicle data from XML elements
 */

/**
 * Extract text from vehicle node using multiple possible field names
 */
export const getNodeTextWithAlternatives = (
  vehicleNode: Element, 
  nodeNames: string[], 
  defaultValue: string = ''
): string => {
  // First check for uppercase variants (for AD format)
  const upperNodeNames = nodeNames.map(name => name.toUpperCase());
  const allNodeNames = [...nodeNames, ...upperNodeNames];
  
  for (const name of allNodeNames) {
    const node = vehicleNode.querySelector(name);
    if (node && node.textContent) {
      return node.textContent;
    }
  }
  return defaultValue;
};

/**
 * Extract number from vehicle node using multiple possible field names
 */
export const getNodeNumberWithAlternatives = (
  vehicleNode: Element,
  nodeNames: string[], 
  defaultValue: number = 0
): number => {
  // Include uppercase variants
  const upperNodeNames = nodeNames.map(name => name.toUpperCase());
  const allNodeNames = [...nodeNames, ...upperNodeNames];
  
  const text = getNodeTextWithAlternatives(vehicleNode, allNodeNames, String(defaultValue));
  // Clean up number format (remove currency symbols, etc)
  const cleanNumber = text.replace(/[^\d.,]/g, '').replace(',', '.');
  const number = parseFloat(cleanNumber);
  return isNaN(number) ? defaultValue : number;
};

/**
 * Extract brand and model from title if available
 */
export const extractBrandModelFromTitle = (title: string): { brand: string, model: string } => {
  let extractedBrand = '';
  let extractedModel = '';
  
  if (title) {
    // Simple extraction - first word could be brand, rest could be model
    const titleParts = title.trim().split(' ');
    if (titleParts.length > 0) {
      extractedBrand = titleParts[0];
      extractedModel = titleParts.slice(1).join(' ');
    }
  }
  
  return { brand: extractedBrand, model: extractedModel };
};

/**
 * Extract photos from vehicle node with various possible structures
 */
export const getNodePhotos = (vehicleNode: Element): string[] => {
  // First try direct photo nodes - include uppercase variants
  const photoNodes = vehicleNode.querySelectorAll('photo, image, picture, img, imagem, foto, PHOTO, IMAGE, PICTURES, IMAGES');
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
  const singleImageNode = vehicleNode.querySelector('images, photos, pictures, fotos, imagens, IMAGES, PHOTOS');
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

/**
 * Extract features from vehicle node with various possible structures
 */
export const getNodeFeatures = (vehicleNode: Element): string[] => {
  // Try direct feature nodes - include uppercase variants
  const featureNodes = vehicleNode.querySelectorAll('feature, option, equipment, opcional, caracteristica, FEATURE, OPTION, EQUIPMENT');
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
  const singleFeaturesNode = vehicleNode.querySelector('features, options, equipments, opcionais, caracteristicas, FEATURES, OPTIONS');
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

/**
 * Map status text to one of our standard values
 */
export const mapStatusText = (statusText: string): 'available' | 'sold' | 'reserved' => {
  statusText = statusText.toLowerCase();
  
  if (['sold', 'vendido', 'indisponivel', 'unavailable'].includes(statusText)) {
    return 'sold';
  } else if (['reserved', 'reservado', 'pending', 'pendente'].includes(statusText)) {
    return 'reserved';
  }
  
  return 'available';
};
