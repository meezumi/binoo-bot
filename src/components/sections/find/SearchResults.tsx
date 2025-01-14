'use client';

import { useEffect, useState } from 'react';
import { api, Business } from '@/lib/api';
import { BusinessCard } from './BusinessCard';
import { Filters } from './Filters';

interface SearchResultsProps {
  slug: string;
  initialData?: Business[];
}

export default function SearchResults({ slug, initialData }: SearchResultsProps) {
  const [businesses, setBusinesses] = useState<Business[]>(initialData || []);
  const [filters, setFilters] = useState({
    priceRange: [] as string[],
    minRating: 0,
  });
  const [loading, setLoading] = useState(!initialData);

  useEffect(() => {
    if (!initialData) {
      fetchBusinesses();
    }
  }, [slug, filters]);

  async function fetchBusinesses() {
    try {
      setLoading(true);
      const [location, category] = slug.split('-in-');
      const response = await api.getBusinesses({
        location: location,
        category: category,
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
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <aside className="lg:col-span-1">
        <Filters
          filters={filters}
          onChange={newFilters => setFilters(newFilters)}
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
              {slug.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </h1>
            <div className="grid gap-6">
              {businesses.map(business => (
                <BusinessCard 
                  key={business.id} 
                  business={business} 
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
