
import React from 'react';
import MissionCard from './MissionCard';
import { Shield, Award, Users } from 'lucide-react';

const MissionSection = () => {
  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6 text-veloz-yellow">Nossa Missão</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
          Proporcionar a melhor experiência na compra de veículos usados, com transparência, qualidade e preço justo, superando as expectativas dos nossos clientes.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <MissionCard 
            icon={Shield} 
            title="Confiança" 
            description="Trabalhamos apenas com veículos de procedência garantida e oferecemos garantia em todos os nossos carros."
          />
          
          <MissionCard 
            icon={Award} 
            title="Qualidade" 
            description="Todos os veículos passam por rigorosa inspeção técnica antes de serem disponibilizados para venda."
          />
          
          <MissionCard 
            icon={Users} 
            title="Atendimento" 
            description="Nossa equipe é treinada para oferecer um atendimento personalizado, sem pressão e focado nas suas necessidades."
          />
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
