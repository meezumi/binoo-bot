"use client"
import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  interface SearchResult {
    id: string;
    attributes: {
      name: string;
      description: string;
      address: {
        city: string;
      };
      priceRange: string;
    };
  }

  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchAPI = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/search?q=${searchTerm}`
      );
      
      const data = await response.json();
      // Log the data to see its structure
      console.log('API Response:', data);
      
      // Check if data exists and has the expected structure
      // setResults(data?.data || []);
      const names = data.data.map((item: SearchResult) => item.attributes.name);
      setResults(names);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    const timeoutId = setTimeout(() => {
      searchAPI(value);
    }, 300);
    return () => clearTimeout(timeoutId);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search businesses..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {isLoading && (
          <div className="mt-4 text-center text-gray-600">
            Searching...
          </div>
        )}

        {results.length > 0 && (
          <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg border">
            {results.map((item) => {
              // Add null checks
              const name = item?.attributes?.name || 'No name available';
              const description = item?.attributes?.description || 'No description available';
              const city = item?.attributes?.address?.city || '';
              const priceRange = item?.attributes?.priceRange || '';

              return (
                <div
                  key={item.id}
                  className="p-4 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                >
                  <h3 className="font-medium">{name}</h3>
                  <p className="text-sm text-gray-600">{description}</p>
                  {(city || priceRange) && (
                    <div className="mt-1 text-sm text-gray-500">
                      {[city, priceRange].filter(Boolean).join(', ')}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        
        {query && !isLoading && results.length === 0 && (
          <div className="mt-4 text-center text-gray-600">
            No results found
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;