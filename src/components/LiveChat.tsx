
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, X, Send } from 'lucide-react';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: 'Olá! Como posso ajudar você hoje?', isUser: false }
  ]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message
    setMessages([...messages, { text: message, isUser: true }]);
    setMessage('');
    
    // Simulate response after a short delay
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { 
          text: 'Obrigado por entrar em contato! Um de nossos consultores responderá em breve.', 
          isUser: false 
        }
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-veloz-black border border-veloz-yellow/20 rounded-lg shadow-lg w-80 sm:w-96 overflow-hidden flex flex-col">
          <div className="bg-veloz-yellow p-4 flex justify-between items-center">
            <h3 className="font-bold text-veloz-black">Chat Online</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleChat} 
              className="p-1 h-auto text-veloz-black hover:bg-veloz-yellow/80"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="p-4 bg-veloz-black/95 flex-1 h-64 overflow-y-auto flex flex-col space-y-3">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-lg max-w-[80%] ${
                  msg.isUser 
                    ? 'bg-veloz-yellow text-veloz-black self-end' 
                    : 'bg-gray-800 text-white self-start'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-800 flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-gray-800 text-white rounded-l-md p-2 outline-none focus:ring-1 focus:ring-veloz-yellow"
            />
            <Button 
              type="submit" 
              className="bg-veloz-yellow text-veloz-black rounded-l-none"
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      ) : (
        <Button 
          onClick={toggleChat} 
          className="rounded-full bg-veloz-yellow text-veloz-black w-14 h-14 flex items-center justify-center shadow-lg hover:bg-veloz-yellow/90"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default LiveChat;
