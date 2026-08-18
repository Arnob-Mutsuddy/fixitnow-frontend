"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { registerUser, loginUser } from "@/lib/api/auth.api";
import { useAuthStore } from "@/store/auth-store";
import { setAuthCookie } from "@/lib/cookies";
import { getErrorMessage } from "@/lib/api/error-handler";
import { IRegisterPayload, ILoginPayload } from "@/types/user";

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: IRegisterPayload) => registerUser(payload),
    onSuccess: () => {
      toast.success("Registration successful! Please login.");
      router.push("/auth/login");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useLogin = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (payload: ILoginPayload) => loginUser(payload),
    onSuccess: (response) => {
      const { accessToken, user } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      setAuthCookie(accessToken);
      setUser(user);

      toast.success("Login successful!");

      if (user.role === "CUSTOMER") router.push("/dashboard/customer");
      else if (user.role === "TECHNICIAN") router.push("/dashboard/technician");
      else if (user.role === "ADMIN") router.push("/dashboard/admin");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};