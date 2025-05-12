
import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative bg-veloz-black">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1928&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-veloz-yellow">Sobre a VELOZ MOTORS</h1>
          <p className="text-xl mb-8 text-white/90">Fundada em 2023, a VELOZ MOTORS se dedica a oferecer os melhores veículos usados com total transparência e qualidade garantida.</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
