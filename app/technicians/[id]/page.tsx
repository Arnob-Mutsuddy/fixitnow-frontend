"use client";

import { use } from "react";
import { useTechnicianById } from "@/hooks/use-technicians";
import { useTechnicianReviews } from "@/hooks/use-reviews";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, MapPin } from "lucide-react";
import BookingCard from "@/components/forms/booking-card";

interface Props {
  params: Promise<{ id: string }>;
}

export default function TechnicianProfilePage({ params }: Props) {
  
  const { id } = use(params);
  const { data, isLoading, isError } = useTechnicianById(id);
  const { data: reviewsData } = useTechnicianReviews(id);

  const technician = data?.data;
  const reviews = reviewsData?.data || [];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10 space-y-4">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (isError || !technician) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Technician not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{technician.user?.name}</h1>
            <div className="flex items-center gap-4 mt-2 text-muted-foreground">
              {technician.location && (
                <span className="flex items-center gap-1 text-sm">
                  <MapPin className="h-4 w-4" /> {technician.location}
                </span>
              )}
              {technician.avgRating > 0 && (
                <span className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {technician.avgRating.toFixed(1)} ({reviews.length} reviews)
                </span>
              )}
            </div>
          </div>

          {technician.bio && (
            <Card>
              <CardHeader>
                
                <CardTitle className="text-lg">About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{technician.bio}</p>
                {technician.experience !== undefined && (
                  <p className="mt-2 text-sm">{technician.experience} years of experience</p>
                )}
                {technician.skills && technician.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {technician.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
          <Card>
            <CardHeader>

              <CardTitle className="text-lg">Services Offered</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {technician.services && technician.services.length > 0 ? (
                technician.services.map((service) => (
                  <div
                    key={service.id}
                    className="flex items-center justify-between border-b pb-3 last:border-0"
                  >
                    <div>
                      <p className="font-medium">{service.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {service.description}</p>
                    </div>

                    <span className="font-bold">${service.price}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No services listed yet.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reviews ({reviews.length})

              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">

              {reviews.length === 0 && (
                <p className="text-sm text-muted-foreground">No reviews yet.</p>
              )}
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-3 last:border-0">

                  <div className="flex items-center gap-2">
                    <span className="font-medium">{review.customer?.name || "Anonymous"}</span>
                    <span className="flex items-center gap-1 text-sm">


                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {review.rating}
                    </span>
                  </div>
                  {review.comment && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {review.comment}</p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div>
          <BookingCard technician={technician} />
        </div>
      </div>
    </div>
  );
}