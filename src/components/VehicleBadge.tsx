
import React from 'react';
import { cn } from "@/lib/utils";

type VehicleStatus = 'available' | 'sold' | 'reserved';

interface VehicleBadgeProps {
  status: VehicleStatus;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const statusConfig = {
  available: {
    bg: 'bg-green-500',
    text: 'text-veloz-black',
    label: 'Disponível'
  },
  sold: {
    bg: 'bg-red-500',
    text: 'text-white',
    label: 'Vendido'
  },
  reserved: {
    bg: 'bg-yellow-500',
    text: 'text-veloz-black',
    label: 'Reservado'
  }
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-sm'
};

const VehicleBadge: React.FC<VehicleBadgeProps> = ({ 
  status, 
  size = 'md',
  className 
}) => {
  const { bg, text, label } = statusConfig[status];
  
  return (
    <div 
      className={cn(
        "inline-flex rounded font-medium", 
        bg, 
        text, 
        sizeClasses[size],
        className
      )}
    >
      {label}
    </div>
  );
};

export default VehicleBadge;
