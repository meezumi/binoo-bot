import { Metadata } from 'next';
import { api } from '@/lib/api';
import SearchResults from '@/components/sections/find/SearchResults';

type SearchParams = Record<string, string | string[] | undefined>;

// Updated types to reflect that `params` is a Promise
type GenerateMetadataProps = {
  params: Promise<{ slug: string }>;
  searchParams: SearchParams;  
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  const { slug } = await params; // Await the resolution of params
  const title = slug
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

// Page component props type updated
type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: SearchParams;
}

export default async function Page({ params }: PageProps) {
  // Await the resolution of params
  const { slug } = await params;
  const [location, category] = slug.split('-in-');
  const initialData = await api.getBusinesses({
    location,
    category,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SearchResults 
        slug={slug} 
        initialData={initialData.data}
      />
    </div>
  );
}

// Optional: Generate static params (No change needed here)
export async function generateStaticParams() {
  return [
    { slug: 'example' }
  ];
}
