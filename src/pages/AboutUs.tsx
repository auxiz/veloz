
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PublicNavbar from '@/components/PublicNavbar';
import Footer from '@/components/Footer';
import { Check, Users, Award, Shield, Car } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-veloz-black text-white">
      <PublicNavbar />
      
      {/* Hero Section */}
      <div className="relative bg-veloz-black">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1928&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-veloz-yellow">Sobre a VELOZ MOTORS</h1>
            <p className="text-xl mb-8 text-white/90">Há mais de 15 anos no mercado, a VELOZ MOTORS se dedica a oferecer os melhores veículos usados com total transparência e qualidade garantida.</p>
          </div>
        </div>
      </div>
      
      {/* Our Story Section */}
      <section className="py-16 bg-gradient-to-b from-veloz-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-veloz-yellow">Nossa História</h2>
              <p className="text-gray-300 mb-4">
                Fundada em 2008, a VELOZ MOTORS nasceu da paixão por automóveis e do compromisso com a excelência em atendimento. O que começou como uma pequena loja com apenas 5 veículos se transformou em uma das mais respeitadas concessionárias de veículos usados da região.
              </p>
              <p className="text-gray-300 mb-4">
                Nosso fundador, João Silva, sempre acreditou que a compra de um veículo usado deveria ser uma experiência tranquila e transparente. Essa filosofia guia cada aspecto do nosso negócio até hoje.
              </p>
              <p className="text-gray-300 mb-4">
                Com o passar dos anos, expandimos nossas instalações e ampliamos nossa equipe, mas mantivemos os mesmos valores que nos trouxeram até aqui: honestidade, qualidade e compromisso com a satisfação dos clientes.
              </p>
            </div>
            <div className="relative h-full min-h-[400px] rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1920&auto=format&fit=crop" 
                alt="VELOZ MOTORS ao longo dos anos" 
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-veloz-black to-transparent opacity-60"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Mission Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-veloz-yellow">Nossa Missão</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Proporcionar a melhor experiência na compra de veículos usados, com transparência, qualidade e preço justo, superando as expectativas dos nossos clientes.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-lg">
              <div className="bg-veloz-yellow/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-veloz-yellow" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Confiança</h3>
              <p className="text-gray-400">
                Trabalhamos apenas com veículos de procedência garantida e oferecemos garantia em todos os nossos carros.
              </p>
            </div>
            
            <div className="bg-gray-800 p-8 rounded-lg">
              <div className="bg-veloz-yellow/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-veloz-yellow" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Qualidade</h3>
              <p className="text-gray-400">
                Todos os veículos passam por rigorosa inspeção técnica antes de serem disponibilizados para venda.
              </p>
            </div>
            
            <div className="bg-gray-800 p-8 rounded-lg">
              <div className="bg-veloz-yellow/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-veloz-yellow" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Atendimento</h3>
              <p className="text-gray-400">
                Nossa equipe é treinada para oferecer um atendimento personalizado, sem pressão e focado nas suas necessidades.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-veloz-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-veloz-yellow text-center">Nossa Equipe</h2>
          <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12">
            Contamos com uma equipe de profissionais experientes e apaixonados por automóveis, prontos para lhe oferecer o melhor atendimento.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1287&auto=format&fit=crop" 
                  alt="Carlos Silva - Diretor" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white">Carlos Silva</h3>
                <p className="text-veloz-yellow">Diretor</p>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1287&auto=format&fit=crop" 
                  alt="Ana Souza - Gerente de Vendas" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white">Ana Souza</h3>
                <p className="text-veloz-yellow">Gerente de Vendas</p>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1287&auto=format&fit=crop" 
                  alt="Pedro Santos - Consultor" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white">Pedro Santos</h3>
                <p className="text-veloz-yellow">Consultor</p>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1361&auto=format&fit=crop" 
                  alt="Marina Oliveira - Consultora" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white">Marina Oliveira</h3>
                <p className="text-veloz-yellow">Consultora</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-16 bg-veloz-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-veloz-yellow">Por que escolher a VELOZ MOTORS?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <div className="bg-veloz-yellow rounded-full p-2 mr-4 flex-shrink-0">
                <Check className="h-6 w-6 text-veloz-black" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">Veículos Selecionados</h3>
                <p className="text-gray-400">
                  Todos os nossos veículos são cuidadosamente selecionados e inspecionados para garantir máxima qualidade.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-veloz-yellow rounded-full p-2 mr-4 flex-shrink-0">
                <Check className="h-6 w-6 text-veloz-black" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">Garantia Estendida</h3>
                <p className="text-gray-400">
                  Oferecemos garantia em todos os nossos veículos, com opção de extensão para sua tranquilidade.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-veloz-yellow rounded-full p-2 mr-4 flex-shrink-0">
                <Check className="h-6 w-6 text-veloz-black" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">Financiamento Facilitado</h3>
                <p className="text-gray-400">
                  Trabalhamos com as melhores instituições financeiras para oferecer condições especiais de financiamento.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-veloz-yellow rounded-full p-2 mr-4 flex-shrink-0">
                <Check className="h-6 w-6 text-veloz-black" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">Transparência Total</h3>
                <p className="text-gray-400">
                  Fornecemos o histórico completo do veículo, sem surpresas desagradáveis após a compra.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button 
              size="lg" 
              className="bg-veloz-yellow text-veloz-black hover:bg-veloz-yellow/90"
              asChild
            >
              <Link to="/vehicles">
                <Car className="mr-2 h-5 w-5" />
                Ver Nosso Estoque
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
