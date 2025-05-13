
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Package, Settings, Home } from 'lucide-react';

const AdminNavbar = () => {
  const navigate = useNavigate();
  
  return (
    <nav className="bg-veloz-black text-white py-3 w-full shadow-lg border-b border-veloz-yellow/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0 group">
          <Link to="/admin" className="transition-transform duration-300 hover:scale-105">
            <img 
              src="/lovable-uploads/97c5420b-2d96-438a-bfdb-cabb98693f10.png" 
              alt="VELOZ MOTORS" 
              className="h-10"
            />
          </Link>
          <div className="ml-3 flex flex-col">
            <span className="text-veloz-yellow text-xs font-bold tracking-wider font-montserrat">ADMIN PANEL</span>
            <div className="h-0.5 w-0 bg-veloz-yellow transition-all duration-300 group-hover:w-full"></div>
          </div>
        </div>
        
        <div className="flex space-x-2 items-center">
          <Button 
            variant="veloz-outline" 
            size="sm"
            onClick={() => navigate('/admin')}
            className="font-bold flex items-center gap-1"
          >
            <LayoutDashboard size={16} />
            <span className="hidden sm:inline">Dashboard</span>
          </Button>
          
          <Button 
            variant="veloz-outline"
            size="sm"
            onClick={() => navigate('/admin')}
            className="font-bold flex items-center gap-1"
          >
            <Package size={16} />
            <span className="hidden sm:inline">Inventário</span>
          </Button>
          
          <Button 
            variant="veloz-outline"
            size="sm"
            onClick={() => window.alert('Settings page not yet implemented')}
            className="font-bold flex items-center gap-1"
          >
            <Settings size={16} />
            <span className="hidden sm:inline">Configurações</span>
          </Button>
          
          <Button 
            variant="veloz"
            size="sm"
            onClick={() => navigate('/')}
            className="font-bold flex items-center gap-1"
          >
            <Home size={16} />
            <span className="hidden sm:inline">Visitar Site</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
