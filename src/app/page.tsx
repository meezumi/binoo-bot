import Hero from '@/components/sections/home/Hero';
import Features from '@/components/sections/home/Features';
import SearchComponent from '@/components/sections/home/SearchComponent';

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="p-4">
        <SearchComponent />
      </div>
      <Features />
      
    </>
  );
}