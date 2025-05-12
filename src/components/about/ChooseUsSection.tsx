
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Car } from 'lucide-react';
import FeatureItem from './FeatureItem';

const features = [
  {
    title: "Veículos Selecionados",
    description: "Todos os nossos veículos são cuidadosamente selecionados e inspecionados para garantir máxima qualidade."
  },
  {
    title: "Garantia Estendida",
    description: "Oferecemos garantia em todos os nossos veículos, com opção de extensão para sua tranquilidade."
  },
  {
    title: "Financiamento Facilitado",
    description: "Trabalhamos com as melhores instituições financeiras para oferecer condições especiais de financiamento."
  },
  {
    title: "Transparência Total",
    description: "Fornecemos o histórico completo do veículo, sem surpresas desagradáveis após a compra."
  }
];

const ChooseUsSection = () => {
  return (
    <section className="py-16 bg-veloz-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-veloz-yellow">Por que escolher a VELOZ MOTORS?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <FeatureItem key={index} title={feature.title} description={feature.description} />
          ))}
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
  );
};

export default ChooseUsSection;
