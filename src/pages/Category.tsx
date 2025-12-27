import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CarCard from '@/components/CarCard';
import { Button } from '@/components/ui/button';
import { categories, getCarsByCategory } from '@/data/carsData';

const Category: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  const category = categories.find(c => c.id === categoryId);
  const cars = categoryId ? getCarsByCategory(
    categories.find(c => c.id === categoryId)?.name || ''
  ) : [];

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 md:pt-28 pb-16">
          <div className="container text-center py-16">
            <h1 className="font-display font-bold text-2xl text-foreground mb-4">Category Not Found</h1>
            <Link to="/browse">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Browse
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 md:pt-28 pb-16">
        <div className="container">
          {/* Breadcrumb */}
          <Link to="/browse" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Browse
          </Link>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center">
                <span className="text-4xl">{category.icon}</span>
              </div>
              <div>
                <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground">
                  {category.name}
                </h1>
                <p className="text-muted-foreground">{category.description}</p>
              </div>
            </div>
            <p className="text-muted-foreground">
              Showing <span className="text-foreground font-medium">{cars.length}</span> cars in this category
            </p>
          </div>

          {/* Cars Grid */}
          {cars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-2xl mb-2">🚗</p>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">No cars in this category</h3>
              <p className="text-muted-foreground">Check back later for updates</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Category;
