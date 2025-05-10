
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Vehicle } from '@/types/vehicle';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PublicNavbar from '@/components/PublicNavbar';

const Home = () => {
  const [featuredVehicles, setFeaturedVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  // In a real application, this would fetch from an API
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      // Sample data - in production this would come from an API
      if (window.localStorage.getItem('vehicles')) {
        try {
          const storedVehicles = JSON.parse(window.localStorage.getItem('vehicles') || '[]');
          const available = storedVehicles.filter((v: Vehicle) => v.status === 'available');
          setFeaturedVehicles(available.slice(0, 6));
        } catch (err) {
          console.error('Error loading vehicles:', err);
          setFeaturedVehicles([]);
        }
      }
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <PublicNavbar />
      
      {/* Hero Section */}
      <div className="relative bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Encontre o veículo dos seus sonhos</h1>
            <p className="text-xl mb-8">Explore nossa seleção premium de veículos com os melhores preços e condições do mercado.</p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link to="/vehicles">Ver Veículos</Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-white/10 hover:bg-white/20">
                Fale Conosco
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Vehicles Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold">Veículos em Destaque</h2>
            <p className="text-gray-600 mt-2">Nossa seleção de veículos premium</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/vehicles">Ver Todos</Link>
          </Button>
        </div>
        
        {loading ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">Carregando veículos...</p>
          </div>
        ) : featuredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVehicles.map((vehicle) => (
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
          <div className="text-center py-20 border border-dashed border-gray-300 rounded-lg">
            <p className="text-xl text-gray-500">Nenhum veículo disponível no momento.</p>
            <p className="text-gray-400 mt-2">Volte em breve para ver nossos novos modelos.</p>
          </div>
        )}
      </section>
      
      {/* Why Choose Us Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Por que escolher nossa concessionária?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Atendimento Rápido</h3>
              <p className="text-gray-600">Nossa equipe está pronta para lhe atender com agilidade e eficiência.</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Garantia de Qualidade</h3>
              <p className="text-gray-600">Todos os nossos veículos passam por rigorosas inspeções de qualidade.</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Melhores Condições</h3>
              <p className="text-gray-600">Oferecemos as melhores condições de pagamento e financiamento do mercado.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-slate-900 text-white rounded-xl p-8 md:p-12">
          <div className="md:flex md:items-center md:justify-between">
            <div className="mb-6 md:mb-0 md:w-2/3">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Pronto para encontrar seu próximo veículo?</h2>
              <p className="text-slate-300">Nossa equipe está à disposição para ajudar você a encontrar o veículo perfeito.</p>
            </div>
            <div>
              <Button size="lg" className="w-full md:w-auto bg-white text-slate-900 hover:bg-slate-100">
                Agendar Visita
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
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

export default Home;
