export function BusinessCard({ business }: { business: any }) {
  return (
    <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold">{business.name}</h2>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-yellow-400">⭐</span>
            <span>{business.rating}</span>
            <span className="text-gray-400">({business.reviews} reviews)</span>
            <span className="text-gray-400">•</span>
            <span>{business.price}</span>
          </div>
          <p className="mt-2 text-gray-600">{business.description}</p>
        </div>
      </div>
    </div>
  );
}