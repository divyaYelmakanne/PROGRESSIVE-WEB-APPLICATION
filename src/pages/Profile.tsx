import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Bell, Calendar, Heart, LogOut, Settings, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { carsData } from '@/data/carsData';
import { format } from 'date-fns';

interface NotificationPreferences {
  push_enabled: boolean;
  price_drop_alerts: boolean;
  new_model_alerts: boolean;
  test_drive_reminders: boolean;
  offer_alerts: boolean;
  wishlist_reminders: boolean;
}

interface TestDriveBooking {
  id: string;
  car_id: string;
  booking_date: string;
  booking_time: string;
  dealer_location: string;
  status: string;
}

const Profile: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null);
  const [bookings, setBookings] = useState<TestDriveBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch notification preferences
        const { data: prefsData } = await supabase
          .from('notification_preferences')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (prefsData) {
          setPreferences(prefsData);
        }

        // Fetch test drive bookings
        const { data: bookingsData } = await supabase
          .from('test_drive_bookings')
          .select('*')
          .eq('user_id', user.id)
          .order('booking_date', { ascending: true });

        if (bookingsData) {
          setBookings(bookingsData);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  const updatePreference = async (key: keyof NotificationPreferences, value: boolean) => {
    if (!user || !preferences) return;

    try {
      const { error } = await supabase
        .from('notification_preferences')
        .update({ [key]: value })
        .eq('user_id', user.id);

      if (error) throw error;

      setPreferences({ ...preferences, [key]: value });

      toast({
        title: "Preferences updated",
        description: "Your notification settings have been saved.",
      });
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update preferences.",
        variant: "destructive",
      });
    }
  };

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      toast({
        title: "Not supported",
        description: "Push notifications are not supported in this browser.",
        variant: "destructive",
      });
      return;
    }

    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      await updatePreference('push_enabled', true);
      toast({
        title: "Notifications enabled",
        description: "You will now receive push notifications.",
      });
    } else {
      toast({
        title: "Permission denied",
        description: "Please enable notifications in your browser settings.",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (!user) return null;

  const getCarDetails = (carId: string) => {
    return carsData.find(car => car.id === carId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Profile Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center">
                <User className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground">
                  {user.user_metadata?.full_name || 'User'}
                </h1>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            {/* Notification Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Manage how you receive updates and alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Push Notifications Toggle */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications even when the app is closed
                    </p>
                  </div>
                  {preferences?.push_enabled ? (
                    <Switch
                      checked={preferences.push_enabled}
                      onCheckedChange={(checked) => updatePreference('push_enabled', checked)}
                    />
                  ) : (
                    <Button size="sm" onClick={requestNotificationPermission}>
                      Enable
                    </Button>
                  )}
                </div>

                <Separator />

                {/* Notification Types */}
                {preferences && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Price Drop Alerts</Label>
                      <Switch
                        checked={preferences.price_drop_alerts}
                        onCheckedChange={(checked) => updatePreference('price_drop_alerts', checked)}
                        disabled={!preferences.push_enabled}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>New Model Launches</Label>
                      <Switch
                        checked={preferences.new_model_alerts}
                        onCheckedChange={(checked) => updatePreference('new_model_alerts', checked)}
                        disabled={!preferences.push_enabled}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Test Drive Reminders</Label>
                      <Switch
                        checked={preferences.test_drive_reminders}
                        onCheckedChange={(checked) => updatePreference('test_drive_reminders', checked)}
                        disabled={!preferences.push_enabled}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Offers & Discounts</Label>
                      <Switch
                        checked={preferences.offer_alerts}
                        onCheckedChange={(checked) => updatePreference('offer_alerts', checked)}
                        disabled={!preferences.push_enabled}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Wishlist Reminders</Label>
                      <Switch
                        checked={preferences.wishlist_reminders}
                        onCheckedChange={(checked) => updatePreference('wishlist_reminders', checked)}
                        disabled={!preferences.push_enabled}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Test Drive Bookings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Test Drive Bookings
                </CardTitle>
                <CardDescription>
                  Your scheduled test drives
                </CardDescription>
              </CardHeader>
              <CardContent>
                {bookings.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No test drives booked yet</p>
                    <Button variant="link" onClick={() => navigate('/browse')}>
                      Browse Cars
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => {
                      const car = getCarDetails(booking.car_id);
                      return (
                        <div
                          key={booking.id}
                          className="flex items-center justify-between p-4 rounded-lg border border-border bg-card/50"
                        >
                          <div>
                            <h4 className="font-medium">
                              {car ? `${car.brand} ${car.model}` : 'Unknown Car'}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(booking.booking_date), 'PPP')} at {booking.booking_time}
                            </p>
                            <p className="text-xs text-muted-foreground">{booking.dealer_location}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'confirmed' 
                              ? 'bg-green-500/10 text-green-500'
                              : booking.status === 'pending'
                              ? 'bg-yellow-500/10 text-yellow-500'
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-between"
                    onClick={() => navigate('/wishlist')}
                  >
                    <span className="flex items-center gap-3">
                      <Heart className="w-4 h-4" />
                      My Wishlist
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Separator />
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={handleSignOut}
                  >
                    <span className="flex items-center gap-3">
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
