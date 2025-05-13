import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useComparisonStore } from '@/store/comparisonStore';
import PublicNavbar from '@/components/PublicNavbar';
import Footer from '@/components/Footer';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, X } from 'lucide-react';

const ComparisonPage: React.FC = () => {
  const navigate = useNavigate();
  const { vehiclesToCompare, removeVehicleFromCompare, clearComparisonList } = useComparisonStore();

  // Vehicle properties to compare
  const comparisonProperties = [
    { key: 'brand', label: 'Marca' },
    { key: 'model', label: 'Modelo' },
    { key: 'year', label: 'Ano' },
    { key: 'price', label: 'Preço', format: (value: number) => `R$ ${value.toLocaleString('pt-BR')}` },
    { key: 'mileage', label: 'Quilometragem', format: (value: number) => `${value.toLocaleString('pt-BR')} km` },
    { key: 'fuelType', label: 'Combustível' },
    { key: 'transmission', label: 'Transmissão' },
    { key: 'color', label: 'Cor' }
  ];

  const formatValue = (property: any, value: any) => {
    if (property.format) {
      return property.format(value);
    }
    return value;
  };

  // If there are fewer than 2 vehicles to compare, show a message and redirect back
  if (vehiclesToCompare.length < 2) {
    return (
      <div className="min-h-screen bg-veloz-black text-white">
        <PublicNavbar />
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-6 text-veloz-yellow">Comparação de Veículos</h1>
            <p className="text-xl mb-8">Selecione pelo menos 2 veículos para comparar.</p>
            <Button onClick={() => navigate('/vehicles')} variant="veloz">
              Voltar para Veículos
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-veloz-black text-white">
      <PublicNavbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Button
              variant="outline"
              onClick={() => navigate('/vehicles')}
              className="mb-4 border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
            >
              <ArrowLeft size={16} className="mr-2" /> Voltar para veículos
            </Button>
            <h1 className="text-3xl font-bold text-veloz-yellow">Comparar Veículos</h1>
            <p className="text-gray-400 mt-2">Compare as especificações lado a lado</p>
          </div>
          
          <Button 
            variant="destructive"
            onClick={() => clearComparisonList()}
            className="h-10"
          >
            Limpar Comparação
          </Button>
        </div>
        
        {/* Vehicle Images at Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {vehiclesToCompare.map(vehicle => (
            <div key={vehicle.id} className="relative bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
              <Button 
                variant="destructive" 
                size="icon"
                className="absolute top-2 right-2 z-10 h-8 w-8 rounded-full"
                onClick={() => removeVehicleFromCompare(vehicle.id)}
              >
                <X size={16} />
              </Button>
              
              <div className="p-4">
                <div className="aspect-[16/10] overflow-hidden bg-gray-900 mb-4 rounded">
                  {vehicle.photos && vehicle.photos.length > 0 ? (
                    <img 
                      src={vehicle.photos[0]} 
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-500">Sem imagem</p>
                    </div>
                  )}
                </div>
                
                <h2 className="text-lg font-bold text-white">{vehicle.brand} {vehicle.model}</h2>
                <p className="text-xl font-bold mt-2 text-veloz-yellow">R$ {vehicle.price.toLocaleString('pt-BR')}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Comparison Table */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden mb-8">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-700">
                <TableHead className="text-white bg-gray-900">Especificações</TableHead>
                {vehiclesToCompare.map(vehicle => (
                  <TableHead key={vehicle.id} className="text-white bg-gray-900">
                    {vehicle.brand} {vehicle.model}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonProperties.map((property: any) => (
                <TableRow key={property.key} className="border-b border-gray-700">
                  <TableCell className="font-medium text-white">{property.label}</TableCell>
                  {vehiclesToCompare.map(vehicle => {
                    // Check if property values are the same for highlighting
                    const allValues = vehiclesToCompare.map(v => (v as any)[property.key]);
                    const allSame = allValues.every(val => val === allValues[0]);
                    const highlightClass = allSame ? "" : "text-veloz-yellow font-medium";
                    
                    return (
                      <TableCell 
                        key={`${vehicle.id}-${property.key}`}
                        className={highlightClass}
                      >
                        {formatValue(property, (vehicle as any)[property.key])}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
              
              {/* Features */}
              <TableRow className="border-b border-gray-700">
                <TableCell className="font-medium text-white">Características</TableCell>
                {vehiclesToCompare.map(vehicle => (
                  <TableCell key={vehicle.id}>
                    {vehicle.features && vehicle.features.length > 0 ? (
                      <ul className="list-disc list-inside">
                        {vehicle.features.slice(0, 5).map((feature, index) => (
                          <li key={index} className="text-sm">{feature}</li>
                        ))}
                        {vehicle.features.length > 5 && (
                          <li className="text-sm text-gray-400">+{vehicle.features.length - 5} mais</li>
                        )}
                      </ul>
                    ) : (
                      <span className="text-gray-400 text-sm">Nenhuma característica listada</span>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>
        
        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vehiclesToCompare.map(vehicle => (
            <Button
              key={vehicle.id}
              variant="veloz"
              className="w-full"
              onClick={() => navigate(`/vehicles/${vehicle.id}`)}
            >
              Ver detalhes do {vehicle.brand} {vehicle.model}
            </Button>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ComparisonPage;
