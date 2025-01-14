'use client';

import { useEffect, useState, useCallback } from 'react';
import { api, Business } from '@/lib/api';
import { BusinessCard } from './BusinessCard';
import { Filters } from './Filters';

interface SearchResultsProps {
  slug: string;
  initialData?: Business[];
}

interface FilterState {
  priceRange: string[];
  minRating: number;
}

export default function SearchResults({ slug, initialData }: SearchResultsProps) {
  const [businesses, setBusinesses] = useState<Business[]>(initialData || []);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [],
    minRating: 0,
  });
  const [loading, setLoading] = useState(!initialData);

  const fetchBusinesses = useCallback(async () => {
    try {
      setLoading(true);
      const [location, category] = slug.split('-in-');
      const response = await api.getBusinesses({
        location,
        category,
      });
      
      let filteredData = response.data;
      
      // Apply client-side filters
      if (filters.priceRange.length > 0) {
        filteredData = filteredData.filter(business => 
          filters.priceRange.includes(business.attributes.priceRange)
        );
      }
      
      if (filters.minRating > 0) {
        filteredData = filteredData.filter(business => 
          business.attributes.rating >= filters.minRating
        );
      }

      setBusinesses(filteredData);
    } catch (error) {
      console.error('Error fetching businesses:', error);
      setBusinesses([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  }, [slug, filters.priceRange, filters.minRating]);

  useEffect(() => {
    // Only fetch if no initial data or if filters have changed
    if (!initialData || filters.priceRange.length > 0 || filters.minRating > 0) {
      fetchBusinesses();
    }
  }, [fetchBusinesses, initialData]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const formatTitle = (text: string): string => {
    return text
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <aside className="lg:col-span-1">
        <Filters
          filters={filters}
          onChange={handleFilterChange}
        />
      </aside>
      <div className="lg:col-span-3">
        {loading ? (
          <div className="flex justify-center">
            <span className="loading">Loading...</span>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-6">
              {formatTitle(slug)}
            </h1>
            {businesses.length > 0 ? (
              <div className="grid gap-6">
                {businesses.map(business => (
                  <BusinessCard 
                    key={business.id} 
                    business={business} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500">
                No businesses found matching your criteria
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}