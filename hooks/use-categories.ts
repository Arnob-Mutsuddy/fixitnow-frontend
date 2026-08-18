"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/lib/api/category.api";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
};