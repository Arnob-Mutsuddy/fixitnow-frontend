"use client";

import { useAuthStore } from "@/store/auth-store";

export default function CustomerDashboardPage() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Customer Dashboard</h1>
      <p className="text-muted-foreground mt-2">
        Welcome, {user?.name || "Customer"}!
      </p>
    </div>
  );
}