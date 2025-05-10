
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Vehicle } from '@/types/vehicle';
import { Pencil, Trash } from 'lucide-react';

interface VehicleDetailsProps {
  vehicle: Vehicle;
  mode: 'view' | 'edit';
  onSave: (vehicle: Vehicle) => void;
  onDelete: (vehicleId: string) => void;
  onEdit: () => void;
}

const VehicleDetails: React.FC<VehicleDetailsProps> = ({
  vehicle,
  mode,
  onSave,
  onDelete,
  onEdit
}) => {
  const [editedVehicle, setEditedVehicle] = useState<Vehicle>({ ...vehicle });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedVehicle({ ...editedVehicle, [name]: value });
  };
  
  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setEditedVehicle({ ...editedVehicle, [name]: parseFloat(value) });
  };
  
  const handleStatusChange = (status: string) => {
    setEditedVehicle({ 
      ...editedVehicle, 
      status: status as 'available' | 'sold' | 'reserved'
    });
  };

  const isViewMode = mode === 'view';
  
  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {isViewMode ? `${vehicle.brand} ${vehicle.model}` : 'Edit Vehicle'}
        </h2>
        
        <div className="flex gap-2">
          {isViewMode ? (
            <Button onClick={onEdit} variant="outline">
              <Pencil className="h-4 w-4 mr-2" /> Edit
            </Button>
          ) : (
            <Button onClick={() => onSave(editedVehicle)} variant="default">
              Save Changes
            </Button>
          )}
          
          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Trash className="h-4 w-4 mr-2" /> Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
              </DialogHeader>
              <p>Are you sure you want to delete this vehicle?</p>
              <p className="font-semibold">{vehicle.brand} {vehicle.model} ({vehicle.year})</p>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => {
                    onDelete(vehicle.id);
                    setDeleteDialogOpen(false);
                  }}
                >
                  Delete
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {/* Images section */}
      <div>
        <h3 className="text-lg font-medium mb-2">Photos</h3>
        {vehicle.photos && vehicle.photos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {vehicle.photos.map((photo, index) => (
              <div 
                key={index} 
                className="aspect-square bg-gray-100 relative rounded overflow-hidden"
              >
                <img 
                  src={photo} 
                  alt={`${vehicle.brand} ${vehicle.model} - Photo ${index+1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-100 p-8 text-center rounded">
            <p className="text-gray-500">No photos available</p>
          </div>
        )}
      </div>
      
      <Separator />
      
      {/* Details section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Basic Information</h3>
          
          <div className="space-y-4">
            {isViewMode ? (
              <>
                <div>
                  <p className="text-sm text-gray-500">Brand</p>
                  <p className="font-medium">{vehicle.brand}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Model</p>
                  <p className="font-medium">{vehicle.model}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Year</p>
                  <p className="font-medium">{vehicle.year}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-bold text-lg">{formatCurrency(vehicle.price)}</p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="brand" className="text-sm text-gray-500 block mb-1">
                    Brand
                  </label>
                  <Input
                    id="brand"
                    name="brand"
                    value={editedVehicle.brand}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="model" className="text-sm text-gray-500 block mb-1">
                    Model
                  </label>
                  <Input
                    id="model"
                    name="model"
                    value={editedVehicle.model}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="year" className="text-sm text-gray-500 block mb-1">
                    Year
                  </label>
                  <Input
                    id="year"
                    name="year"
                    type="number"
                    value={editedVehicle.year}
                    onChange={handleNumberChange}
                  />
                </div>
                <div>
                  <label htmlFor="price" className="text-sm text-gray-500 block mb-1">
                    Price
                  </label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={editedVehicle.price}
                    onChange={handleNumberChange}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Additional Details</h3>
          
          <div className="space-y-4">
            {isViewMode ? (
              <>
                <div>
                  <p className="text-sm text-gray-500">Mileage</p>
                  <p className="font-medium">{vehicle.mileage.toLocaleString()} km</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fuel Type</p>
                  <p className="font-medium">{vehicle.fuelType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Transmission</p>
                  <p className="font-medium">{vehicle.transmission}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Color</p>
                  <p className="font-medium">{vehicle.color}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <Badge className={
                    vehicle.status === 'available' ? 'bg-green-500' :
                    vehicle.status === 'reserved' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }>
                    {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                  </Badge>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="mileage" className="text-sm text-gray-500 block mb-1">
                    Mileage (km)
                  </label>
                  <Input
                    id="mileage"
                    name="mileage"
                    type="number"
                    value={editedVehicle.mileage}
                    onChange={handleNumberChange}
                  />
                </div>
                <div>
                  <label htmlFor="fuelType" className="text-sm text-gray-500 block mb-1">
                    Fuel Type
                  </label>
                  <Input
                    id="fuelType"
                    name="fuelType"
                    value={editedVehicle.fuelType}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="transmission" className="text-sm text-gray-500 block mb-1">
                    Transmission
                  </label>
                  <Input
                    id="transmission"
                    name="transmission"
                    value={editedVehicle.transmission}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="color" className="text-sm text-gray-500 block mb-1">
                    Color
                  </label>
                  <Input
                    id="color"
                    name="color"
                    value={editedVehicle.color}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="status" className="text-sm text-gray-500 block mb-1">
                    Status
                  </label>
                  <Select 
                    value={editedVehicle.status} 
                    onValueChange={handleStatusChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="reserved">Reserved</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      <Separator />
      
      {/* Description */}
      <div>
        <h3 className="text-lg font-medium mb-2">Description</h3>
        {isViewMode ? (
          <div className="bg-gray-50 p-4 rounded">
            <p>{vehicle.description}</p>
          </div>
        ) : (
          <Textarea
            name="description"
            value={editedVehicle.description}
            onChange={handleChange}
            rows={5}
          />
        )}
      </div>
      
      {/* Features */}
      <div>
        <h3 className="text-lg font-medium mb-2">Features</h3>
        {vehicle.features && vehicle.features.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {vehicle.features.map((feature, index) => (
              <Badge key={index} variant="secondary">
                {feature}
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No features specified</p>
        )}
      </div>
    </div>
  );
};

export default VehicleDetails;
