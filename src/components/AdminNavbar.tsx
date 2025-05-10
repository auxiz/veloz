
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, FileText, Settings } from 'lucide-react';

const AdminNavbar = () => {
  const navigate = useNavigate();
  
  return (
    <nav className="bg-slate-900 text-white p-4 w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <h1 className="text-2xl font-bold">VehicleManager</h1>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-slate-800"
            onClick={() => navigate('/')}
          >
            <Home className="h-5 w-5 mr-2" />
            Dashboard
          </Button>
          
          <Button 
            variant="ghost"
            className="text-white hover:bg-slate-800"
            onClick={() => navigate('/vehicles')}
          >
            <FileText className="h-5 w-5 mr-2" />
            Inventory
          </Button>
          
          <Button 
            variant="ghost"
            className="text-white hover:bg-slate-800"
            onClick={() => navigate('/settings')}
          >
            <Settings className="h-5 w-5 mr-2" />
            Settings
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
