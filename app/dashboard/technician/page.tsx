"use client";

import { useAuthStore } from "@/store/auth-store";

export default function TechnicianDashboardPage() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Technician Dashboard</h1>
      <p className="text-muted-foreground mt-2">
        Welcome, {user?.name || "Technician"}!
      </p>
    </div>
  );
}