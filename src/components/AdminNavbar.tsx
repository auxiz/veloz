
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AdminNavbar = () => {
  const navigate = useNavigate();
  
  return (
    <nav className="bg-veloz-black text-white p-4 w-full shadow-md border-b border-veloz-yellow/20">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Link to="/admin">
            <img 
              src="/veloz-logo.png" 
              alt="VELOZ MOTORS" 
              className="h-10"
            />
          </Link>
          <span className="ml-2 text-veloz-yellow text-xs font-montserrat">Admin Panel</span>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="veloz-outline" 
            size="sm"
            onClick={() => navigate('/admin')}
            className="font-bold"
          >
            Dashboard
          </Button>
          
          <Button 
            variant="veloz-outline"
            size="sm"
            onClick={() => navigate('/admin')}
            className="font-bold"
          >
            Inventory
          </Button>
          
          <Button 
            variant="veloz-outline"
            size="sm"
            onClick={() => window.alert('Settings page not yet implemented')}
            className="font-bold"
          >
            Settings
          </Button>
          
          <Button 
            variant="veloz"
            size="sm"
            onClick={() => navigate('/')}
            className="font-bold"
          >
            Visit Site
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
