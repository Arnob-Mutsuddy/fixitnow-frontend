"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getAllServices,getServiceById,createService,updateService,deleteService,IServicePayload,} from "@/lib/api/service.api";
import { getErrorMessage } from "@/lib/api/error-handler";

export const useServices = (params?: Record<string, string>) => {
  
  return useQuery({
    queryKey: ["services", params],
    queryFn: () => getAllServices(params),
  });
};

export const useServiceById = (id: string) => {
  return useQuery({
    queryKey: ["service", id],
    queryFn: () => getServiceById(id),
    enabled: !!id,
  });
};

export const useCreateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IServicePayload) => createService(payload),
    onSuccess: () => {
      toast.success("Service created successfully");
      queryClient.invalidateQueries({ queryKey: ["services"] });

      queryClient.invalidateQueries({ queryKey: ["my-technician-profile"] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<IServicePayload> }) =>
      updateService(id, payload),
    onSuccess: () => {
      toast.success("Service updated successfully");

      queryClient.invalidateQueries({ queryKey: ["services"] });
      queryClient.invalidateQueries({ queryKey: ["my-technician-profile"] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    
    mutationFn: (id: string) => deleteService(id),
    onSuccess: () => {
      toast.success("Service deleted");
      queryClient.invalidateQueries({ queryKey: ["services"] });
      queryClient.invalidateQueries({ queryKey: ["my-technician-profile"] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
};