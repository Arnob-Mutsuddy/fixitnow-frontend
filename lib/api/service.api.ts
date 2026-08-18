import { axiosInstance } from "./axios-instance";
import { ApiResponse } from "@/types/api-response";
import { IService } from "@/types/service";

export const getAllServices = async (params?: Record<string, string>) => {
  const { data } = await axiosInstance.get<ApiResponse<IService[]>>("/services", { params });
  return data;
};

export const getServiceById = async (id: string) => {
  const { data } = await axiosInstance.get<ApiResponse<IService>>(`/services/${id}`);
  return data;
};