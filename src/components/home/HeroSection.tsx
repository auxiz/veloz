
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Car, MessageSquare } from 'lucide-react';

const HeroSection = () => {
  return (
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
  );
};

export default HeroSection;
