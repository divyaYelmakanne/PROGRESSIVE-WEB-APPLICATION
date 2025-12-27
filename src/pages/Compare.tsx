import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, X, Scale, Fuel, Users, Gauge, Zap, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { carsData, Car } from '@/data/carsData';
import { cn } from '@/lib/utils';

const Compare: React.FC = () => {
  const [selectedCars, setSelectedCars] = useState<Car[]>([]);
  const [showSelector, setShowSelector] = useState(false);

  const addCar = (car: Car) => {
    if (selectedCars.length < 3 && !selectedCars.find(c => c.id === car.id)) {
      setSelectedCars([...selectedCars, car]);
    }
    setShowSelector(false);
  };

  const removeCar = (carId: string) => {
    setSelectedCars(selectedCars.filter(c => c.id !== carId));
  };

  const availableCars = carsData.filter(car => !selectedCars.find(c => c.id === car.id));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 md:pt-28 pb-16">
        <div className="container">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <Scale className="w-6 h-6 text-muted-foreground" />
              </div>
              <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground">
                Compare Cars
              </h1>
            </div>
            <p className="text-muted-foreground">
              Select up to 3 cars to compare their features and specifications
            </p>
          </div>

          {/* Car Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[0, 1, 2].map((index) => {
              const car = selectedCars[index];
              
              if (car) {
                return (
                  <div key={car.id} className="relative rounded-2xl bg-card border border-border overflow-hidden">
                    <button
                      onClick={() => removeCar(car.id)}
                      className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <img
                      src={car.image}
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{car.brand}</p>
                      <h3 className="font-display font-bold text-lg text-foreground">{car.model}</h3>
                      <Badge variant="outline" className="mt-2">{car.category}</Badge>
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={index}
                  onClick={() => setShowSelector(true)}
                  className="h-64 rounded-2xl border-2 border-dashed border-border hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-3 text-muted-foreground hover:text-foreground"
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                    <Plus className="w-6 h-6" />
                  </div>
                  <span className="font-medium">Add Car</span>
                </button>
              );
            })}
          </div>

          {/* Comparison Table */}
          {selectedCars.length >= 2 && (
            <div className="rounded-2xl bg-card border border-border overflow-hidden">
              <div className="p-6 border-b border-border">
                <h3 className="font-display font-semibold text-lg text-foreground">Comparison</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="p-4 text-left text-sm font-medium text-muted-foreground w-40">Specification</th>
                      {selectedCars.map(car => (
                        <th key={car.id} className="p-4 text-left text-sm font-medium text-foreground">
                          {car.brand} {car.model}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="p-4 text-sm text-muted-foreground">Price</td>
                      {selectedCars.map(car => (
                        <td key={car.id} className="p-4 text-sm font-medium text-gradient">{car.price}</td>
                      ))}
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4 text-sm text-muted-foreground">Category</td>
                      {selectedCars.map(car => (
                        <td key={car.id} className="p-4 text-sm text-foreground">{car.category}</td>
                      ))}
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4 text-sm text-muted-foreground">Fuel Type</td>
                      {selectedCars.map(car => (
                        <td key={car.id} className="p-4 text-sm text-foreground">{car.specs.fuelType}</td>
                      ))}
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4 text-sm text-muted-foreground">Transmission</td>
                      {selectedCars.map(car => (
                        <td key={car.id} className="p-4 text-sm text-foreground">{car.specs.transmission}</td>
                      ))}
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4 text-sm text-muted-foreground">Seating</td>
                      {selectedCars.map(car => (
                        <td key={car.id} className="p-4 text-sm text-foreground">{car.specs.seating} Seats</td>
                      ))}
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4 text-sm text-muted-foreground">Power</td>
                      {selectedCars.map(car => (
                        <td key={car.id} className="p-4 text-sm text-foreground">{car.specs.power || car.specs.range || 'N/A'}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 text-sm text-muted-foreground align-top">Features</td>
                      {selectedCars.map(car => (
                        <td key={car.id} className="p-4">
                          <div className="space-y-2">
                            {car.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm">
                                <Check className="w-4 h-4 text-primary" />
                                <span className="text-foreground">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {selectedCars.length < 2 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Select at least 2 cars to compare</p>
            </div>
          )}
        </div>

        {/* Car Selector Modal */}
        {showSelector && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h3 className="font-display font-semibold text-lg text-foreground">Select a Car</h3>
                <button
                  onClick={() => setShowSelector(false)}
                  className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4 overflow-y-auto max-h-96 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {availableCars.map(car => (
                  <button
                    key={car.id}
                    onClick={() => addCar(car)}
                    className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-left"
                  >
                    <img
                      src={car.image}
                      alt={`${car.brand} ${car.model}`}
                      className="w-16 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-xs text-muted-foreground">{car.brand}</p>
                      <p className="font-medium text-foreground">{car.model}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Compare;
