
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Car, Info, Mail, CreditCard } from 'lucide-react';

const PublicNavbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };
  
  return (
    <nav className="bg-veloz-black shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo and brand */}
          <Link to="/" className="flex items-center">
            <img 
              src="/veloz-logo.png" 
              alt="VELOZ MOTORS" 
              className="h-12 sm:h-14"
            />
          </Link>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 text-veloz-white hover:text-veloz-yellow transition-colors">
              Home
            </Link>
            <Link to="/vehicles" className="px-3 py-2 text-veloz-white hover:text-veloz-yellow transition-colors flex items-center">
              <Car className="h-4 w-4 mr-1" />
              Veículos
            </Link>
            <Link to="/about" className="px-3 py-2 text-veloz-white hover:text-veloz-yellow transition-colors flex items-center">
              <Info className="h-4 w-4 mr-1" />
              Sobre nós
            </Link>
            <Link to="/contact" className="px-3 py-2 text-veloz-white hover:text-veloz-yellow transition-colors flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              Contato
            </Link>
            <Button 
              className="ml-4"
              variant="veloz"
              onClick={() => window.alert('Simulação de Financiamento em desenvolvimento!')}
            >
              <CreditCard className="h-5 w-5 mr-2" />
              Simule seu Financiamento
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={toggleMobileMenu}
              className="p-2 text-veloz-white hover:bg-veloz-black"
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
          <div className="md:hidden py-4 space-y-2 border-t border-veloz-yellow/20">
            <Link 
              to="/" 
              className="block px-3 py-3 text-veloz-white hover:bg-veloz-yellow/10 rounded-md flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/vehicles" 
              className="block px-3 py-3 text-veloz-white hover:bg-veloz-yellow/10 rounded-md flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Car className="h-5 w-5 mr-2" /> Veículos
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-3 text-veloz-white hover:bg-veloz-yellow/10 rounded-md flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Info className="h-5 w-5 mr-2" /> Sobre nós
            </Link>
            <Link 
              to="/contact" 
              className="block px-3 py-3 text-veloz-white hover:bg-veloz-yellow/10 rounded-md flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Mail className="h-5 w-5 mr-2" /> Contato
            </Link>
            <div className="px-3 py-3">
              <Button 
                className="w-full"
                variant="veloz"
                onClick={() => {
                  window.alert('Simulação de Financiamento em desenvolvimento!');
                  setMobileMenuOpen(false);
                }}
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Simule seu Financiamento
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default PublicNavbar;
