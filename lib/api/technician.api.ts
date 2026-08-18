import { axiosInstance } from "./axios-instance";
import { ApiResponse } from "@/types/api-response";
import { ITProfile } from "@/types/technician";

export const getAllTechnicians = async (params?: Record<string, string>) => {
  const { data } = await axiosInstance.get<ApiResponse<ITProfile[]>>("/technicians", {
    params,
  });
  return data;
};

export const getTechnicianById = async (id: string) => {
  const { data } = await axiosInstance.get<ApiResponse<ITProfile>>(`/technicians/${id}`);
  return data;
};