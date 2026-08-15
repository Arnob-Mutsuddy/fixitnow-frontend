import { create } from "zustand";
import { IUser } from "@/types/user";

interface AuthState {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => {
    localStorage.removeItem("accessToken");
    document.cookie = "accessToken=; path=/; expires=Fri, 16 Aug 2026 12:18:00 UTC;";
    set({ user: null });
  },
}));