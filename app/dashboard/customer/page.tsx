"use client";

import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";
import { useMyBookings, useCancelBooking } from "@/hooks/use-bookings";
import { useMyPayments } from "@/hooks/use-payments";
import { useCreatePaymentSession } from "@/hooks/use-payments";
import BookingStatusBadge from "@/components/shared/booking-status-badge";
import ReviewDialog from "@/components/forms/review-dialog";
import { format } from "date-fns";

export default function CustomerDashboardPage() {
  const user = useAuthStore((state) => state.user);
  const { data: bookingsData, isLoading: bookingsLoading } = useMyBookings();
  const { data: paymentsData, isLoading: paymentsLoading } = useMyPayments();
  const { mutate: cancelBooking, isPending: isCancelling } = useCancelBooking();
  const { mutate: payNow, isPending: isPaying } = useCreatePaymentSession();

  const bookings = bookingsData?.data || [];
  const payments = paymentsData?.data || [];

  const canCancel = (status: string) => !["IN_PROGRESS", "COMPLETED", "CANCELLED", "DECLINED"].includes(status);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
      <p className="text-muted-foreground mt-1">Manage your bookings and payments</p>

      <Tabs defaultValue="bookings" className="mt-8">
        <TabsList>
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          <TabsTrigger value="payments">Payment History</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings">
          {bookingsLoading && <Skeleton className="h-64 w-full mt-4" />}

          {!bookingsLoading && bookings.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">You have no bookings yet.</p>
              <Button asChild>
                
                <Link href="/services">Browse Services</Link>
              </Button>
            </div>
          )}

          {!bookingsLoading && bookings.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Technician</TableHead>
                  <TableHead>Scheduled</TableHead>

                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (

                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.service?.title}
                      
                    </TableCell>
                    <TableCell>{booking.technician?.user?.name}</TableCell>

                    <TableCell>{format(new Date(booking.scheduledAt), "PPp")}</TableCell>
                    <TableCell>
                      <BookingStatusBadge status={booking.status} />
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      {booking.status === "ACCEPTED" && (
                        <Button
                          size="sm"
                          onClick={() => payNow(booking.id)}
                          disabled={isPaying}
                        >
                          Pay Now
                        </Button>
                      )}
                      {booking.status === "COMPLETED" && !booking.review && (
                        <ReviewDialog bookingId={booking.id} />
                      )}
                      {canCancel(booking.status) && (
                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={isCancelling}
                          onClick={() => cancelBooking(booking.id)}
                        >
                          Cancel
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TabsContent>

        <TabsContent value="payments">
          {paymentsLoading && <Skeleton className="h-64 w-full mt-4" />}

          {!paymentsLoading && payments.length === 0 && (
            <p className="text-center text-muted-foreground py-16">No payment history yet.</p>
          )}

          {!paymentsLoading && payments.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Amount</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Paid At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>${payment.amount}</TableCell>
                    <TableCell>{payment.provider}</TableCell>
                    <TableCell>{payment.status}</TableCell>
                    <TableCell>
                      {payment.paidAt ? format(new Date(payment.paidAt), "PPp") : "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}