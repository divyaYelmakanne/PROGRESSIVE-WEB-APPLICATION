import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Zap, Github, Twitter, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/30">
                  <Car className="w-5 h-5 text-primary-foreground" />
                </div>
                <Zap className="absolute -top-1 -right-1 w-4 h-4 text-primary" />
              </div>
              <span className="font-display font-bold text-xl text-foreground">
                Auto<span className="text-gradient">Cart</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Your ultimate destination for car shopping. Browse, compare, and shortlist your dream car.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/browse" className="text-sm text-muted-foreground hover:text-primary transition-colors">Browse Cars</Link></li>
              <li><Link to="/category/electric" className="text-sm text-muted-foreground hover:text-primary transition-colors">Electric Vehicles</Link></li>
              <li><Link to="/compare" className="text-sm text-muted-foreground hover:text-primary transition-colors">Compare Cars</Link></li>
              <li><Link to="/wishlist" className="text-sm text-muted-foreground hover:text-primary transition-colors">My Wishlist</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><Link to="/category/suv" className="text-sm text-muted-foreground hover:text-primary transition-colors">SUV</Link></li>
              <li><Link to="/category/sedan" className="text-sm text-muted-foreground hover:text-primary transition-colors">Sedan</Link></li>
              <li><Link to="/category/hatchback" className="text-sm text-muted-foreground hover:text-primary transition-colors">Hatchback</Link></li>
              <li><Link to="/category/luxury" className="text-sm text-muted-foreground hover:text-primary transition-colors">Luxury</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:hello@autocart.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="w-4 h-4" />
                  hello@autocart.com
                </a>
              </li>
            </ul>
            <div className="mt-4 p-3 rounded-lg bg-secondary/50 border border-border">
              <p className="text-xs text-muted-foreground">
                <Zap className="w-3 h-3 inline mr-1 text-primary" />
                This is a PWA! Install it on your device for offline access.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} AutoCart. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
