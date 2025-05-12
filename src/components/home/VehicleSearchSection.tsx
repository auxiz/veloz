
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchParamsType {
  brand: string;
  model: string;
  priceMin: string;
  priceMax: string;
  yearMin: string;
  yearMax: string;
}

interface VehicleSearchSectionProps {
  searchParams: SearchParamsType;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchSubmit: (e: React.FormEvent) => void;
}

const VehicleSearchSection = ({ 
  searchParams, 
  handleSearchChange, 
  handleSearchSubmit 
}: VehicleSearchSectionProps) => {
  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-veloz-yellow">Encontre o Veículo Ideal</h2>
          <form onSubmit={handleSearchSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-300 mb-1">Marca</label>
                <Input
                  id="brand"
                  name="brand"
                  value={searchParams.brand}
                  onChange={handleSearchChange}
                  placeholder="Ex: Toyota, Honda, Ford..."
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>
              <div>
                <label htmlFor="model" className="block text-sm font-medium text-gray-300 mb-1">Modelo</label>
                <Input
                  id="model"
                  name="model"
                  value={searchParams.model}
                  onChange={handleSearchChange}
                  placeholder="Ex: Corolla, Civic, Focus..."
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Preço</label>
                <div className="flex gap-2">
                  <Input
                    id="priceMin"
                    name="priceMin"
                    value={searchParams.priceMin}
                    onChange={handleSearchChange}
                    placeholder="Mínimo"
                    type="number"
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                  <Input
                    id="priceMax"
                    name="priceMax"
                    value={searchParams.priceMax}
                    onChange={handleSearchChange}
                    placeholder="Máximo"
                    type="number"
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Ano</label>
                <div className="flex gap-2">
                  <Input
                    id="yearMin"
                    name="yearMin"
                    value={searchParams.yearMin}
                    onChange={handleSearchChange}
                    placeholder="De"
                    type="number"
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                  <Input
                    id="yearMax"
                    name="yearMax"
                    value={searchParams.yearMax}
                    onChange={handleSearchChange}
                    placeholder="Até"
                    type="number"
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-veloz-yellow text-veloz-black hover:bg-veloz-yellow/90 py-3 font-medium text-lg"
            >
              <Search className="mr-2 h-5 w-5" /> Buscar Veículos
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default VehicleSearchSection;
