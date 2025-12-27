import React from 'react';
import { LayoutGrid } from 'lucide-react';
import CategoryCard from '@/components/CategoryCard';
import { categories, getCarsByCategory } from '@/data/carsData';

const CategoriesSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-card/30 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border mb-4">
            <LayoutGrid className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Categories</span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
            Browse by Category
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Find the perfect car type that matches your lifestyle and needs.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              icon={category.icon}
              description={category.description}
              carCount={getCarsByCategory(category.name).length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
