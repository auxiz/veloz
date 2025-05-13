
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="py-16 bg-veloz-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-veloz-yellow">Sobre a VELOZ MOTORS</h2>
            <p className="text-gray-300 mb-4">
              A VELOZ MOTORS é uma concessionária especializada em veículos usados de alta qualidade. Fundada em 2023, nos dedicamos a oferecer carros com procedência garantida e em excelente estado.
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
              src="https://revendedor-teste.ecosysauto.site/images/home/car-header.png" 
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
  );
};

export default AboutSection;
