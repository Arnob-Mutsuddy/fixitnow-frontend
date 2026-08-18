import { axiosInstance } from "./axios-instance";
import { ApiResponse } from "@/types/api-response";
import { ICategory } from "@/types/category";

export const getAllCategories = async () => {
  const { data } = await axiosInstance.get<ApiResponse<ICategory[]>>("/categories");
  return data;
};