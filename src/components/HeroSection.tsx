import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-hero-pattern" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                          linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="container relative z-10 px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Progressive Web App</span>
          </div>

          {/* Heading */}
          <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-foreground mb-6 leading-tight animate-slide-up">
            Find Your Perfect
            <br />
            <span className="text-gradient">Dream Car</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Browse through 25+ premium cars from top brands. Compare features, 
            shortlist favorites, and access your wishlist even offline.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/browse">
              <Button variant="hero" size="xl" className="group">
                Browse Cars
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/category/electric">
              <Button variant="glass" size="xl">
                <Zap className="w-5 h-5 text-emerald-400" />
                Explore EVs
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-card/50 border border-border backdrop-blur-sm">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground text-sm">Installable</p>
                <p className="text-xs text-muted-foreground">Works like an app</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-card/50 border border-border backdrop-blur-sm">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground text-sm">Offline Mode</p>
                <p className="text-xs text-muted-foreground">Browse without internet</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-card/50 border border-border backdrop-blur-sm">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground text-sm">Fast & Secure</p>
                <p className="text-xs text-muted-foreground">Lightning fast loading</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
