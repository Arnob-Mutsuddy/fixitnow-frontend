import { axiosInstance } from "./axios-instance";
import { ApiResponse } from "@/types/api-response";
import { IReview } from "@/types/review";

export const getReviewsByTechnician = async (technicianId: string) => {
  const { data } = await axiosInstance.get<ApiResponse<IReview[]>>(
    `/reviews/technician/${technicianId}`
  );
  return data;
};