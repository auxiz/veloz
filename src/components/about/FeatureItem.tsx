
import React from 'react';
import { Check } from 'lucide-react';

interface FeatureItemProps {
  title: string;
  description: string;
}

const FeatureItem = ({ title, description }: FeatureItemProps) => {
  return (
    <div className="flex items-start">
      <div className="bg-veloz-yellow rounded-full p-2 mr-4 flex-shrink-0">
        <Check className="h-6 w-6 text-veloz-black" />
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
};

export default FeatureItem;
