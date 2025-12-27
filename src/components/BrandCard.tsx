import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BrandCardProps {
  brand: string;
  country: string;
  countryFlag: string;
  carCount: number;
  featured?: boolean;
}

const BrandCard: React.FC<BrandCardProps> = ({ brand, country, countryFlag, carCount, featured }) => {
  return (
    <Link
      to={`/brand/${encodeURIComponent(brand)}`}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm",
        "transition-all duration-500 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10",
        "hover:-translate-y-1",
        featured && "ring-2 ring-primary/20"
      )}
    >
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{countryFlag}</span>
            <div>
              <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                {brand}
              </h3>
              <p className="text-sm text-muted-foreground">{country}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              {carCount} {carCount === 1 ? 'Model' : 'Models'}
            </span>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </div>
      
      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
};

export default BrandCard;
