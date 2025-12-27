import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BrandCard from '@/components/BrandCard';
import { carsData, countries } from '@/data/carsData';
import { cn } from '@/lib/utils';

const BrandsSection: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [showAllCountries, setShowAllCountries] = useState(false);

  // Get unique brands with their car counts and country info
  const brandsWithInfo = React.useMemo(() => {
    const brandMap = new Map<string, { country: string; countryCode: string; count: number }>();
    
    carsData.forEach(car => {
      if (!brandMap.has(car.brand)) {
        brandMap.set(car.brand, { 
          country: car.country, 
          countryCode: car.countryCode, 
          count: 1 
        });
      } else {
        const existing = brandMap.get(car.brand)!;
        brandMap.set(car.brand, { ...existing, count: existing.count + 1 });
      }
    });

    return Array.from(brandMap.entries()).map(([brand, info]) => ({
      brand,
      ...info,
      countryFlag: countries.find(c => c.code === info.countryCode)?.flag || '🌍'
    }));
  }, []);

  // Filter brands by selected country
  const filteredBrands = selectedCountry
    ? brandsWithInfo.filter(b => b.countryCode === selectedCountry)
    : brandsWithInfo;

  // Group brands by country for display
  const brandsByCountry = React.useMemo(() => {
    const grouped: Record<string, typeof filteredBrands> = {};
    filteredBrands.forEach(brand => {
      if (!grouped[brand.countryCode]) {
        grouped[brand.countryCode] = [];
      }
      grouped[brand.countryCode].push(brand);
    });
    return grouped;
  }, [filteredBrands]);

  const displayedCountries = showAllCountries ? countries : countries.slice(0, 6);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Explore Brands
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Shop by <span className="text-gradient">Brand</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse cars from your favorite manufacturers across the world
          </p>
        </div>

        {/* Country Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            <Button
              variant={selectedCountry === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCountry(null)}
              className="gap-2"
            >
              <Globe className="w-4 h-4" />
              All Countries
            </Button>
            {displayedCountries.map(country => (
              <Button
                key={country.code}
                variant={selectedCountry === country.code ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCountry(country.code)}
                className="gap-2"
              >
                <span>{country.flag}</span>
                {country.name}
              </Button>
            ))}
          </div>
          {countries.length > 6 && (
            <div className="text-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAllCountries(!showAllCountries)}
                className="gap-2"
              >
                {showAllCountries ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    Show More Countries
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Brands Grid */}
        {selectedCountry ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredBrands.map((brand, idx) => (
              <BrandCard
                key={brand.brand}
                brand={brand.brand}
                country={brand.country}
                countryFlag={brand.countryFlag}
                carCount={brand.count}
                featured={idx < 3}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-10">
            {Object.entries(brandsByCountry).map(([countryCode, brands]) => {
              const country = countries.find(c => c.code === countryCode);
              return (
                <div key={countryCode}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">{country?.flag}</span>
                    <h3 className="font-display text-xl font-bold text-foreground">
                      {country?.name || 'Other'}
                    </h3>
                    <span className="text-sm text-muted-foreground">
                      ({brands.length} {brands.length === 1 ? 'brand' : 'brands'})
                    </span>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {brands.map((brand, idx) => (
                      <BrandCard
                        key={brand.brand}
                        brand={brand.brand}
                        country={brand.country}
                        countryFlag={brand.countryFlag}
                        carCount={brand.count}
                        featured={idx === 0}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default BrandsSection;
