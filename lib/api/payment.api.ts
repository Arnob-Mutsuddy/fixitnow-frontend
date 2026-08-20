import { axiosInstance } from "./axios-instance";
import { ApiResponse } from "@/types/api-response";
import { IPayment } from "@/types/payment";

export interface ICreatePaySessionRes {
  checkoutUrl: string;
  payment: IPayment;
}

export const createPaymentSession = async (bookingId: string) => {
  const { data } = await axiosInstance.post<ApiResponse<ICreatePaySessionRes>>("/payments/create",
    { bookingId }
  );
  return data;
};

export const getMyPayments = async () => {
  const { data } = await axiosInstance.get<ApiResponse<IPayment[]>>("/payments");
  return data;
};