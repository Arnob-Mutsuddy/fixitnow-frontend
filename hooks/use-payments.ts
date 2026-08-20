"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { createPaymentSession, getMyPayments } from "@/lib/api/payment.api";
import { getErrorMessage } from "@/lib/api/error-handler";

export const useMyPayments = () => {
  return useQuery({
    queryKey: ["payments"],
    queryFn: getMyPayments,
  });
};

export const useCreatePaymentSession = () => {
  return useMutation({
    mutationFn: (bookingId: string) => createPaymentSession(bookingId),
    onSuccess: (response) => {
        
      window.location.href = response.data.checkoutUrl;
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};