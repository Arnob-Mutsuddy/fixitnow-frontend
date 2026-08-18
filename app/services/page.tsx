"use client";

import { useState } from "react";
import { useServices } from "@/hooks/use-services";
import { useCategories } from "@/hooks/use-categories";
import ServiceCard from "@/components/shared/service-card";
import ServiceCardSkeleton from "@/components/shared/service-card-skeleton";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

export default function ServicesPage() {
  const [categoryId, setCategoryId] = useState<string>("");
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [appliedFilters, setFilters] = useState<Record<string, string>>({});

  const { data: catData } = useCategories();
  const { data, isLoading, isError } = useServices(appliedFilters);

  const categories = catData?.data || [];
  const services = data?.data || [];

  const applyFilters = () => {
    const filters: Record<string, string> = {};
    if (categoryId && categoryId !== "all") filters.categoryId = categoryId;
    if (location) filters.location = location;
    if (minPrice) filters.minPrice = minPrice;

    if (maxPrice) filters.maxPrice = maxPrice;

    setFilters(filters);
  };

  const clearFilters = () => {
    setCategoryId("");
    setLocation("");
    setMinPrice("");
    setMaxPrice("");
    setFilters({});
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Browse Services</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 space-y-4 border rounded-lg p-4 h-fit">
          <h3 className="font-semibold">Filters</h3>

          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>

                <SelectItem value="all">All categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <Input
              placeholder="e.g. Dhaka"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />


          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Min Price</label>
            <Input
              type="number"
              placeholder="0"
              value={minPrice}

              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Max Price</label>
            <Input
              type="number"
              placeholder="1000"

              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button onClick={applyFilters} className="flex-1">
              Apply
            </Button>

            <Button onClick={clearFilters} variant="outline" className="flex-1">
              Clear
            </Button>
          </div>


        </aside>
        <div className="lg:col-span-3">

          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <ServiceCardSkeleton key={i} />
              ))}
            </div>
          )}

          {isError && (
            <p className="text-center text-muted-foreground py-10">
              Failed to load services. Please try again later.
            </p>
          )}

          {!isLoading && !isError && services.length === 0 && (
            <p className="text-center text-muted-foreground py-10">
              No services match your filters.
            </p>
          )}

          {!isLoading && !isError && services.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>


          )}
        </div>
      </div>

    </div>
  );


}