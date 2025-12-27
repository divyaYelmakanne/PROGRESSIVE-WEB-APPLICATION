import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CarCard from '@/components/CarCard';
import { getFeaturedCars } from '@/data/carsData';

const FeaturedCars: React.FC = () => {
  const featuredCars = getFeaturedCars();

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Featured</span>
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
              Popular Picks
            </h2>
            <p className="text-muted-foreground max-w-lg">
              Discover the most sought-after cars loved by our community. From powerful SUVs to eco-friendly EVs.
            </p>
          </div>
          <Link to="/browse">
            <Button variant="outline" className="group">
              View All Cars
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Featured Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCars.slice(0, 6).map((car, index) => (
            <CarCard 
              key={car.id} 
              car={car} 
              featured={index === 0}
              className={index === 0 ? "lg:col-span-2 lg:row-span-1" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
