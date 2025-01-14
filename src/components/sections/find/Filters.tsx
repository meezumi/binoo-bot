'use client';

interface FiltersProps {
  filters: {
    priceRange: string[];
    minRating: number;
  };
  onChange: (filters: FiltersProps['filters']) => void;
}

export function Filters({ filters, onChange }: FiltersProps) {
  const priceRanges = ['$', '$$', '$$$', '$$$$'];
  const ratings = [4, 3, 2];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Price</label>
            <div className="mt-2 space-x-2">
              {priceRanges.map((price) => (
                <button
                  key={price}
                  className={`px-3 py-1 border rounded-full ${
                    filters.priceRange.includes(price)
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    const newPriceRange = filters.priceRange.includes(price)
                      ? filters.priceRange.filter(p => p !== price)
                      : [...filters.priceRange, price];
                    onChange({ ...filters, priceRange: newPriceRange });
                  }}
                >
                  {price}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Rating</label>
            <div className="mt-2 space-y-2">
              {ratings.map((rating) => (
                <div key={rating} className="flex items-center">
                  <input
                    type="radio"
                    className="rounded text-blue-600"
                    checked={filters.minRating === rating}
                    onChange={() => onChange({ ...filters, minRating: rating })}
                  />
                  <label className="ml-2">{rating}+ Stars</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}