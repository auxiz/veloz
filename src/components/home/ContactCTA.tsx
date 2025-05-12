
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ContactCTA = () => {
  return (
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
  );
};

export default ContactCTA;
