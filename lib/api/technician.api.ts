import { axiosInstance } from "./axios-instance";
import { ApiResponse } from "@/types/api-response";
import { ITProfile, IAvailability } from "@/types/technician";

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

export const getMyTechnicianProfile = async () => {
  const { data } = await axiosInstance.get<ApiResponse<ITProfile>>(
    "/technicians/me/profile"
  );
  return data;
};

export interface IUpProfilePayload {
  bio?: string;
  experience?: number;
  skills?: string[];
  hourlyRate?: number;
  location?: string;
}

export const updateTechnicianProfile = async (payload: IUpProfilePayload) => {
  const { data } = await axiosInstance.put<ApiResponse<ITProfile>>(
    "/technicians/me/profile",
    payload
  );
  return data;
};

export interface IAvailabilityInput {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export const setTechnicianAvailability = async (slots: IAvailabilityInput[]) => {
  const { data } = await axiosInstance.put<ApiResponse<IAvailability[]>>(
    "/technicians/me/availability",
    { slots }
  );
  return data;
};