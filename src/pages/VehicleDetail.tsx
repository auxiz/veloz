
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Vehicle } from '@/types/vehicle';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PublicNavbar from '@/components/PublicNavbar';
import { useToast } from '@/hooks/use-toast';

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
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PublicNavbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-gray-500">Carregando detalhes do veículo...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (!vehicle) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PublicNavbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold mb-4">Veículo não encontrado</h1>
            <p className="text-gray-600 mb-8">O veículo que você está procurando não existe ou foi removido.</p>
            <Button asChild>
              <Link to="/vehicles">Ver outros veículos</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNavbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/vehicles" className="text-slate-600 hover:text-slate-900">
            &larr; Voltar para veículos
          </Link>
          
          <h1 className="text-3xl font-bold mt-4">{vehicle.brand} {vehicle.model} ({vehicle.year})</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery */}
            <Card>
              <CardContent className="p-0">
                {vehicle.photos && vehicle.photos.length > 0 ? (
                  <div>
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={vehicle.photos[activeImageIndex]}
                        alt={`${vehicle.brand} ${vehicle.model}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {vehicle.photos.length > 1 && (
                      <div className="flex overflow-x-auto gap-2 p-4">
                        {vehicle.photos.map((photo, index) => (
                          <button
                            key={index}
                            className={`flex-shrink-0 w-24 h-16 overflow-hidden rounded border-2 ${
                              index === activeImageIndex ? 'border-primary' : 'border-transparent'
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
                  <div className="flex items-center justify-center h-64 bg-gray-100">
                    <p className="text-gray-500">Sem imagens disponíveis</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Details */}
            <Card>
              <Tabs defaultValue="info">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="info">Informações</TabsTrigger>
                  <TabsTrigger value="features">Características</TabsTrigger>
                  <TabsTrigger value="description">Descrição</TabsTrigger>
                </TabsList>
                <TabsContent value="info" className="p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Marca</p>
                        <p className="font-medium">{vehicle.brand}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Modelo</p>
                        <p className="font-medium">{vehicle.model}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Ano</p>
                        <p className="font-medium">{vehicle.year}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Cor</p>
                        <p className="font-medium">{vehicle.color}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Quilometragem</p>
                        <p className="font-medium">{vehicle.mileage.toLocaleString('pt-BR')} km</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Combustível</p>
                        <p className="font-medium">{vehicle.fuelType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Transmissão</p>
                        <p className="font-medium">{vehicle.transmission}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <p className="font-medium capitalize">{
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
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">Nenhuma característica especificada</p>
                  )}
                </TabsContent>
                
                <TabsContent value="description" className="p-6">
                  {vehicle.description ? (
                    <div className="prose max-w-none">
                      <p>{vehicle.description}</p>
                    </div>
                  ) : (
                    <p className="text-gray-500">Sem descrição disponível</p>
                  )}
                </TabsContent>
              </Tabs>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-slate-900">
                    R$ {vehicle.price.toLocaleString('pt-BR')}
                  </span>
                  
                  <div className="mt-6 space-y-4">
                    <Button className="w-full" onClick={() => setContactFormShown(true)}>
                      Tenho interesse
                    </Button>
                    <Button variant="outline" className="w-full">
                      Agendar test drive
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Entre em contato</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>(11) 99999-9999</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>contato@vehiclemanager.com</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Av. Principal, 1234 - São Paulo, SP</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      {/* Contact form dialog */}
      {contactFormShown && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Tenho interesse neste veículo</h3>
                <button 
                  onClick={() => setContactFormShown(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleContactSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                      value={contactForm.name}
                      onChange={handleContactFormChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                      value={contactForm.email}
                      onChange={handleContactFormChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                      value={contactForm.phone}
                      onChange={handleContactFormChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                      value={contactForm.message}
                      onChange={handleContactFormChange}
                      required
                    />
                  </div>
                  
                  <div className="flex gap-4 pt-2">
                    <Button type="submit" className="flex-1">Enviar</Button>
                    <Button type="button" variant="outline" className="flex-1" onClick={() => setContactFormShown(false)}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
      
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

export default VehicleDetail;
