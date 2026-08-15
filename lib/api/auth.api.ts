
import { ApiResponse } from "@/types/api-response";
import { axiosInstance } from "./axios-instance";

import { IRegisterPayload, ILoginPayload, ILoginResponse, IUser } from "@/types/user";

export const registerUser = async (payload: IRegisterPayload) => {
  const { data } = await axiosInstance.post<ApiResponse<IUser>>("/auth/register", payload);
  return data;
};

export const loginUser = async (payload: ILoginPayload) => {
  const { data } = await axiosInstance.post<ApiResponse<ILoginResponse>>("/auth/login", payload);
  return data;
};

export const getMe = async () => {
  const { data } = await axiosInstance.get<ApiResponse<IUser>>("/auth/me");
  return data;
};