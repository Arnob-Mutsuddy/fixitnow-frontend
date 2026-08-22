"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/store/auth-store";
import { useMyTechnicianProfile } from "@/hooks/use-technician-profile";
import { useDeleteService } from "@/hooks/use-services";
import ProfileForm from "@/components/forms/profile-form";
import AvailabilityForm from "@/components/forms/availability-form";
import ServiceFormDialog from "@/components/forms/service-form-dialog";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TechnicianDashboardPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const { data, isLoading } = useMyTechnicianProfile();
  const { mutate: deleteService, isPending: isDeleting } = useDeleteService();

  const profile = data?.data;
  const services = profile?.services || [];

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Total Services</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{services.length}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Average Rating</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {profile?.avgRating?.toFixed(1) || "0.0"} ⭐
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Hourly Rate</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            ${profile?.hourlyRate || 0}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="profile" className="mt-8">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="services">My Services</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="bookings" asChild>
            <Link href="/dashboard/technician/bookings">Manage Bookings</Link>
          </TabsTrigger>  
          {/* <Link
            href="/dashboard/technician/bookings"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all hover:bg-background/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Manage Bookings
          </Link> */}
        </TabsList>

        <TabsContent value="profile" className="mt-4">
          <ProfileForm />
        </TabsContent>

        <TabsContent value="services" className="mt-4 space-y-4">
          <div className="flex justify-end">
            <ServiceFormDialog />
          </div>

          {isLoading && <Skeleton className="h-40 w-full" />}

          {!isLoading && services.length === 0 && (
            <p className="text-center text-muted-foreground py-10">
              You haven&apos;t added any services yet.
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <Card key={service.id}>
                <CardHeader>
                  <CardTitle className="text-base flex items-center justify-between">
                    {service.title}
                    <span className="text-primary">${service.price}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                  <div className="flex gap-2">
                    <ServiceFormDialog service={service} />
                    <Button
                      size="sm"
                      variant="destructive"
                      disabled={isDeleting}
                      onClick={() => deleteService(service.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="availability" className="mt-4">
          <AvailabilityForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}