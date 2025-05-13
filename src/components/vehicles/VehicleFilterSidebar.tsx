
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';

interface VehicleFilterSidebarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  brandFilter: string;
  setBrandFilter: (value: string) => void;
  priceRange: { min: string; max: string };
  setPriceRange: (value: { min: string; max: string }) => void;
  yearRange: { min: string; max: string };
  setYearRange: (value: { min: string; max: string }) => void;
  uniqueBrands: string[];
  onReset: () => void;
}

const VehicleFilterSidebar: React.FC<VehicleFilterSidebarProps> = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  brandFilter,
  setBrandFilter,
  priceRange,
  setPriceRange,
  yearRange,
  setYearRange,
  uniqueBrands,
  onReset
}) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-sm h-fit">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-veloz-yellow flex items-center">
          <Filter className="h-5 w-5 mr-2" /> Filtros
        </h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onReset}
          className="text-gray-300 hover:text-white"
        >
          Limpar
        </Button>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-1">Buscar</label>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Marca, modelo ou descrição"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 bg-gray-700 border-gray-600 text-white"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-1">Ordenar por</label>
        <select
          className="w-full rounded-md bg-gray-700 border-gray-600 text-white py-2 px-3"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Mais recentes</option>
          <option value="oldest">Mais antigos</option>
          <option value="price-low">Menor preço</option>
          <option value="price-high">Maior preço</option>
        </select>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-1">Marca</label>
        <select
          className="w-full rounded-md bg-gray-700 border-gray-600 text-white py-2 px-3"
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
        >
          <option value="all">Todas as marcas</option>
          {uniqueBrands.map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-1">Faixa de Preço</label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
            className="bg-gray-700 border-gray-600 text-white"
          />
          <Input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-1">Ano</label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="De"
            value={yearRange.min}
            onChange={(e) => setYearRange({ ...yearRange, min: e.target.value })}
            className="bg-gray-700 border-gray-600 text-white"
          />
          <Input
            type="number"
            placeholder="Até"
            value={yearRange.max}
            onChange={(e) => setYearRange({ ...yearRange, max: e.target.value })}
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>
      </div>
      
      <Button 
        className="w-full bg-veloz-yellow text-veloz-black hover:bg-veloz-yellow/90"
      >
        <Search className="mr-2 h-4 w-4" /> Aplicar Filtros
      </Button>
    </div>
  );
};

export default VehicleFilterSidebar;
