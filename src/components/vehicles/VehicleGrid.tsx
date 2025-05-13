
import React from 'react';
import { Link } from 'react-router-dom';
import { Vehicle } from '@/types/vehicle';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, Compare } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useComparisonStore } from '@/store/comparisonStore';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface VehicleGridProps {
  vehicles: Vehicle[];
  isLoading: boolean;
  onResetFilters: () => void;
  // Pagination props
  currentPage?: number;
  setCurrentPage?: (page: number) => void;
  pageSize?: number;
  setPageSize?: (size: number) => void;
  totalPages?: number;
  totalVehicles?: number;
}

const VehicleGrid: React.FC<VehicleGridProps> = ({ 
  vehicles, 
  isLoading, 
  onResetFilters,
  currentPage = 1,
  setCurrentPage = () => {},
  pageSize = 12,
  setPageSize = () => {},
  totalPages = 1,
  totalVehicles = 0
}) => {
  const { toast } = useToast();
  const { vehiclesToCompare, addVehicleToCompare, removeVehicleFromCompare, maxVehiclesReached } = useComparisonStore();

  const handleCompareToggle = (vehicle: Vehicle, checked: boolean) => {
    if (checked) {
      const added = addVehicleToCompare(vehicle);
      if (!added) {
        toast({
          title: "Limite atingido",
          description: "Você só pode comparar até 3 veículos ao mesmo tempo.",
          variant: "destructive"
        });
      }
    } else {
      removeVehicleFromCompare(vehicle.id);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-gray-400">Carregando veículos...</p>
      </div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-gray-800 rounded-lg p-8 shadow-sm">
        <p className="text-xl text-gray-400 text-center">
          Nenhum veículo encontrado com os filtros selecionados.
        </p>
        <Button 
          variant="outline" 
          className="mt-4 border-veloz-yellow text-veloz-yellow hover:bg-veloz-yellow/10" 
          onClick={onResetFilters}
        >
          Limpar filtros
        </Button>
      </div>
    );
  }

  // Generate an array of page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Show max 5 page numbers
    
    if (totalPages <= maxPagesToShow) {
      // If we have 5 or fewer pages, show all of them
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);
      
      // Calculate start and end of the visible page numbers
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if we're near the beginning or end
      if (currentPage <= 2) {
        endPage = 4;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 3;
      }
      
      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pageNumbers.push('ellipsis1');
      }
      
      // Add the visible page numbers
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push('ellipsis2');
      }
      
      // Always include last page if more than 1 page
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  const showCompareButton = vehiclesToCompare.length >= 2;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-400">
          Exibindo <span className="text-veloz-yellow font-medium">{vehicles.length}</span> de <span className="text-veloz-yellow font-medium">{totalVehicles}</span> veículos
        </div>
        
        <div className="flex items-center gap-4">
          {showCompareButton && (
            <Link to="/compare">
              <Button 
                variant="veloz" 
                className="flex gap-1 items-center"
              >
                <Compare size={16} /> Comparar ({vehiclesToCompare.length})
              </Button>
            </Link>
          )}
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Veículos por página:</span>
            <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
              <SelectTrigger className="w-[70px] bg-gray-800 border-gray-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="12">12</SelectItem>
                <SelectItem value="24">24</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Vehicle grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="group relative">
            <div className="absolute top-2 left-2 z-10 bg-black/70 rounded-full p-1">
              <Checkbox
                checked={vehiclesToCompare.some(v => v.id === vehicle.id)}
                onCheckedChange={(checked) => handleCompareToggle(vehicle, checked === true)}
                disabled={maxVehiclesReached && !vehiclesToCompare.some(v => v.id === vehicle.id)}
                className="data-[state=checked]:bg-veloz-yellow data-[state=checked]:text-veloz-black border-veloz-yellow"
              />
            </div>
            
            <Link to={`/vehicles/${vehicle.id}`} className="block">
              <Card className="h-full overflow-hidden hover:border-veloz-yellow transition-colors bg-gray-800 border-gray-700 text-white">
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-900">
                  {vehicle.photos && vehicle.photos.length > 0 ? (
                    <img 
                      src={vehicle.photos[0]} 
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-800">
                      <p className="text-gray-500">Sem imagem</p>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-veloz-yellow px-2 py-1 rounded text-sm font-medium text-veloz-black">
                    {vehicle.status === 'available' ? 'Disponível' : vehicle.status}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-white">{vehicle.brand} {vehicle.model}</h3>
                  <div className="flex justify-between mt-2">
                    <p className="text-gray-400">{vehicle.year}</p>
                    <p className="font-bold text-lg text-veloz-yellow">R$ {vehicle.price.toLocaleString('pt-BR')}</p>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-block bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                      {vehicle.transmission}
                    </span>
                    <span className="inline-block bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                      {vehicle.fuelType}
                    </span>
                    <span className="inline-block bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                      {vehicle.mileage.toLocaleString('pt-BR')} km
                    </span>
                  </div>
                  <Button 
                    className="w-full mt-4 bg-veloz-yellow text-veloz-black hover:bg-veloz-yellow/90 flex items-center justify-center"
                  >
                    Saiba Mais <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                  className={`${currentPage === 1 ? 'opacity-50 pointer-events-none' : 'cursor-pointer'} bg-gray-800 border-gray-700 text-white`}
                />
              </PaginationItem>

              {getPageNumbers().map((page, index) => (
                <PaginationItem key={index}>
                  {page === 'ellipsis1' || page === 'ellipsis2' ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink 
                      isActive={page === currentPage}
                      onClick={() => typeof page === 'number' && setCurrentPage(page)}
                      className={`
                        cursor-pointer
                        ${page === currentPage 
                          ? 'bg-veloz-yellow text-veloz-black border-veloz-yellow' 
                          : 'bg-gray-800 text-white border-gray-700'}
                      `}
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext 
                  onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                  className={`${currentPage === totalPages ? 'opacity-50 pointer-events-none' : 'cursor-pointer'} bg-gray-800 border-gray-700 text-white`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default VehicleGrid;
