import React from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OfflineIndicatorProps {
  isOnline: boolean;
}

const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ isOnline }) => {
  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full",
        "bg-destructive text-destructive-foreground shadow-lg",
        "animate-in slide-in-from-bottom duration-300"
      )}>
        <WifiOff className="w-4 h-4" />
        <span className="text-sm font-medium">You're offline</span>
      </div>
    </div>
  );
};

export default OfflineIndicator;
