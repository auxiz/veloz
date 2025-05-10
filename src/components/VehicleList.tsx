
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import VehicleCard from './VehicleCard';
import VehicleDetails from './VehicleDetails';
import { Vehicle } from '@/types/vehicle';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Search } from 'lucide-react';

interface VehicleListProps {
  vehicles: Vehicle[];
  onVehicleUpdate: (updatedVehicle: Vehicle) => void;
  onVehicleDelete: (vehicleId: string) => void;
}

const VehicleList: React.FC<VehicleListProps> = ({
  vehicles,
  onVehicleUpdate,
  onVehicleDelete
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleViewVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsViewDialogOpen(true);
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsEditDialogOpen(true);
  };

  const handleSaveVehicle = (updatedVehicle: Vehicle) => {
    onVehicleUpdate(updatedVehicle);
    setIsEditDialogOpen(false);
  };

  const handleDeleteVehicle = () => {
    if (selectedVehicle) {
      onVehicleDelete(selectedVehicle.id);
      setIsViewDialogOpen(false);
      setIsEditDialogOpen(false);
    }
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearchTerm = 
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) || 
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatusFilter = statusFilter === 'all' || vehicle.status === statusFilter;
    
    return matchesSearchTerm && matchesStatusFilter;
  });

  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'price_high':
        return b.price - a.price;
      case 'price_low':
        return a.price - b.price;
      case 'year_new':
        return b.year - a.year;
      case 'year_old':
        return a.year - b.year;
      default:
        return 0;
    }
  });

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search by brand, model or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <div className="flex gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="reserved">Reserved</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="price_high">Price: High to Low</SelectItem>
              <SelectItem value="price_low">Price: Low to High</SelectItem>
              <SelectItem value="year_new">Year: Newest</SelectItem>
              <SelectItem value="year_old">Year: Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {sortedVehicles.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No vehicles match your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onView={handleViewVehicle}
              onEdit={handleEditVehicle}
            />
          ))}
        </div>
      )}

      {/* View Vehicle Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedVehicle && (
            <VehicleDetails
              vehicle={selectedVehicle}
              mode="view"
              onEdit={() => {
                setIsViewDialogOpen(false);
                setIsEditDialogOpen(true);
              }}
              onDelete={handleDeleteVehicle}
              onSave={() => {}}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Vehicle Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedVehicle && (
            <VehicleDetails
              vehicle={selectedVehicle}
              mode="edit"
              onSave={handleSaveVehicle}
              onDelete={handleDeleteVehicle}
              onEdit={() => {}}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VehicleList;
