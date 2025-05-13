
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface VehiclePaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

const VehiclePagination: React.FC<VehiclePaginationProps> = ({
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  // Generate an array of page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Show max 5 page numbers
    
    if (totalPages <= maxPagesToShow) {
      // If we have 5 or fewer pages, show all of them
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);
      
      // Calculate start and end of the visible page numbers
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if we're near the beginning or end
      if (currentPage <= 2) {
        endPage = 4;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 3;
      }
      
      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pageNumbers.push('ellipsis1');
      }
      
      // Add the visible page numbers
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push('ellipsis2');
      }
      
      // Always include last page if more than 1 page
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mt-8">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              className={`${currentPage === 1 ? 'opacity-50 pointer-events-none' : 'cursor-pointer'} bg-gray-800 border-gray-700 text-white`}
            />
          </PaginationItem>

          {getPageNumbers().map((page, index) => (
            <PaginationItem key={index}>
              {page === 'ellipsis1' || page === 'ellipsis2' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink 
                  isActive={page === currentPage}
                  onClick={() => typeof page === 'number' && setCurrentPage(page)}
                  className={`
                    cursor-pointer
                    ${page === currentPage 
                      ? 'bg-veloz-yellow text-veloz-black border-veloz-yellow' 
                      : 'bg-gray-800 text-white border-gray-700'}
                  `}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext 
              onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
              className={`${currentPage === totalPages ? 'opacity-50 pointer-events-none' : 'cursor-pointer'} bg-gray-800 border-gray-700 text-white`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default VehiclePagination;
