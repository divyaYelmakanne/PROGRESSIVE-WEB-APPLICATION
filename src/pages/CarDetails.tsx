import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Fuel, Users, Gauge, Zap, Check, Share2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getCarById, Car } from '@/data/carsData';
import { useWishlist } from '@/context/WishlistContext';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const CarDetails: React.FC = () => {
  const { carId } = useParams<{ carId: string }>();
  const car = carId ? getCarById(carId) : undefined;
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleShare = async () => {
    if (navigator.share && car) {
      try {
        await navigator.share({
          title: `${car.brand} ${car.model}`,
          text: `Check out the ${car.brand} ${car.model} on AutoCart!`,
          url: window.location.href,
        });
      } catch {
        toast({
          title: "Link Copied",
          description: "The link has been copied to your clipboard.",
        });
      }
    }
  };

  if (!car) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 md:pt-28 pb-16">
          <div className="container text-center py-16">
            <h1 className="font-display font-bold text-2xl text-foreground mb-4">Car Not Found</h1>
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

  const inWishlist = isInWishlist(car.id);

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

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden bg-card border border-border">
                <img
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full aspect-[4/3] object-cover"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {car.isNew && (
                    <Badge className="gradient-primary border-0 text-primary-foreground font-semibold shadow-lg">
                      New
                    </Badge>
                  )}
                  {car.category === 'Electric' && (
                    <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                      <Zap className="w-3 h-3 mr-1" /> Electric
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div>
              {/* Title & Brand */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">{car.brand}</p>
                <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-2">
                  {car.model}
                </h1>
                <Badge variant="outline">{car.category}</Badge>
              </div>

              {/* Price */}
              <div className="mb-8 p-4 rounded-xl bg-card border border-border">
                <p className="text-sm text-muted-foreground mb-1">Price Range</p>
                <p className="font-display font-bold text-2xl text-gradient">{car.price}</p>
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-card border border-border text-center">
                  <Fuel className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground mb-1">Fuel</p>
                  <p className="text-sm font-medium text-foreground">{car.specs.fuelType.split(' / ')[0]}</p>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border text-center">
                  <Users className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground mb-1">Seating</p>
                  <p className="text-sm font-medium text-foreground">{car.specs.seating} Seats</p>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border text-center">
                  <Gauge className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground mb-1">Transmission</p>
                  <p className="text-sm font-medium text-foreground">{car.specs.transmission.split(' / ')[0]}</p>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border text-center">
                  <Zap className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground mb-1">Power</p>
                  <p className="text-sm font-medium text-foreground">{car.specs.power || car.specs.range}</p>
                </div>
              </div>

              {/* Detailed Specs */}
              <div className="mb-8">
                <h3 className="font-display font-semibold text-lg text-foreground mb-4">Specifications</h3>
                <div className="space-y-3">
                  {car.specs.engine && (
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Engine</span>
                      <span className="text-foreground font-medium">{car.specs.engine}</span>
                    </div>
                  )}
                  {car.specs.mileage && (
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Mileage</span>
                      <span className="text-foreground font-medium">{car.specs.mileage}</span>
                    </div>
                  )}
                  {car.specs.range && (
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Range</span>
                      <span className="text-foreground font-medium">{car.specs.range}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Transmission</span>
                    <span className="text-foreground font-medium">{car.specs.transmission}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Fuel Type</span>
                    <span className="text-foreground font-medium">{car.specs.fuelType}</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="font-display font-semibold text-lg text-foreground mb-4">Key Features</h3>
                <div className="grid grid-cols-2 gap-3">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant={inWishlist ? "outline" : "hero"}
                  size="lg"
                  className="flex-1"
                  onClick={() => inWishlist ? removeFromWishlist(car.id) : addToWishlist(car)}
                >
                  <Heart className={cn(
                    "w-5 h-5 mr-2",
                    inWishlist && "fill-primary text-primary"
                  )} />
                  {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </Button>
                <Button variant="glass" size="lg" onClick={handleShare}>
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CarDetails;
