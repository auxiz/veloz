
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PublicNavbar from '@/components/PublicNavbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [submitting, setSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      toast({
        title: 'Mensagem enviada!',
        description: 'Agradecemos seu contato. Retornaremos em breve.',
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-veloz-black text-white">
      <PublicNavbar />
      
      {/* Hero Section */}
      <div className="relative bg-veloz-black">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=1474&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-veloz-yellow">Entre em Contato</h1>
            <p className="text-xl mb-8 text-white/90">Estamos prontos para atender você! Preencha o formulário abaixo ou utilize um dos nossos canais de atendimento.</p>
          </div>
        </div>
      </div>
      
      {/* Contact Information Section */}
      <section className="py-16 bg-gradient-to-b from-veloz-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <div className="bg-veloz-yellow/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-veloz-yellow" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Endereço</h3>
              <p className="text-gray-400">
                Av. Principal, 1234<br />
                São Paulo, SP<br />
                CEP: 01234-567
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <div className="bg-veloz-yellow/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-veloz-yellow" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Telefone</h3>
              <p className="text-gray-400">
                (11) 99999-9999<br />
                (11) 5555-5555
              </p>
              <p className="text-gray-500 text-sm mt-2">
                WhatsApp disponível
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <div className="bg-veloz-yellow/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-veloz-yellow" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">E-mail</h3>
              <p className="text-gray-400">
                contato@velozmotors.com<br />
                vendas@velozmotors.com
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Resposta em até 24h
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <div className="bg-veloz-yellow/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-veloz-yellow" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Horário</h3>
              <p className="text-gray-400">
                Segunda a Sexta: 8h às 18h<br />
                Sábado: 8h às 14h<br />
                Domingo: Fechado
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Form & Map Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-veloz-yellow">Envie sua mensagem</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Nome completo *</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">E-mail *</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Telefone *</label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Assunto</label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Mensagem *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md bg-gray-800 border-gray-700 text-white px-3 py-2"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={submitting}
                  className="bg-veloz-yellow text-veloz-black hover:bg-veloz-yellow/90 w-full"
                >
                  {submitting ? 'Enviando...' : (
                    <>
                      <Send className="mr-2 h-5 w-5" /> Enviar Mensagem
                    </>
                  )}
                </Button>
              </form>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6 text-veloz-yellow">Nossa Localização</h2>
              <div className="bg-gray-800 rounded-lg overflow-hidden h-[400px]">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d467692.0488551513!2d-46.92508336869791!3d-23.681531449934733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce448183a461d1%3A0x9ba94b08ff335bae!2zU8OjbyBQYXVsbywgU1A!5e0!3m2!1spt-BR!2sbr!4v1652368285463!5m2!1spt-BR!2sbr" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização da VELOZ MOTORS"
                />
              </div>
              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h3 className="font-semibold text-veloz-yellow">Como chegar</h3>
                <p className="text-gray-400 mt-2">
                  Estamos localizados na Avenida Principal, próximo ao Shopping Center. Fácil acesso por transporte público e amplo estacionamento disponível para clientes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-veloz-black">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-veloz-yellow text-center">Perguntas Frequentes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="font-bold text-white mb-2">Vocês oferecem financiamento?</h3>
              <p className="text-gray-400">
                Sim, trabalhamos com diversas instituições financeiras para oferecer as melhores condições de financiamento para nossos clientes.
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="font-bold text-white mb-2">Os veículos têm garantia?</h3>
              <p className="text-gray-400">
                Sim, todos os nossos veículos possuem garantia legal e temos opções de garantia estendida para maior tranquilidade.
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="font-bold text-white mb-2">É possível fazer test drive?</h3>
              <p className="text-gray-400">
                Absolutamente! Incentivamos nossos clientes a agendar um test drive para conhecer melhor o veículo de interesse.
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="font-bold text-white mb-2">Vocês aceitam veículos na troca?</h3>
              <p className="text-gray-400">
                Sim, fazemos avaliação do seu veículo usado e oferecemos as melhores condições para troca.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
