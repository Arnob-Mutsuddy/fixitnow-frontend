"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useBookingById } from "@/hooks/use-bookings";
import { Skeleton } from "@/components/ui/skeleton";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("booking_id");

  const { data, isLoading } = useBookingById(bookingId || "");
  const booking = data?.data;

  return (
    <div className="container mx-auto px-4 py-20 flex justify-center">

      <Card className="max-w-md w-full text-center">

        <CardContent className="pt-10 pb-8 space-y-4">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
          
          <h1 className="text-2xl font-bold">Payment Successful!</h1>
          <p className="text-muted-foreground">
            Your payment has been confirmed. The technician will start working on your request
            soon.
          </p>

          {isLoading && <Skeleton className="h-20 w-full" />}

          {booking && (
            <div className="border rounded-lg p-4 text-left text-sm space-y-1 bg-muted/30">
              <p>
                <span className="text-muted-foreground">Service:</span> {booking.service?.title}
              </p>
              <p>
                <span className="text-muted-foreground">Status:</span> {booking.status}
              </p>
            </div>
          )}

          <div className="flex gap-3 justify-center pt-4">
            <Button asChild>
              <Link href="/dashboard/customer">Go to Dashboard</Link>
            </Button>

            <Button variant="outline" asChild>
              <Link href="/services">Browse More</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-20 text-center">Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}