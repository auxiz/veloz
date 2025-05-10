
export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  color: string;
  photos: string[];
  description: string;
  features: string[];
  status: 'available' | 'sold' | 'reserved';
  createdAt: string;
  updatedAt: string;
}

export interface XmlImportResult {
  success: boolean;
  message: string;
  count?: number;
  vehicles?: Vehicle[];
  errors?: string[];
}
