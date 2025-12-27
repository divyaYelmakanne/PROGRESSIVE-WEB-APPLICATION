import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CarCard from '@/components/CarCard';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/context/WishlistContext';

const Wishlist: React.FC = () => {
  const { wishlist, clearWishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 md:pt-28 pb-16">
        <div className="container">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/30">
                  <Heart className="w-6 h-6 text-primary-foreground" />
                </div>
                <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground">
                  My Wishlist
                </h1>
              </div>
              <p className="text-muted-foreground">
                {wishlist.length === 0 
                  ? "Your wishlist is empty"
                  : `You have ${wishlist.length} car${wishlist.length > 1 ? 's' : ''} in your wishlist`
                }
              </p>
            </div>
            {wishlist.length > 0 && (
              <Button variant="outline" onClick={clearWishlist} className="text-destructive hover:text-destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>

          {/* Wishlist Content */}
          {wishlist.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                Your wishlist is empty
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                Start browsing our collection and add cars you love to your wishlist. 
                They'll be saved here even when you're offline!
              </p>
              <Link to="/browse">
                <Button variant="hero" size="lg" className="group">
                  Browse Cars
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          )}

          {/* Offline Notice */}
          {wishlist.length > 0 && (
            <div className="mt-12 p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">📱</span>
                </div>
                <div>
                  <h4 className="font-display font-semibold text-foreground mb-1">
                    Available Offline
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Your wishlist is automatically saved to your device. Access it anytime, 
                    even without an internet connection!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
