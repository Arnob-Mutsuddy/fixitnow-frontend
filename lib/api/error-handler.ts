import { AxiosError } from "axios";

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || "Something went wrong. Please try again.";
  }
  return "An unexpected error occurred.";
};