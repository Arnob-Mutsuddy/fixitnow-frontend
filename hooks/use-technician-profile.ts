"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getMyTechnicianProfile,
  updateTechnicianProfile,

  setTechnicianAvailability,
  IUpProfilePayload,
  IAvailabilityInput,

} from "@/lib/api/technician.api";
import { getErrorMessage } from "@/lib/api/error-handler";

export const useMyTechnicianProfile = () => {
  return useQuery({

    queryKey: ["my-technician-profile"],
    queryFn: getMyTechnicianProfile,
  });
};

export const useUpdateTechnicianProfile = () => {
  const queryClient = useQueryClient();


  return useMutation({
    mutationFn: (payload: IUpProfilePayload) => updateTechnicianProfile(payload),
    onSuccess: () => {
      toast.success("Profile updated successfully");

      queryClient.invalidateQueries({ queryKey: ["my-technician-profile"] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
};

export const useSetAvailability = () => {

  const queryClient = useQueryClient();

  return useMutation({
    
    mutationFn: (slots: IAvailabilityInput[]) => setTechnicianAvailability(slots),
    onSuccess: () => {
      toast.success("Availability updated successfully");
      queryClient.invalidateQueries({ queryKey: ["my-technician-profile"] });

    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
};