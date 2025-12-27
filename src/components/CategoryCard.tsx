import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  id: string;
  name: string;
  icon: string;
  description: string;
  carCount: number;
  className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  id, 
  name, 
  icon, 
  description, 
  carCount,
  className 
}) => {
  return (
    <Link
      to={`/category/${id}`}
      className={cn(
        "group relative flex flex-col items-center p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-elevated overflow-hidden",
        className
      )}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Icon */}
      <div className="relative z-10 w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
        <span className="text-3xl">{icon}</span>
      </div>

      {/* Content */}
      <h3 className="relative z-10 font-display font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
        {name}
      </h3>
      <p className="relative z-10 text-sm text-muted-foreground mb-2">{description}</p>
      <p className="relative z-10 text-xs text-primary font-medium">{carCount} Cars</p>

      {/* Arrow */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
        <ChevronRight className="w-5 h-5 text-primary" />
      </div>
    </Link>
  );
};

export default CategoryCard;
