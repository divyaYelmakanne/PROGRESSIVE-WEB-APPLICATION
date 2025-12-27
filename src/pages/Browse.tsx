import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CarCard from '@/components/CarCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { carsData, categories, brands } from '@/data/carsData';
import { cn } from '@/lib/utils';

const Browse: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredCars = useMemo(() => {
    return carsData.filter(car => {
      const matchesSearch = searchQuery === '' || 
        car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.model.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !selectedCategory || 
        car.category.toLowerCase() === selectedCategory.toLowerCase();
      
      const matchesBrand = !selectedBrand || 
        car.brand.toLowerCase() === selectedBrand.toLowerCase();

      return matchesSearch && matchesCategory && matchesBrand;
    });
  }, [searchQuery, selectedCategory, selectedBrand]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedBrand(null);
  };

  const hasActiveFilters = searchQuery || selectedCategory || selectedBrand;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 md:pt-28 pb-16">
        <div className="container">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
              Browse All Cars
            </h1>
            <p className="text-muted-foreground">
              Explore our collection of {carsData.length} cars from top brands
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by brand or model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-card border-border"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <Button
              variant="outline"
              className="h-12 md:w-auto"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filters
              {hasActiveFilters && (
                <span className="ml-2 w-2 h-2 rounded-full bg-primary" />
              )}
            </Button>
          </div>

          {/* Filters Panel */}
          <div className={cn(
            "overflow-hidden transition-all duration-300",
            showFilters ? "max-h-96 opacity-100 mb-8" : "max-h-0 opacity-0"
          )}>
            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-semibold text-foreground">Filters</h3>
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-3">Category</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.name.toLowerCase() ? "default" : "secondary"}
                      size="sm"
                      onClick={() => setSelectedCategory(
                        selectedCategory === category.name.toLowerCase() ? null : category.name.toLowerCase()
                      )}
                    >
                      <span className="mr-1">{category.icon}</span>
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div>
                <p className="text-sm text-muted-foreground mb-3">Brand</p>
                <div className="flex flex-wrap gap-2">
                  {brands.map((brand) => (
                    <Button
                      key={brand}
                      variant={selectedBrand === brand.toLowerCase() ? "default" : "secondary"}
                      size="sm"
                      onClick={() => setSelectedBrand(
                        selectedBrand === brand.toLowerCase() ? null : brand.toLowerCase()
                      )}
                    >
                      {brand}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing <span className="text-foreground font-medium">{filteredCars.length}</span> cars
            </p>
          </div>

          {/* Cars Grid */}
          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-2xl mb-2">🚗</p>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">No cars found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filters or search query</p>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Browse;
