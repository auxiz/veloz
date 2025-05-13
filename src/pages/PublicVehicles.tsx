
import React, { useState, useEffect } from 'react';
import { Vehicle } from '@/types/vehicle';
import PublicNavbar from '@/components/PublicNavbar';
import Footer from '@/components/Footer';
import VehicleFilterSidebar from '@/components/vehicles/VehicleFilterSidebar';
import VehicleGrid from '@/components/vehicles/VehicleGrid';
import VehiclePageHeader from '@/components/vehicles/VehiclePageHeader';
import { useVehicleFiltering } from '@/hooks/useVehicleFiltering';
import { loadVehiclesFromLocalStorage, startScheduledImport } from '@/utils/scheduledXmlImport';

const PublicVehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const xmlUrl = "http://app.revendamais.com.br/application/index.php/apiGeneratorXml/generator/sitedaloja/e64ccd1ada81eb551e2537627b54e6de11998.xml";
  
  // Get all the filtering functionality from our custom hook
  const {
    filteredVehicles,
    paginatedVehicles,
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
    handleReset,
    // Pagination
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalPages
  } = useVehicleFiltering(vehicles);
  
  useEffect(() => {
    const loadVehicles = () => {
      setLoading(true);
      
      // Load vehicles from localStorage
      const storedVehicles = loadVehiclesFromLocalStorage();
      
      // Filter for only available vehicles
      const availableVehicles = storedVehicles.filter(v => v.status === 'available');
      
      setVehicles(availableVehicles);
      setLoading(false);
      
      // Start scheduled import if not already running
      startScheduledImport(
        xmlUrl,
        (result) => {
          if (result.success && result.vehicles) {
            // Update the available vehicles when new data is imported
            const newAvailableVehicles = result.vehicles.filter(v => v.status === 'available');
            setVehicles(newAvailableVehicles);
          }
        }
      );
    };
    
    loadVehicles();
  }, []);

  return (
    <div className="min-h-screen bg-veloz-black text-white">
      <PublicNavbar />
      
      <main className="container mx-auto px-4 py-8">
        <VehiclePageHeader totalVehicles={filteredVehicles.length} />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters sidebar */}
          <VehicleFilterSidebar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortBy={sortBy}
            setSortBy={setSortBy}
            brandFilter={brandFilter}
            setBrandFilter={setBrandFilter}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            yearRange={yearRange}
            setYearRange={setYearRange}
            uniqueBrands={uniqueBrands}
            onReset={handleReset}
          />
          
          {/* Vehicle grid with pagination */}
          <div className="lg:col-span-3">
            <VehicleGrid 
              vehicles={paginatedVehicles} 
              isLoading={loading}
              onResetFilters={handleReset}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pageSize={pageSize}
              setPageSize={setPageSize}
              totalPages={totalPages}
              totalVehicles={filteredVehicles.length}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PublicVehicles;
