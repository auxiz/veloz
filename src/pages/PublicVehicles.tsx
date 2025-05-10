
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Vehicle } from '@/types/vehicle';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import PublicNavbar from '@/components/PublicNavbar';

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
  }, [searchTerm, sortBy, brandFilter, vehicles]);
  
  // Get unique brands for the filter
  const uniqueBrands = Array.from(new Set(vehicles.map(vehicle => vehicle.brand)));
  
  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNavbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold">Nossos Veículos</h1>
            <p className="text-gray-600">Explore nossa seleção completa de veículos disponíveis</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-500">Encontramos {filteredVehicles.length} veículos</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters sidebar */}
          <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
            <h2 className="text-lg font-semibold mb-4">Filtros</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
              <Input
                type="text"
                placeholder="Marca, modelo ou descrição"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Ordenar por</label>
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Mais recentes</option>
                <option value="oldest">Mais antigos</option>
                <option value="price-low">Menor preço</option>
                <option value="price-high">Maior preço</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
              >
                <option value="all">Todas as marcas</option>
                {uniqueBrands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full mt-2"
              onClick={() => {
                setSearchTerm('');
                setSortBy('newest');
                setBrandFilter('all');
              }}
            >
              Limpar filtros
            </Button>
          </div>
          
          {/* Vehicle grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-xl text-gray-500">Carregando veículos...</p>
              </div>
            ) : filteredVehicles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVehicles.map((vehicle) => (
                  <Link to={`/vehicles/${vehicle.id}`} key={vehicle.id} className="hover:opacity-95 transition-opacity">
                    <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                        {vehicle.photos && vehicle.photos.length > 0 ? (
                          <img 
                            src={vehicle.photos[0]} 
                            alt={`${vehicle.brand} ${vehicle.model}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full bg-gray-200">
                            <p className="text-gray-500">Sem imagem</p>
                          </div>
                        )}
                        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-sm font-medium text-slate-900">
                          {vehicle.status === 'available' ? 'Disponível' : vehicle.status}
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="text-lg font-bold">{vehicle.brand} {vehicle.model}</h3>
                        <div className="flex justify-between mt-2">
                          <p className="text-gray-600">{vehicle.year}</p>
                          <p className="font-bold text-lg">R$ {vehicle.price.toLocaleString('pt-BR')}</p>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                            {vehicle.transmission}
                          </span>
                          <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                            {vehicle.fuelType}
                          </span>
                          <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                            {vehicle.mileage.toLocaleString('pt-BR')} km
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg p-8 shadow-sm">
                <p className="text-xl text-gray-500 text-center">Nenhum veículo encontrado com os filtros selecionados.</p>
                <Button variant="outline" className="mt-4" onClick={() => {
                  setSearchTerm('');
                  setSortBy('newest');
                  setBrandFilter('all');
                }}>
                  Limpar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">VehicleManager</h3>
              <p className="text-slate-400">Sua concessionária de confiança para veículos novos e usados.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-slate-400 hover:text-white">Home</Link></li>
                <li><Link to="/vehicles" className="text-slate-400 hover:text-white">Veículos</Link></li>
                <li><Link to="/about" className="text-slate-400 hover:text-white">Sobre Nós</Link></li>
                <li><Link to="/contact" className="text-slate-400 hover:text-white">Contato</Link></li>
                <li><Link to="/admin" className="text-slate-400 hover:text-white">Login Admin</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contato</h4>
              <address className="text-slate-400 not-italic">
                <p>Av. Principal, 1234</p>
                <p>São Paulo, SP</p>
                <p className="mt-2">contato@vehiclemanager.com</p>
                <p>(11) 99999-9999</p>
              </address>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-500">
            <p>&copy; {new Date().getFullYear()} VehicleManager. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicVehicles;
