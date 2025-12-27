import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Fuel, Users, Gauge, Zap, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Car } from '@/data/carsData';
import { useWishlist } from '@/context/WishlistContext';
import { cn } from '@/lib/utils';

interface CarCardProps {
  car: Car;
  className?: string;
  featured?: boolean;
}

const CarCard: React.FC<CarCardProps> = ({ car, className, featured = false }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(car.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(car.id);
    } else {
      addToWishlist(car);
    }
  };

  return (
    <Link 
      to={`/car/${car.id}`}
      className={cn(
        "group block rounded-2xl overflow-hidden bg-card border border-border shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-1",
        featured && "md:col-span-2 md:row-span-2",
        className
      )}
    >
      {/* Image Container */}
      <div className={cn(
        "relative overflow-hidden bg-gradient-to-br from-secondary to-muted",
        featured ? "h-64 md:h-80" : "h-48"
      )}>
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {car.isNew && (
            <Badge className="gradient-primary border-0 text-primary-foreground font-semibold shadow-lg">
              New
            </Badge>
          )}
          {car.category === 'Electric' && (
            <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              <Zap className="w-3 h-3 mr-1" /> EV
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          variant="glass"
          size="icon"
          className={cn(
            "absolute top-3 right-3 rounded-full",
            inWishlist && "bg-primary/20 border-primary/50"
          )}
          onClick={handleWishlistToggle}
        >
          <Heart className={cn(
            "w-4 h-4 transition-all duration-300",
            inWishlist ? "fill-primary text-primary scale-110" : "text-foreground"
          )} />
        </Button>

        {/* Price Tag */}
        <div className="absolute bottom-3 left-3">
          <p className="text-xs text-muted-foreground mb-0.5">Starting at</p>
          <p className="font-display font-bold text-lg text-foreground">{car.price.split(' - ')[0]}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        {/* Title */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{car.brand}</p>
            <h3 className="font-display font-bold text-xl text-foreground group-hover:text-primary transition-colors duration-300">
              {car.model}
            </h3>
          </div>
          <Badge variant="outline" className="text-xs">
            {car.category}
          </Badge>
        </div>

        {/* Specs */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1.5">
            <Fuel className="w-4 h-4" />
            <span>{car.specs.fuelType.split(' / ')[0]}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>{car.specs.seating} Seats</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Gauge className="w-4 h-4" />
            <span>{car.specs.transmission.split(' / ')[0]}</span>
          </div>
        </div>

        {/* Features Preview */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {car.features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="px-2 py-1 rounded-md bg-secondary/50 text-xs text-muted-foreground"
            >
              {feature}
            </span>
          ))}
          {car.features.length > 3 && (
            <span className="px-2 py-1 rounded-md bg-secondary/50 text-xs text-muted-foreground">
              +{car.features.length - 3} more
            </span>
          )}
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-primary group-hover:text-primary/80 flex items-center gap-1 transition-all duration-300">
            View Details
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;
