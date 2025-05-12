
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Vehicle } from '@/types/vehicle';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import PublicNavbar from '@/components/PublicNavbar';
import Footer from '@/components/Footer';
import LiveChat from '@/components/LiveChat';
import { Car, Search, MessageSquare, ChevronRight, CheckCircle } from 'lucide-react';

const Home = () => {
  const [featuredVehicles, setFeaturedVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    brand: '',
    model: '',
    priceMin: '',
    priceMax: '',
    yearMin: '',
    yearMax: ''
  });

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would filter and navigate to results
    console.log('Search submitted with:', searchParams);
  };

  return (
    <div className="min-h-screen bg-veloz-black text-veloz-white">
      <PublicNavbar />
      
      {/* Hero Section */}
      <div className="relative bg-veloz-black text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 py-24 sm:py-32 md:py-40 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-veloz-yellow">Encontre o carro dos seus sonhos na <span className="block sm:inline">VELOZ MOTORS</span></h1>
            <p className="text-xl mb-8 text-veloz-white/90">Oferecemos uma seleção premium de veículos usados com garantia de procedência e as melhores condições do mercado.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                asChild 
                className="bg-veloz-yellow text-veloz-black hover:bg-veloz-yellow/90 text-lg px-8"
              >
                <Link to="/vehicles">
                  <Car className="mr-2 h-6 w-6" />
                  Ver Carros
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild
                className="bg-transparent border-veloz-yellow text-veloz-yellow hover:bg-veloz-yellow/10 text-lg px-8"
              >
                <Link to="/contact">
                  <MessageSquare className="mr-2 h-6 w-6" />
                  Fale Conosco
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Vehicles Section */}
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
            <div className="text-center py-20">
              <p className="text-xl text-gray-400">Carregando veículos...</p>
            </div>
          ) : featuredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredVehicles.map((vehicle) => (
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
            <div className="text-center py-20 border border-dashed border-gray-700 rounded-lg">
              <p className="text-xl text-gray-400">Nenhum veículo disponível no momento.</p>
              <p className="text-gray-500 mt-2">Volte em breve para ver nossos novos modelos.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Vehicle Search Section */}
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
      
      {/* About Section */}
      <section className="py-16 bg-veloz-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-veloz-yellow">Sobre a VELOZ MOTORS</h2>
              <p className="text-gray-300 mb-4">
                A VELOZ MOTORS é uma concessionária especializada em veículos usados de alta qualidade. Há mais de 15 anos no mercado, nos dedicamos a oferecer carros com procedência garantida e em excelente estado.
              </p>
              <p className="text-gray-300 mb-6">
                Nossa missão é proporcionar a melhor experiência na compra do seu veículo, com transparência, honestidade e atendimento personalizado. Trabalhamos com as melhores opções de financiamento do mercado.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-veloz-yellow mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Veículos com garantia e procedência</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-veloz-yellow mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Financiamento com as melhores taxas do mercado</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-veloz-yellow mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Atendimento personalizado e sem pressão</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-veloz-yellow mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Vistoria completa em todos os veículos</span>
                </li>
              </ul>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1928&auto=format&fit=crop" 
                alt="VELOZ MOTORS showroom" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-veloz-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <Button
                  asChild
                  className="bg-veloz-yellow text-veloz-black hover:bg-veloz-yellow/90"
                >
                  <Link to="/about">Conheça Nossa História</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl p-8 md:p-12 border border-veloz-yellow/20">
          <div className="md:flex md:items-center md:justify-between">
            <div className="mb-6 md:mb-0 md:w-2/3">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-veloz-yellow">Pronto para encontrar seu próximo veículo?</h2>
              <p className="text-gray-300">Nossa equipe está à disposição para ajudar você a encontrar o veículo perfeito.</p>
            </div>
            <div className="flex gap-4">
              <Button 
                size="lg" 
                className="w-full md:w-auto bg-veloz-yellow text-veloz-black hover:bg-veloz-yellow/90 font-medium"
                asChild
              >
                <Link to="/contact">Agendar Visita</Link>
              </Button>
              <Button 
                size="lg" 
                className="w-full md:w-auto bg-transparent border-veloz-yellow text-veloz-yellow hover:bg-veloz-yellow/10"
                variant="outline"
                asChild
              >
                <Link to="/vehicles">Ver Estoque</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <LiveChat />
    </div>
  );
};

export default Home;
