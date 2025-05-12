
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Vehicle } from '@/types/vehicle';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import PublicNavbar from '@/components/PublicNavbar';
import Footer from '@/components/Footer';
import { Search, ChevronRight, Filter } from 'lucide-react';

// This would come from an API in a real application
const loadVehicles = (): Vehicle[] => {
  try {
    const storedVehicles = JSON.parse(window.localStorage.getItem('vehicles') || '[]');
    return storedVehicles.filter((v: Vehicle) => v.status === 'available');
  } catch (err) {
    console.error('Error loading vehicles:', err);
    return [];
  }
};

const PublicVehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [brandFilter, setBrandFilter] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [yearRange, setYearRange] = useState({ min: '', max: '' });
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const loadedVehicles = loadVehicles();
      setVehicles(loadedVehicles);
      setFilteredVehicles(loadedVehicles);
      setLoading(false);
    }, 500);
  }, []);
  
  useEffect(() => {
    let results = [...vehicles];
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(
        vehicle => 
          vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) || 
          vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicle.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply brand filter
    if (brandFilter !== 'all') {
      results = results.filter(vehicle => vehicle.brand.toLowerCase() === brandFilter.toLowerCase());
    }
    
    // Apply price range
    if (priceRange.min) {
      results = results.filter(vehicle => vehicle.price >= Number(priceRange.min));
    }
    
    if (priceRange.max) {
      results = results.filter(vehicle => vehicle.price <= Number(priceRange.max));
    }
    
    // Apply year range
    if (yearRange.min) {
      results = results.filter(vehicle => vehicle.year >= Number(yearRange.min));
    }
    
    if (yearRange.max) {
      results = results.filter(vehicle => vehicle.year <= Number(yearRange.max));
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        results.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      default:
        break;
    }
    
    setFilteredVehicles(results);
  }, [searchTerm, sortBy, brandFilter, priceRange, yearRange, vehicles]);
  
  // Get unique brands for the filter
  const uniqueBrands = Array.from(new Set(vehicles.map(vehicle => vehicle.brand)));
  
  const handleReset = () => {
    setSearchTerm('');
    setSortBy('newest');
    setBrandFilter('all');
    setPriceRange({ min: '', max: '' });
    setYearRange({ min: '', max: '' });
  };

  return (
    <div className="min-h-screen bg-veloz-black text-white">
      <PublicNavbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold text-veloz-yellow">Nossos Veículos</h1>
            <p className="text-gray-400">Explore nossa seleção completa de veículos disponíveis</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-300">Encontramos <span className="text-veloz-yellow font-semibold">{filteredVehicles.length}</span> veículos</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters sidebar */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-sm h-fit">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-veloz-yellow flex items-center">
                <Filter className="h-5 w-5 mr-2" /> Filtros
              </h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleReset}
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
          
          {/* Vehicle grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-xl text-gray-400">Carregando veículos...</p>
              </div>
            ) : filteredVehicles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVehicles.map((vehicle) => (
                  <Link to={`/vehicles/${vehicle.id}`} key={vehicle.id} className="group">
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
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 bg-gray-800 rounded-lg p-8 shadow-sm">
                <p className="text-xl text-gray-400 text-center">Nenhum veículo encontrado com os filtros selecionados.</p>
                <Button 
                  variant="outline" 
                  className="mt-4 border-veloz-yellow text-veloz-yellow hover:bg-veloz-yellow/10" 
                  onClick={handleReset}
                >
                  Limpar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PublicVehicles;
