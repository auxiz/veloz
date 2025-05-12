
import React from 'react';

const StorySection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-veloz-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-veloz-yellow">Nossa História</h2>
            <p className="text-gray-300 mb-4">
              Fundada em 2023, a VELOZ MOTORS nasceu da paixão por automóveis e do compromisso com a excelência no atendimento. O que começou como uma loja especializada em veículos usados de alta qualidade tem se consolidado como uma das principais concessionárias da região.
            </p>
            <p className="text-gray-300 mb-4">
              Nosso fundador, Pedro, sempre acreditou que a compra de um veículo usado deveria ser uma experiência transparente, confiável e descomplicada. Essa filosofia continua a guiar cada aspecto do nosso negócio até hoje.
            </p>
            <p className="text-gray-300 mb-4">
              Com o tempo, expandimos nosso portfólio de veículos e nossa estrutura, sempre mantendo os mesmos valores que nos trouxeram até aqui: honestidade, qualidade e compromisso com a satisfação dos nossos clientes.
            </p>
            <p className="text-gray-300 mb-4">
              Hoje, a VELOZ MOTORS é sinônimo de confiança e respeito no mercado de carros usados, oferecendo aos nossos clientes a melhor experiência de compra e pós-venda.
            </p>
          </div>
          <div className="relative h-full min-h-[400px] rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1487887235947-a955ef187fcc?q=80&w=1287&auto=format&fit=crop" 
              alt="VELOZ MOTORS ao longo dos anos" 
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-veloz-black to-transparent opacity-60"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
