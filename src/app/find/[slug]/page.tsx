import { Metadata } from 'next';
import { api } from '@/lib/api';
import SearchResults from '@/components/sections/find/SearchResults';

// Define the params type
type SearchParams = {
  [key: string]: string | string[] | undefined;
};

// Define the props interface
interface PageProps {
  params: {
    slug: string;
  };
  searchParams: SearchParams;
}

// Make generateMetadata async and handle Promise params
export async function generateMetadata(
  props: PageProps
): Promise<Metadata> {
  const title = props.params.slug
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

// Make the page component async and handle Promise params
export default async function FindPage(
  props: PageProps
) {
  const { params, searchParams } = props;
  
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