"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllServices, getServiceById } from "@/lib/api/service.api";

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