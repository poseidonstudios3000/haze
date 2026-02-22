import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

function parseDate(input: string): Date | null {
  const match = input.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return null;
  const [, month, day, year] = match;
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  if (isNaN(date.getTime())) return null;
  if (date.getMonth() !== parseInt(month) - 1 || date.getDate() !== parseInt(day)) return null;
  return date;
}

function getTomorrow(): Date {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
}

const bookingSchema = z.object({
  eventType: z.string().min(1, "Event type is required"),
  location: z.string().min(1, "Location is required"),
  date: z.string().min(1, "Event Date is required")
    .refine(
      (date) => /^\d{2}\/\d{2}\/\d{4}$/.test(date),
      "Please enter date as mm/dd/yyyy"
    )
    .refine(
      (date) => {
        const parsed = parseDate(date);
        return parsed !== null;
      },
      "Invalid date"
    )
    .refine(
      (date) => {
        const parsed = parseDate(date);
        if (!parsed) return false;
        return parsed >= getTomorrow();
      },
      "Date must be tomorrow or later"
    ),
  name: z.string().min(2, "Name is required"),
  email: z.string().optional().default(""),
  phone: z.string().optional().default(""),
}).refine(
  (data) => {
    const hasEmail = data.email && data.email.trim().length > 0;
    const hasPhone = data.phone && data.phone.trim().length > 0;
    return hasEmail || hasPhone;
  },
  {
    message: "Email or Phone is required",
    path: ["email"],
  }
).refine(
  (data) => !data.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email),
  {
    message: "Invalid email",
    path: ["email"],
  }
).refine(
  (data) => !data.phone || /^\+?[\d\s\-()]{10,}$/.test(data.phone),
  {
    message: "Invalid phone",
    path: ["phone"],
  }
);

type BookingFormData = z.infer<typeof bookingSchema>;

const locationMap: Record<string, string> = {
  chicago: "illinois",
  dallas: "texas",
  denver: "colorado",
};

interface CompactBookingFormProps {
  defaultLocation?: string;
  defaultEventType?: string;
}

export function CompactBookingForm({ defaultLocation, defaultEventType }: CompactBookingFormProps = {}) {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      eventType: defaultEventType || "",
      location: defaultLocation ? locationMap[defaultLocation] || "" : "",
      date: "",
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    try {
      await apiRequest("POST", "/api/inquiries", data);
      setSubmitted(true);
      setTimeout(() => {
        form.reset();
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send booking request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const eventTypes = ["Corporate", "Private", "Wedding", "Other"];
  const locations = ["Colorado", "Illinois", "Texas", "Other"];

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-2 space-y-1"
      >
        <p className="text-xs font-bold text-primary">Thanks for your interest!</p>
        <p className="text-xs text-white/60">I'll be in touch soon.</p>
      </motion.div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 max-w-2xl mx-auto">
        {/* Row 1: Event Type, Location */}
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="eventType"
            render={({ field }) => (
              <FormItem>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="h-9 bg-black border-white/10 text-xs shadow-none focus:ring-0" data-testid="select-compact-event">
                      <SelectValue placeholder="Event Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-black border-white/20 z-[60]">
                    {eventTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase()} className="hover:bg-white/10 focus:bg-white/10 cursor-pointer bg-black text-white">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="h-9 bg-black border-white/10 text-xs shadow-none focus:ring-0" data-testid="select-compact-location">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-black border-white/20 z-[60]">
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc.toLowerCase()} className="hover:bg-white/10 focus:bg-white/10 cursor-pointer bg-black text-white">
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        {/* Row 2: Date, Name */}
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl>
                  <div className="relative">
                    <Input
                      type="text"
                      inputMode="numeric"
                      placeholder="Event Date"
                      {...field}
                      onChange={(e) => {
                        let value = e.target.value.replace(/[^\d]/g, '');
                        if (value.length > 8) value = value.slice(0, 8);
                        if (value.length >= 2) {
                          value = value.slice(0, 2) + '/' + value.slice(2);
                        }
                        if (value.length >= 5) {
                          value = value.slice(0, 5) + '/' + value.slice(5);
                        }
                        field.onChange(value);
                      }}
                      onFocus={(e) => {
                        if (!e.target.value) {
                          e.target.placeholder = "mm/dd/yyyy";
                        }
                      }}
                      onBlur={(e) => {
                        if (!e.target.value) {
                          e.target.placeholder = "Event Date";
                        }
                        field.onBlur();
                      }}
                      maxLength={10}
                      data-testid="input-compact-date"
                      className="h-9 bg-black border-white/10 text-xs focus:ring-0"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Name"
                    {...field}
                    data-testid="input-compact-name"
                    className="h-9 bg-black border-white/10 text-xs focus:ring-0"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        {/* Row 3: Email, Phone */}
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email"
                    {...field}
                    data-testid="input-compact-email"
                    className="h-9 bg-black border-white/10 text-xs focus:ring-0"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Phone"
                    {...field}
                    data-testid="input-compact-phone"
                    className="h-9 bg-black border-white/10 text-xs focus:ring-0"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          variant="cta"
          size="lg"
          data-testid="button-compact-submit"
          disabled={form.formState.isSubmitting}
          className="w-full mt-2 uppercase"
        >
          {form.formState.isSubmitting ? "Sending..." : "Inquire Now"}
        </Button>
      </form>
    </Form>
  );
}
