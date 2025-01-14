import { Metadata } from 'next';
import { api } from '@/lib/api';
import SearchResults from '@/components/sections/find/SearchResults';

type SearchParams = Record<string, string | string[] | undefined>;

// For Next.js 15 App Router
type GenerateMetadataProps = {
 params: { slug: string };
 searchParams: SearchParams;  
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
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

// Page component props type
type PageProps = {
 params: { slug: string };
 searchParams: SearchParams;
}

export default async function Page({ params }: PageProps) {
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

// Optional: Generate static params
export async function generateStaticParams() {
 return [
   { slug: 'example' }
 ];
}