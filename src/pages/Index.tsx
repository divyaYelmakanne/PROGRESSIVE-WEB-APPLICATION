import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import CategoriesSection from '@/components/CategoriesSection';
import BrandsSection from '@/components/BrandsSection';
import FeaturedCars from '@/components/FeaturedCars';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <BrandsSection />
        <CategoriesSection />
        <FeaturedCars />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
