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

export interface IServicePayload {
  title: string;
  description?: string;
  price: number;
  categoryId: string;
}

export const createService = async (payload: IServicePayload) => {
  const { data } = await axiosInstance.post<ApiResponse<IService>>("/services", payload);
  return data;
};

export const updateService = async (id: string, payload: Partial<IServicePayload>) => {
  const { data } = await axiosInstance.patch<ApiResponse<IService>>(`/services/${id}`, payload);
  return data;
};

export const deleteService = async (id: string) => {
  const { data } = await axiosInstance.delete<ApiResponse<null>>(`/services/${id}`);
  return data;
};