
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const PublicNavbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-slate-900">VehicleManager</span>
          </Link>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 text-slate-700 hover:text-slate-900">Home</Link>
            <Link to="/vehicles" className="px-3 py-2 text-slate-700 hover:text-slate-900">Veículos</Link>
            <Link to="/about" className="px-3 py-2 text-slate-700 hover:text-slate-900">Sobre Nós</Link>
            <Link to="/contact" className="px-3 py-2 text-slate-700 hover:text-slate-900">Contato</Link>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/admin')}
            >
              Área Admin
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={toggleMobileMenu}
              className="p-2"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu, show/hide based on menu state */}
        {mobileMenuOpen && (
          <div className="md:hidden py-2 space-y-1">
            <Link 
              to="/" 
              className="block px-3 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/vehicles" 
              className="block px-3 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Veículos
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sobre Nós
            </Link>
            <Link 
              to="/contact" 
              className="block px-3 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contato
            </Link>
            <Link 
              to="/admin" 
              className="block px-3 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Área Admin
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default PublicNavbar;
