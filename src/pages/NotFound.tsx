
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">
          Oops! A página que você está procurando não pôde ser encontrada.
        </p>
        <div className="space-y-4">
          <Button
            onClick={() => navigate(isAdminPath ? '/admin' : '/')}
            className="px-6 py-2 w-full"
          >
            {isAdminPath ? 'Voltar para o Dashboard' : 'Voltar para o Início'}
          </Button>
          
          {isAdminPath ? (
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="px-6 py-2 w-full"
            >
              Ir para o Site
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => navigate('/admin')}
              className="px-6 py-2 w-full"
            >
              Ir para o Admin
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
