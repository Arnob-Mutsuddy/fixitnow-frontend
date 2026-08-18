"use client";

import { useInitAuth } from "@/hooks/use-init-auth";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  useInitAuth();
  return <>{children}</>;
}