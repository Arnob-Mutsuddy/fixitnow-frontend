"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ITProfile } from "@/types/technician";

export default function BookingCard({ technician }: { technician: ITProfile }) {
  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Book This Technician</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Select a service and preferred time slot to send a booking request.
        </p>
        <Button className="w-full" disabled>
          Booking form coming next...
        </Button>
      </CardContent>
    </Card>
  );
}