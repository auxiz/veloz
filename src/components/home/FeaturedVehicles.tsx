
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Vehicle } from '@/types/vehicle';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import VehicleBadge from '@/components/VehicleBadge';
import { loadVehiclesFromLocalStorage, startScheduledImport } from '@/utils/scheduledXmlImport';

interface FeaturedVehiclesProps {
  vehicles?: Vehicle[];
  loading?: boolean;
}

const FeaturedVehicles = ({ vehicles: propVehicles, loading: propLoading }: FeaturedVehiclesProps) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(propVehicles || []);
  const [loading, setLoading] = useState<boolean>(propLoading || true);
  const xmlUrl = "http://app.revendamais.com.br/application/index.php/apiGeneratorXml/generator/sitedaloja/e64ccd1ada81eb551e2537627b54e6de11998.xml";

  useEffect(() => {
    if (propVehicles) {
      setVehicles(propVehicles);
      setLoading(propLoading || false);
    } else {
      // If no vehicles passed as props, load from localStorage and start auto-import
      setLoading(true);
      
      const storedVehicles = loadVehiclesFromLocalStorage();
      
      // Filter for only available vehicles and take the top 6 for featured display
      const featuredVehicles = storedVehicles
        .filter(v => v.status === 'available')
        .sort((a, b) => b.price - a.price) // Show most expensive first
        .slice(0, 6);
      
      setVehicles(featuredVehicles);
      setLoading(false);
      
      // Start scheduled import if it's not running yet
      startScheduledImport(
        xmlUrl,
        (result) => {
          if (result.success && result.vehicles) {
            // Update featured vehicles when new data is imported
            const newFeaturedVehicles = result.vehicles
              .filter(v => v.status === 'available')
              .sort((a, b) => b.price - a.price)
              .slice(0, 6);
            
            setVehicles(newFeaturedVehicles);
          }
        }
      );
    }
  }, [propVehicles, propLoading]);

  return (
    <section className="py-16 bg-gradient-to-b from-veloz-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-veloz-yellow">Veículos em Destaque</h2>
            <p className="text-gray-400 mt-2">Nossa seleção de veículos premium</p>
          </div>
          <Button variant="outline" asChild className="border-veloz-yellow text-veloz-yellow hover:bg-veloz-yellow/10">
            <Link to="/vehicles" className="flex items-center">
              Ver Todos <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="h-full overflow-hidden bg-gray-800 border-gray-700">
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-900">
                  <Skeleton className="w-full h-full bg-gray-700" />
                  <div className="absolute top-2 right-2">
                    <Skeleton className="w-20 h-6 rounded bg-gray-700" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-4 bg-gray-700" />
                  <div className="flex justify-between mt-2">
                    <Skeleton className="h-5 w-16 bg-gray-700" />
                    <Skeleton className="h-6 w-24 bg-gray-700" />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-20 rounded bg-gray-700" />
                    <Skeleton className="h-6 w-20 rounded bg-gray-700" />
                    <Skeleton className="h-6 w-20 rounded bg-gray-700" />
                  </div>
                  <Skeleton className="h-10 w-full mt-4 rounded bg-gray-700" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : vehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
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
                    <div className="absolute top-2 right-2">
                      <VehicleBadge status={vehicle.status} size="sm" />
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
          <div className="text-center py-20 border border-dashed border-gray-700 rounded-lg">
            <p className="text-xl text-gray-400">Nenhum veículo disponível no momento.</p>
            <p className="text-gray-500 mt-2">Volte em breve para ver nossos novos modelos.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedVehicles;
