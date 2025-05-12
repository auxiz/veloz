
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Vehicle } from '@/types/vehicle';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PublicNavbar from '@/components/PublicNavbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Check, CreditCard, Phone, MapPin, Mail, ChevronLeft, ChevronRight } from 'lucide-react';

const VehicleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [contactFormShown, setContactFormShown] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  // In a real application, this would be fetched from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      try {
        const storedVehicles = JSON.parse(window.localStorage.getItem('vehicles') || '[]');
        const foundVehicle = storedVehicles.find((v: Vehicle) => v.id === id);
        
        if (foundVehicle) {
          setVehicle(foundVehicle);
        } else {
          toast({
            title: "Veículo não encontrado",
            description: "O veículo que você está procurando não existe ou foi removido.",
          });
          navigate('/vehicles');
        }
      } catch (err) {
        console.error('Error loading vehicle:', err);
        toast({
          title: "Erro ao carregar veículo",
          description: "Ocorreu um erro ao carregar os dados do veículo.",
        });
      } finally {
        setLoading(false);
      }
    }, 500);
  }, [id, navigate, toast]);
  
  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // In a real application, you would submit this to an API
    console.log("Contact form submitted:", contactForm);
    
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve.",
    });
    
    // Reset form
    setContactForm({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
    
    setContactFormShown(false);
  };

  const nextImage = () => {
    if (vehicle?.photos && activeImageIndex < vehicle.photos.length - 1) {
      setActiveImageIndex(activeImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (activeImageIndex > 0) {
      setActiveImageIndex(activeImageIndex - 1);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-veloz-black text-white">
        <PublicNavbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-gray-400">Carregando detalhes do veículo...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!vehicle) {
    return (
      <div className="min-h-screen bg-veloz-black text-white">
        <PublicNavbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold mb-4 text-veloz-yellow">Veículo não encontrado</h1>
            <p className="text-gray-400 mb-8">O veículo que você está procurando não existe ou foi removido.</p>
            <Button asChild className="bg-veloz-yellow text-veloz-black hover:bg-veloz-yellow/90">
              <Link to="/vehicles">Ver outros veículos</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-veloz-black text-white">
      <PublicNavbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/vehicles" className="text-gray-400 hover:text-veloz-yellow flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" /> Voltar para veículos
          </Link>
          
          <h1 className="text-3xl font-bold mt-4 text-veloz-yellow">{vehicle.brand} {vehicle.model} ({vehicle.year})</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-0">
                {vehicle.photos && vehicle.photos.length > 0 ? (
                  <div>
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img
                        src={vehicle.photos[activeImageIndex]}
                        alt={`${vehicle.brand} ${vehicle.model}`}
                        className="w-full h-full object-cover"
                      />
                      {vehicle.photos.length > 1 && (
                        <>
                          <button 
                            onClick={prevImage} 
                            disabled={activeImageIndex === 0}
                            className="absolute top-1/2 left-4 -translate-y-1/2 bg-veloz-black/60 hover:bg-veloz-black/80 text-white p-2 rounded-full disabled:opacity-50"
                            aria-label="Imagem anterior"
                          >
                            <ChevronLeft className="h-6 w-6" />
                          </button>
                          <button 
                            onClick={nextImage} 
                            disabled={activeImageIndex === vehicle.photos.length - 1}
                            className="absolute top-1/2 right-4 -translate-y-1/2 bg-veloz-black/60 hover:bg-veloz-black/80 text-white p-2 rounded-full disabled:opacity-50"
                            aria-label="Próxima imagem"
                          >
                            <ChevronRight className="h-6 w-6" />
                          </button>
                        </>
                      )}
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                        <div className="flex gap-1.5 px-2 py-1 bg-veloz-black/60 rounded-full">
                          {vehicle.photos.map((_, index) => (
                            <button
                              key={index}
                              className={`w-2 h-2 rounded-full ${
                                index === activeImageIndex ? 'bg-veloz-yellow' : 'bg-gray-400'
                              }`}
                              onClick={() => setActiveImageIndex(index)}
                              aria-label={`Ver imagem ${index + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {vehicle.photos.length > 1 && (
                      <div className="flex overflow-x-auto gap-2 p-4 bg-gray-900">
                        {vehicle.photos.map((photo, index) => (
                          <button
                            key={index}
                            className={`flex-shrink-0 w-24 h-16 overflow-hidden rounded border-2 ${
                              index === activeImageIndex ? 'border-veloz-yellow' : 'border-transparent'
                            }`}
                            onClick={() => setActiveImageIndex(index)}
                          >
                            <img
                              src={photo}
                              alt={`${vehicle.brand} ${vehicle.model} - Foto ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64 bg-gray-900">
                    <p className="text-gray-500">Sem imagens disponíveis</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Details */}
            <Card className="bg-gray-800 border-gray-700">
              <Tabs defaultValue="info">
                <TabsList className="w-full grid grid-cols-3 bg-gray-900 text-gray-300">
                  <TabsTrigger value="info" className="data-[state=active]:bg-gray-800 data-[state=active]:text-veloz-yellow">Informações</TabsTrigger>
                  <TabsTrigger value="features" className="data-[state=active]:bg-gray-800 data-[state=active]:text-veloz-yellow">Características</TabsTrigger>
                  <TabsTrigger value="description" className="data-[state=active]:bg-gray-800 data-[state=active]:text-veloz-yellow">Descrição</TabsTrigger>
                </TabsList>
                <TabsContent value="info" className="p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-400">Marca</p>
                        <p className="font-medium text-white">{vehicle.brand}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Modelo</p>
                        <p className="font-medium text-white">{vehicle.model}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Ano</p>
                        <p className="font-medium text-white">{vehicle.year}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Cor</p>
                        <p className="font-medium text-white">{vehicle.color}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-400">Quilometragem</p>
                        <p className="font-medium text-white">{vehicle.mileage.toLocaleString('pt-BR')} km</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Combustível</p>
                        <p className="font-medium text-white">{vehicle.fuelType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Transmissão</p>
                        <p className="font-medium text-white">{vehicle.transmission}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Status</p>
                        <p className="font-medium text-veloz-yellow capitalize">{
                          vehicle.status === 'available' ? 'Disponível' :
                          vehicle.status === 'sold' ? 'Vendido' :
                          vehicle.status === 'reserved' ? 'Reservado' :
                          vehicle.status
                        }</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="features" className="p-6">
                  {vehicle.features && vehicle.features.length > 0 ? (
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                      {vehicle.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-5 w-5 text-veloz-yellow mr-2 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400">Nenhuma característica especificada</p>
                  )}
                </TabsContent>
                
                <TabsContent value="description" className="p-6">
                  {vehicle.description ? (
                    <div className="prose prose-invert max-w-none">
                      <p className="text-gray-300">{vehicle.description}</p>
                    </div>
                  ) : (
                    <p className="text-gray-400">Sem descrição disponível</p>
                  )}
                </TabsContent>
              </Tabs>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-veloz-yellow">
                    R$ {vehicle.price.toLocaleString('pt-BR')}
                  </span>
                  
                  <div className="mt-6 space-y-4">
                    <Button 
                      className="w-full bg-veloz-yellow text-veloz-black hover:bg-veloz-yellow/90" 
                      onClick={() => setContactFormShown(true)}
                    >
                      Tenho interesse
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full border-veloz-yellow text-veloz-yellow hover:bg-veloz-yellow/10"
                      onClick={() => window.alert('Agendamento de test drive em desenvolvimento!')}
                    >
                      Agendar test drive
                    </Button>
                    <Button 
                      className="w-full bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center"
                      onClick={() => window.alert('Simulação de financiamento em desenvolvimento!')}
                    >
                      <CreditCard className="mr-2 h-5 w-5" /> Simular financiamento
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-veloz-yellow">Entre em contato</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-veloz-yellow mr-2" />
                    <span className="text-gray-300">(11) 99999-9999</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-veloz-yellow mr-2" />
                    <span className="text-gray-300">contato@velozmotors.com</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-veloz-yellow mr-2" />
                    <span className="text-gray-300">Av. Principal, 1234 - São Paulo, SP</span>
                  </div>
                </div>
                <Button 
                  className="w-full mt-4 bg-veloz-yellow text-veloz-black hover:bg-veloz-yellow/90"
                  asChild
                >
                  <Link to="/contact">Fale Conosco</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      {/* Contact form dialog */}
      {contactFormShown && (
        <div className="fixed inset-0 bg-veloz-black bg-opacity-80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-md bg-gray-800 border-gray-700 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-veloz-yellow">Tenho interesse neste veículo</h3>
                <button 
                  onClick={() => setContactFormShown(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleContactSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Nome</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full rounded-md bg-gray-700 border-gray-600 text-white px-3 py-2"
                      value={contactForm.name}
                      onChange={handleContactFormChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">E-mail</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full rounded-md bg-gray-700 border-gray-600 text-white px-3 py-2"
                      value={contactForm.email}
                      onChange={handleContactFormChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Telefone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full rounded-md bg-gray-700 border-gray-600 text-white px-3 py-2"
                      value={contactForm.phone}
                      onChange={handleContactFormChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Mensagem</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full rounded-md bg-gray-700 border-gray-600 text-white px-3 py-2"
                      value={contactForm.message}
                      onChange={handleContactFormChange}
                      required
                    />
                  </div>
                  
                  <div className="flex gap-4 pt-2">
                    <Button type="submit" className="flex-1 bg-veloz-yellow text-veloz-black hover:bg-veloz-yellow/90">Enviar</Button>
                    <Button type="button" variant="outline" className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700" onClick={() => setContactFormShown(false)}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default VehicleDetail;
