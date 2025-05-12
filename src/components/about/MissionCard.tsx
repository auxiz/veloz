
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MissionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const MissionCard = ({ icon: Icon, title, description }: MissionCardProps) => {
  return (
    <div className="bg-gray-800 p-8 rounded-lg">
      <div className="bg-veloz-yellow/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="h-8 w-8 text-veloz-yellow" />
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default MissionCard;
