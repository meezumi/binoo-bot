import { Metadata } from 'next';
import { api } from '@/lib/api';
import SearchResults from '@/components/sections/find/SearchResults';

// Define params type separately
type PageParams = {
  slug: string;
};

// Define the props interface for the page
interface PageProps {
  params: PageParams;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const title = params.slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${title} - Bino Bot`,
    description: `Find the best ${title} with Bino Bot's local search`,
    openGraph: {
      title: `${title} - Bino Bot`,
      description: `Find the best ${title} with Bino Bot's local search`,
    },
  };
}

export default async function FindPage({
  params,
  searchParams
}: PageProps) {
  // Fetch initial data server-side
  const [location, category] = params.slug.split('-in-');
  const initialData = await api.getBusinesses({
    location,
    category,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SearchResults 
        slug={params.slug} 
        initialData={initialData.data}
      />
    </div>
  );
}

// Optional: Generate static params if using static generation
export async function generateStaticParams(): Promise<PageParams[]> {
  // Fetch your paths data here
  return [
    { slug: 'example-slug' }
    // Add more slugs as needed
  ];
}