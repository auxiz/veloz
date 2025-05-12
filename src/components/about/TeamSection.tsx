
import React from 'react';
import TeamMember from './TeamMember';

const teamMembers = [
  {
    name: "Carlos Silva",
    role: "Diretor",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1287&auto=format&fit=crop"
  },
  {
    name: "Ana Souza",
    role: "Gerente de Vendas",
    imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1287&auto=format&fit=crop"
  },
  {
    name: "Pedro Santos",
    role: "Consultor",
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1287&auto=format&fit=crop"
  },
  {
    name: "Marina Oliveira",
    role: "Consultora",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1361&auto=format&fit=crop"
  }
];

const TeamSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-veloz-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-veloz-yellow text-center">Nossa Equipe</h2>
        <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12">
          Contamos com uma equipe de profissionais experientes e apaixonados por automóveis, prontos para lhe oferecer o melhor atendimento.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <TeamMember 
              key={index}
              name={member.name}
              role={member.role}
              imageUrl={member.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
