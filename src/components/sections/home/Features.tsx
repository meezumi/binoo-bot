export default function Features() {
  const features = [
    {
      title: 'Smart Search',
      description: 'Find exactly what you need with our intelligent search algorithm.',
      icon: '🔍',
    },
    {
      title: 'Local Expertise',
      description: 'Get recommendations from people who know your area best.',
      icon: '📍',
    },
    {
      title: 'Real Reviews',
      description: 'Read authentic reviews from verified customers.',
      icon: '⭐',
    },
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
            Features
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A better way to find local businesses
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white text-2xl">
                  {feature.icon}
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}