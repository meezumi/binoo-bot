// app/businesses/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Suspense } from "react";

interface Business {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface BusinessResponse {
  data: Business[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// for development/testing
const sampleData: BusinessResponse = {
  data: [
    {
      id: 2,
      documentId: "max53pkqvnx3tney1vgtv0lb",
      name: "Lake Palace Hotel",
      slug: "lake-palace-hotel",
      description: "Luxury hotel in the middle of Lake Pichola",
      rating: 4.8,
      reviewCount: 1250,
      priceRange: "$$$$",
      createdAt: "2025-01-12T08:00:55.121Z",
      updatedAt: "2025-01-12T08:00:55.121Z",
      publishedAt: "2025-01-12T08:00:55.132Z"
    }
  ],
  meta: {
    pagination: {
      page: 1,
      pageSize: 25,
      pageCount: 1,
      total: 1
    }
  }
};

async function getBusinesses(): Promise<BusinessResponse> {
  
//   return sampleData;

 
  
  try {
    const API_URL = 'http://127.0.0.1:1337';
    const res = await fetch(`${API_URL}/api/businesses/`, {
      next: { revalidate: 3600 },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    return res.json();
  } catch (error) {
    console.error('Failed to fetch businesses:', error);
   
    return sampleData;
  }
  
}

function BusinessCard({ business }: { business: Business }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl">{business.name}</CardTitle>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Rating: {business.rating}</span>
          <span>•</span>
          <span>{business.reviewCount} reviews</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{business.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">{business.priceRange}</span>
          <a 
            href={`/businesses/${business.slug}`}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            View Details
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

function LoadingState() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader>
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
          </CardHeader>
          <CardContent>
            <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
            <div className="flex justify-between items-center">
              <div className="h-6 bg-gray-200 rounded w-16"></div>
              <div className="h-8 bg-gray-200 rounded w-24"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default async function BusinessesPage() {
  const { data: businesses } = await getBusinesses();
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Featured Businesses</h1>
      <Suspense fallback={<LoadingState />}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      </Suspense>
    </div>
  );
}