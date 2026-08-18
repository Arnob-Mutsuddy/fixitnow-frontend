"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";

export const useInitAuth = () => {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);
};