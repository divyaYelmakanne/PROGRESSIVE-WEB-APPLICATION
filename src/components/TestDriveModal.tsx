import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock, MapPin, Phone, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Car } from '@/data/carsData';
import { cn } from '@/lib/utils';

const testDriveSchema = z.object({
  bookingDate: z.date({ required_error: "Please select a date" }),
  bookingTime: z.string().min(1, "Please select a time"),
  dealerLocation: z.string().min(1, "Please select a location"),
  phone: z.string().min(10, "Please enter a valid phone number").max(15, "Phone number too long"),
  notes: z.string().max(500, "Notes must be less than 500 characters").optional(),
});

type TestDriveFormData = z.infer<typeof testDriveSchema>;

interface TestDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: Car;
}

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
];

const dealerLocations = [
  "Downtown Showroom - 123 Main St",
  "City Mall Branch - Mall Road",
  "Highway Center - NH-48",
  "Airport Terminal - IGI T3"
];

const TestDriveModal: React.FC<TestDriveModalProps> = ({ isOpen, onClose, car }) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = useState<Date>();

  const form = useForm<TestDriveFormData>({
    resolver: zodResolver(testDriveSchema),
    defaultValues: {
      phone: '',
      notes: '',
    },
  });

  const handleSubmit = async (data: TestDriveFormData) => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to book a test drive.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('test_drive_bookings').insert({
        user_id: user.id,
        car_id: car.id,
        booking_date: format(data.bookingDate, 'yyyy-MM-dd'),
        booking_time: data.bookingTime,
        dealer_location: data.dealerLocation,
        phone: data.phone,
        notes: data.notes || null,
      });

      if (error) throw error;

      toast({
        title: "Test Drive Booked!",
        description: `Your test drive for ${car.brand} ${car.model} has been scheduled.`,
      });

      form.reset();
      onClose();
    } catch (error: any) {
      toast({
        title: "Booking Failed",
        description: error.message || "Failed to book test drive. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Book Test Drive</DialogTitle>
          <DialogDescription>
            Schedule a test drive for the {car.brand} {car.model}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mt-4">
          {/* Date Picker */}
          <div className="space-y-2">
            <Label>Select Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => {
                    setDate(selectedDate);
                    if (selectedDate) {
                      form.setValue('bookingDate', selectedDate);
                    }
                  }}
                  disabled={(date) => date < new Date() || date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
            {form.formState.errors.bookingDate && (
              <p className="text-sm text-destructive">{form.formState.errors.bookingDate.message}</p>
            )}
          </div>

          {/* Time Slot */}
          <div className="space-y-2">
            <Label>Select Time</Label>
            <Select onValueChange={(value) => form.setValue('bookingTime', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a time slot">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{form.watch('bookingTime') || "Choose a time slot"}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>{time}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.bookingTime && (
              <p className="text-sm text-destructive">{form.formState.errors.bookingTime.message}</p>
            )}
          </div>

          {/* Dealer Location */}
          <div className="space-y-2">
            <Label>Dealer Location</Label>
            <Select onValueChange={(value) => form.setValue('dealerLocation', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a showroom">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{form.watch('dealerLocation') || "Select a showroom"}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {dealerLocations.map((location) => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.dealerLocation && (
              <p className="text-sm text-destructive">{form.formState.errors.dealerLocation.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Contact Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                className="pl-10"
                {...form.register('phone')}
              />
            </div>
            {form.formState.errors.phone && (
              <p className="text-sm text-destructive">{form.formState.errors.phone.message}</p>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <div className="relative">
              <Textarea
                id="notes"
                placeholder="Any specific requirements or questions..."
                className="min-h-[80px]"
                {...form.register('notes')}
              />
            </div>
            {form.formState.errors.notes && (
              <p className="text-sm text-destructive">{form.formState.errors.notes.message}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? 'Booking...' : 'Confirm Booking'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TestDriveModal;
