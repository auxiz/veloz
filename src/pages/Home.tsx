
import React, { useState, useEffect, useRef } from 'react';
import { Vehicle } from '@/types/vehicle';
import PublicNavbar from '@/components/PublicNavbar';
import Footer from '@/components/Footer';
import LiveChat from '@/components/LiveChat';
import HeroSection from '@/components/home/HeroSection';
import FeaturedVehicles from '@/components/home/FeaturedVehicles';
import VehicleSearchSection from '@/components/home/VehicleSearchSection';
import AboutSection from '@/components/home/AboutSection';
import ContactCTA from '@/components/home/ContactCTA';

const Home = () => {
  const [featuredVehicles, setFeaturedVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    brand: '',
    model: '',
    priceMin: '',
    priceMax: '',
    yearMin: '',
    yearMax: ''
  });
  
  // Refs for animated sections
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  // In a real application, this would fetch from an API
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      // Sample data - in production this would come from an API
      if (window.localStorage.getItem('vehicles')) {
        try {
          const storedVehicles = JSON.parse(window.localStorage.getItem('vehicles') || '[]');
          const available = storedVehicles.filter((v: Vehicle) => v.status === 'available');
          setFeaturedVehicles(available.slice(0, 6));
        } catch (err) {
          console.error('Error loading vehicles:', err);
          setFeaturedVehicles([]);
        }
      }
      setLoading(false);
    }, 1500); // Extended to 1.5 seconds to better see the skeleton animation
  }, []);
  
  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Get all elements with animate-section class
    const sections = document.querySelectorAll('.animate-section');
    sections.forEach((section) => {
      observer.observe(section);
    });
    
    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would filter and navigate to results
    console.log('Search submitted with:', searchParams);
  };

  return (
    <div className="min-h-screen bg-veloz-black text-veloz-white">
      <PublicNavbar />
      
      <div className="animate-fade-in">
        <HeroSection />
      </div>
      
      <div className="animate-section">
        <FeaturedVehicles 
          vehicles={featuredVehicles}
          loading={loading}
        />
      </div>
      
      <div className="animate-section">
        <VehicleSearchSection 
          searchParams={searchParams}
          handleSearchChange={handleSearchChange}
          handleSearchSubmit={handleSearchSubmit}
        />
      </div>
      
      <div className="animate-section">
        <AboutSection />
      </div>
      
      <div className="animate-section">
        <ContactCTA />
      </div>

      <Footer />
      <LiveChat />
    </div>
  );
};

export default Home;
