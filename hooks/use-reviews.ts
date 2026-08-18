"use client";

import { useQuery } from "@tanstack/react-query";
import { getReviewsByTechnician } from "@/lib/api/review.api";

export const useTechnicianReviews = (techId: string) => {
    return useQuery({
        queryKey: ["reviews", techId],
        queryFn: () => getReviewsByTechnician(techId),
        enabled: !!techId,
    });
};