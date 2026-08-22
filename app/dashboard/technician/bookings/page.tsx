"use client";

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
import { format } from "date-fns";
import { useMyBookings, useUpdateBookingStatus } from "@/hooks/use-bookings";
import BookingStatusBadge from "@/components/shared/booking-status-badge";
import { BookingStatus } from "@/types/booking";

const nextActionMap: Record<string, { label: string; nextStatus: BookingStatus }[]> = {
  REQUESTED: [
    { label: "Accept", nextStatus: "ACCEPTED" },
    { label: "Decline", nextStatus: "DECLINED" },
  ],
  PAID: [{ label: "Start Job", nextStatus: "IN_PROGRESS" }],
  IN_PROGRESS: [{ label: "Mark Completed", nextStatus: "COMPLETED" }],
};

export default function TechnicianBookingsPage() {
  const { data, isLoading } = useMyBookings();
  const { mutate: updateStatus, isPending } = useUpdateBookingStatus();

  const bookings = data?.data || [];

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Manage Bookings</h1>

      {isLoading && <Skeleton className="h-64 w-full" />}

      {!isLoading && bookings.length === 0 && (
        <p className="text-center text-muted-foreground py-16">
          No booking requests yet.
        </p>
      )}

      {!isLoading && bookings.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Scheduled</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => {
              const actions = nextActionMap[booking.status] || [];
              return (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.customer?.name}</TableCell>
                  <TableCell>{booking.service?.title}</TableCell>
                  <TableCell>{format(new Date(booking.scheduledAt), "PPp")}</TableCell>
                  <TableCell>
                    <BookingStatusBadge status={booking.status} />
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    {actions.map((action) => (
                      <Button
                        key={action.nextStatus}
                        size="sm"
                        variant={action.nextStatus === "DECLINED" ? "destructive" : "default"}
                        disabled={isPending}
                        onClick={() => updateStatus({ id: booking.id, status: action.nextStatus })}
                      >
                        {action.label}
                      </Button>
                    ))}
                    {actions.length === 0 && (
                      <span className="text-sm text-muted-foreground">No action</span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
}