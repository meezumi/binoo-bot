import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

interface PageProps {
  params?: {
    slug?: string;
  };
}

async function getBusiness(slug: string | undefined): Promise<Business | null> {
  if (!slug) return null;

  try {
    const res = await fetch(
      `http://127.0.0.1:1337/api/businesses?filters[slug][$eq]=${slug}`,
      {
        next: { revalidate: 3600 },
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data: BusinessResponse = await res.json();
    return data.data[0] || null;
  } catch (error) {
    console.error('Failed to fetch business:', error);
    return null;
  }
}

function ErrorState({ message = "Business Not Found" }: { message?: string }) {
  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto bg-red-50">
        <CardHeader>
          <CardTitle className="text-2xl text-red-700">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600">
            {message}
          </p>
          <a
            href="/businesses"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            ← Back to all businesses
          </a>
        </CardContent>
      </Card>
    </div>
  );
}

export default async function BusinessPage({ params }: PageProps) {
  
  if (!params || !params.slug) {
    return <ErrorState message="Invalid URL parameters" />;
  }

  const business = await getBusiness(params.slug);
  
  if (!business) {
    return <ErrorState />;
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-4 mb-4">
            <a
              href="/businesses"
              className="text-blue-600 hover:underline"
            >
              ← Back to all businesses
            </a>
          </div>
          <CardTitle className="text-3xl">{business.name}</CardTitle>
          <div className="flex items-center gap-4 text-gray-600 mt-2">
            <div className="flex items-center gap-1">
              <span className="font-semibold">{business.rating}</span>
              <span>★</span>
            </div>
            <span>•</span>
            <span>{business.reviewCount} reviews</span>
            <span>•</span>
            <span>{business.priceRange}</span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">{business.description}</p>
          <div className="border-t pt-4">
            <h2 className="text-lg font-semibold mb-2">Business Details</h2>
            <div className="space-y-2 text-sm text-gray-500">
              <p>Business ID: {business.documentId}</p>
              <p>Last updated: {new Date(business.updatedAt).toLocaleDateString()}</p>
              <p>Published: {new Date(business.publishedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}