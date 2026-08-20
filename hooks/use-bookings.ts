"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createBooking, getMyBookings, getBookingById, upBookingStatus, cancelBooking, ICreateBookingPayload, } from "@/lib/api/booking.api";
import { getErrorMessage } from "@/lib/api/error-handler";
import { BookingStatus } from "@/types/booking";

export const useMyBookings = () => {
    return useQuery({
        queryKey: ["bookings"],
        queryFn: () => getMyBookings(),
    });
};

export const useBookingById = (id: string) => {
    return useQuery({
        queryKey: ["booking", id],
        queryFn: () => getBookingById(id),
        enabled: !!id,
    });
};

export const useCreateBooking = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: ICreateBookingPayload) => createBooking(payload),
        onSuccess: () => {
            toast.success("Booking request sent successfully!");
            queryClient.invalidateQueries({queryKey: ["bookings"]});
        },
        onError: (error) => {
            toast.error(getErrorMessage(error));
        },
    });
};

export const useUpdateBookingStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, status }: { id: string; status: BookingStatus }) => upBookingStatus(id, status),
        onSuccess: () => {
            toast.success("Booking status updated");
            queryClient.invalidateQueries({queryKey: ["bookings"] });
        },
        onError: (error) => {
            toast.error(getErrorMessage(error));
        },
    });
};

export const useCancelBooking = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => cancelBooking(id),
        onSuccess: () => {
            toast.success("Booking cancelled");
            queryClient.invalidateQueries({ queryKey: ["bookings"]});
        },
        onError: (error) => {
            toast.error(getErrorMessage(error));
        },
    });
};