"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { ITProfile } from "@/types/technician";
import { useAuthStore } from "@/store/auth-store";
import { useCreateBooking } from "@/hooks/use-bookings";

export default function BookingCard({ technician }: { technician: ITProfile }) {
  const [serviceId, setServiceId] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);

  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");

  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const { mutate, isPending } = useCreateBooking();

  const services = technician.services || [];

  const handleSubmit = () => {
    if (!user) {
      toast.error("Please login as a customer to book a service");

      router.push("/auth/login");
      return;
    }

    if (user.role !== "CUSTOMER") {
      toast.error("Only customers can book services");
      return;
    }

    if (!serviceId) {
      toast.error("Please select a service");
      return;
    }

    if (!date || !time) {
      toast.error("Please select a date and time");
      return;
    }

    const [hours, minutes] = time.split(":").map(Number);

    const scheduledAt = new Date(date);
    scheduledAt.setHours(hours, minutes, 0, 0);

    if (scheduledAt < new Date()) {
      toast.error("Please select a future date and time");
      return;
    }

    mutate(
      {
        serviceId,
        scheduledAt: scheduledAt.toISOString(),
        address: address || undefined,
      },
      {
        onSuccess: () => {
          router.push("/dashboard/customer");
        },
      }
    );
  };

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Book This Technician</CardTitle>
        
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Select Service</Label>
          <Select value={serviceId} onValueChange={setServiceId}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a service" />
            </SelectTrigger>

            <SelectContent>
              {services.length === 0 && (
                <div className="px-2 py-1.5 text-sm text-muted-foreground">
                  No services available
                </div>
              )}
              {services.map((service) => (
                <SelectItem key={service.id} value={service.id}>

                  {service.title} -- ${service.price}

                </SelectItem>
              ))}
            </SelectContent>

          </Select>
        </div>

        <div className="space-y-2">
          <Label>Select Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />

                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"

                selected={date}
                onSelect={setDate}
                disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Select Time</Label>

          <Select value={time} onValueChange={setTime}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a time slot" />
            </SelectTrigger>

            <SelectContent>
              {["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"].map(
                (slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Address (optional)</Label>
          <Textarea
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <Button className="w-full" onClick={handleSubmit} disabled={isPending}>
          {isPending ? "Sending request..." : "Request Booking"}
        </Button>
      </CardContent>
    </Card>
  );
}