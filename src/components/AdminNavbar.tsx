
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, FileText, Settings, LogOut } from 'lucide-react';

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
            onClick={() => navigate('/admin')}
          >
            <Home className="h-5 w-5 mr-2" />
            Dashboard
          </Button>
          
          <Button 
            variant="ghost"
            className="text-white hover:bg-slate-800"
            onClick={() => navigate('/admin')}
          >
            <FileText className="h-5 w-5 mr-2" />
            Inventory
          </Button>
          
          <Button 
            variant="ghost"
            className="text-white hover:bg-slate-800"
            onClick={() => window.alert('Settings page not yet implemented')}
          >
            <Settings className="h-5 w-5 mr-2" />
            Settings
          </Button>
          
          <Button 
            variant="ghost"
            className="text-white hover:bg-slate-800"
            onClick={() => navigate('/')}
          >
            <LogOut className="h-5 w-5 mr-2" />
            Visit Site
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
