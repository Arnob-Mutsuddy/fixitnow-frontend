"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function PaymentCancelContent() {
  const searchParams = useSearchParams();

  const bookingId = searchParams.get("booking_id");

  return (
    <div className="container mx-auto px-4 py-20 flex justify-center">
      <Card className="max-w-md w-full text-center">
        <CardContent className="pt-10 pb-8 space-y-4">
          <XCircle className="h-16 w-16 text-red-500 mx-auto" />

          <h1 className="text-2xl font-bold">Payment Cancelled</h1>
          <p className="text-muted-foreground">
            Your payment was not completed. You can try again anytime from your dashboard.
          </p>

          <div className="flex gap-3 justify-center pt-4">
            {bookingId ? (
              <Button asChild>
                <Link href="/dashboard/customer">Try Again from Dashboard</Link>
              </Button>
            ) : (
              <Button asChild>
                <Link href="/dashboard/customer">Go to Dashboard</Link>
              </Button>
            )}
            <Button variant="outline" asChild>
              <Link href="/services">Browse Services</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PaymentCancelPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-20 text-center">Loading...</div>}>
      <PaymentCancelContent />
    </Suspense>
  );
}