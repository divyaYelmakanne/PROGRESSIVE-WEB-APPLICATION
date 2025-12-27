import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CarCard from '@/components/CarCard';
import { Button } from '@/components/ui/button';
import { carsData, countries } from '@/data/carsData';

const Brand: React.FC = () => {
  const { brandName } = useParams<{ brandName: string }>();
  const decodedBrand = decodeURIComponent(brandName || '');
  
  const brandCars = carsData.filter(car => car.brand === decodedBrand);
  const brandInfo = brandCars[0];
  const countryInfo = countries.find(c => c.code === brandInfo?.countryCode);

  if (brandCars.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Brand Not Found</h1>
            <p className="text-muted-foreground mb-8">
              We couldn't find any cars from "{decodedBrand}"
            </p>
            <Link to="/browse">
              <Button>Browse All Cars</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Group cars by category
  const carsByCategory = brandCars.reduce((acc, car) => {
    if (!acc[car.category]) {
      acc[car.category] = [];
    }
    acc[car.category].push(car);
    return acc;
  }, {} as Record<string, typeof brandCars>);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <Link to="/browse" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Browse
            </Link>
            
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">{countryInfo?.flag}</span>
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  {decodedBrand}
                </h1>
                <p className="text-muted-foreground">
                  {countryInfo?.name} • {brandCars.length} {brandCars.length === 1 ? 'Model' : 'Models'}
                </p>
              </div>
            </div>
          </div>

          {/* Cars by Category */}
          {Object.entries(carsByCategory).map(([category, cars]) => (
            <div key={category} className="mb-12">
              <h2 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <span className="text-primary">{category}</span>
                <span className="text-sm font-normal text-muted-foreground">
                  ({cars.length} {cars.length === 1 ? 'model' : 'models'})
                </span>
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {cars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Brand;
