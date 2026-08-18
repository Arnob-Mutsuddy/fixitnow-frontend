"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllTechnicians, getTechnicianById } from "@/lib/api/technician.api";

export const useTechnicians = (params?: Record<string, string>) => {
  return useQuery({
    queryKey: ["technicians", params],
    queryFn: () => getAllTechnicians(params),
  });
};

export const useTechnicianById = (id: string) => {
  return useQuery({
    queryKey: ["technician", id],
    queryFn: () => getTechnicianById(id),
    enabled: !!id,
  });
};