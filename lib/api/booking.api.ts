import { axiosInstance } from "./axios-instance";
import { ApiResponse } from "@/types/api-response";
import { IBooking, BookingStatus } from "@/types/booking";

export interface ICreateBookingPayload {
  serviceId: string;
  scheduledAt: string;
  address?: string;
}

export const createBooking = async (payload: ICreateBookingPayload) => {
  const { data } = await axiosInstance.post<ApiResponse<IBooking>>("/bookings", payload);
  return data;
};
export const cancelBooking = async (id: string) => {
  const { data } = await axiosInstance.patch<ApiResponse<IBooking>>(`/bookings/${id}/cancel`);
  return data;
};

export const getMyBookings = async () => {
  const { data } = await axiosInstance.get<ApiResponse<IBooking[]>>("/bookings");
  return data;
};

export const getBookingById = async (id: string) => {
  const { data } = await axiosInstance.get<ApiResponse<IBooking>>(`/bookings/${id}`);
  return data;
};

export const upBookingStatus = async (id: string, status: BookingStatus) => {
  const { data } = await axiosInstance.patch<ApiResponse<IBooking>>(`/bookings/${id}/status`, {
    status,
  });
  return data;
};

