
import { useState, useEffect } from 'react';
import { Vehicle } from '@/types/vehicle';

export function useVehicleFiltering(vehicles: Vehicle[]) {
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [brandFilter, setBrandFilter] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [yearRange, setYearRange] = useState({ min: '', max: '' });

  // Get unique brands for the filter
  const uniqueBrands = Array.from(new Set(vehicles.map(vehicle => vehicle.brand)));

  // Apply filters when any filter criteria changes
  useEffect(() => {
    const applyFilters = () => {
      let results = [...vehicles];
      
      // Apply search filter
      if (searchTerm) {
        results = results.filter(
          vehicle => 
            vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) || 
            vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehicle.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Apply brand filter
      if (brandFilter !== 'all') {
        results = results.filter(vehicle => vehicle.brand.toLowerCase() === brandFilter.toLowerCase());
      }
      
      // Apply price range
      if (priceRange.min) {
        results = results.filter(vehicle => vehicle.price >= Number(priceRange.min));
      }
      
      if (priceRange.max) {
        results = results.filter(vehicle => vehicle.price <= Number(priceRange.max));
      }
      
      // Apply year range
      if (yearRange.min) {
        results = results.filter(vehicle => vehicle.year >= Number(yearRange.min));
      }
      
      if (yearRange.max) {
        results = results.filter(vehicle => vehicle.year <= Number(yearRange.max));
      }
      
      // Apply sorting
      switch (sortBy) {
        case 'price-low':
          results.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          results.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case 'oldest':
          results.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
          break;
        default:
          break;
      }
      
      setFilteredVehicles(results);
    };
    
    applyFilters();
  }, [searchTerm, sortBy, brandFilter, priceRange, yearRange, vehicles]);

  const handleReset = () => {
    setSearchTerm('');
    setSortBy('newest');
    setBrandFilter('all');
    setPriceRange({ min: '', max: '' });
    setYearRange({ min: '', max: '' });
  };

  return {
    filteredVehicles,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    brandFilter,
    setBrandFilter,
    priceRange,
    setPriceRange,
    yearRange,
    setYearRange,
    uniqueBrands,
    handleReset
  };
}
