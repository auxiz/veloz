
import React from 'react';

interface TeamMemberProps {
  name: string;
  role: string;
  imageUrl: string;
}

const TeamMember = ({ name, role, imageUrl }: TeamMemberProps) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="aspect-square">
        <img 
          src={imageUrl}
          alt={`${name} - ${role}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        <p className="text-veloz-yellow">{role}</p>
      </div>
    </div>
  );
};

export default TeamMember;
