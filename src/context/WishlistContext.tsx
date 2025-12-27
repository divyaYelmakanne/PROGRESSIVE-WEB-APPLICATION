import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Car } from '@/data/carsData';
import { toast } from '@/hooks/use-toast';

interface WishlistContextType {
  wishlist: Car[];
  addToWishlist: (car: Car) => void;
  removeFromWishlist: (carId: string) => void;
  isInWishlist: (carId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Car[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('autocart-wishlist');
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch {
        console.error('Failed to parse wishlist from localStorage');
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('autocart-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (car: Car) => {
    if (!isInWishlist(car.id)) {
      setWishlist(prev => [...prev, car]);
      toast({
        title: "Added to Wishlist",
        description: `${car.brand} ${car.model} has been added to your wishlist.`,
      });
    }
  };

  const removeFromWishlist = (carId: string) => {
    setWishlist(prev => {
      const car = prev.find(c => c.id === carId);
      if (car) {
        toast({
          title: "Removed from Wishlist",
          description: `${car.brand} ${car.model} has been removed from your wishlist.`,
        });
      }
      return prev.filter(car => car.id !== carId);
    });
  };

  const isInWishlist = (carId: string) => {
    return wishlist.some(car => car.id === carId);
  };

  const clearWishlist = () => {
    setWishlist([]);
    toast({
      title: "Wishlist Cleared",
      description: "All cars have been removed from your wishlist.",
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
