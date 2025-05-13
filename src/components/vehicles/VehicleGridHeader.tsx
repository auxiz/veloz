
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BarChart2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface VehicleGridHeaderProps {
  vehicleCount: number;
  totalVehicles: number;
  showCompareButton: boolean;
  compareCount: number;
  pageSize: number;
  setPageSize: (size: number) => void;
}

const VehicleGridHeader: React.FC<VehicleGridHeaderProps> = ({
  vehicleCount,
  totalVehicles,
  showCompareButton,
  compareCount,
  pageSize,
  setPageSize,
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="text-sm text-gray-400">
        Exibindo <span className="text-veloz-yellow font-medium">{vehicleCount}</span> de <span className="text-veloz-yellow font-medium">{totalVehicles}</span> veículos
      </div>
      
      <div className="flex items-center gap-4">
        {showCompareButton && (
          <Link to="/compare">
            <Button 
              variant="veloz" 
              className="flex gap-1 items-center"
            >
              <BarChart2 size={16} /> Comparar ({compareCount})
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
  );
};

export default VehicleGridHeader;
