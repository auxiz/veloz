
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, MessageSquare, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-veloz-black text-veloz-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="mb-4">
              <img 
                src="/lovable-uploads/97c5420b-2d96-438a-bfdb-cabb98693f10.png" 
                alt="VELOZ MOTORS" 
                className="h-16"
              />
            </div>
            <p className="text-gray-400">Sua concessionária de confiança para veículos usados de alta qualidade. Estamos comprometidos em oferecer o melhor atendimento e as melhores opções para você.</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-veloz-yellow">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-veloz-yellow">Home</Link></li>
              <li><Link to="/vehicles" className="text-gray-400 hover:text-veloz-yellow">Veículos</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-veloz-yellow">Sobre Nós</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-veloz-yellow">Contato</Link></li>
              <li><Link to="/admin" className="text-gray-400 hover:text-veloz-yellow">Área Admin</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-veloz-yellow">Contato</h4>
            <address className="text-gray-400 not-italic space-y-3">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-veloz-yellow mr-2" />
                <span>Av. Sara Kubitschek, Qd 25 - Lt 28 - Serrinha, Luziânia - GO, 72815-450</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-veloz-yellow mr-2" />
                <span>(61) 99526-1897</span>
              </div>
              <div className="mt-4">
                <h5 className="text-veloz-white mb-2">Siga-nos</h5>
                <div className="flex space-x-4">
                  <a href="https://www.facebook.com/velozmotorsoficial/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-veloz-yellow hover:text-veloz-yellow/80">
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a href="https://www.instagram.com/velozmotorsoficial" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-veloz-yellow hover:text-veloz-yellow/80">
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a href="https://wa.me/5561995261897" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-veloz-yellow hover:text-veloz-yellow/80">
                    <MessageSquare className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </address>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} VELOZMOTORS. Todos os direitos reservados.</p>
          <p className="text-sm mt-1">CNPJ: 50.664.836/0001-69</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
