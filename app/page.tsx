"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useServices } from "@/hooks/use-services";
import ServiceCard from "@/components/shared/service-card";
import ServiceCardSkeleton from "@/components/shared/service-card-skeleton";
import { Badge } from "@/components/ui/badge";
export default function Home() {
  const { data, isLoading, isError } = useServices();

  const services = data?.data?.slice(0, 6) || [];

  return (
    <main>

      {/* <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Your Trusted Home Service Platform
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Book qualified technicians for plumbing, electrical, cleaning, painting, and more <br />
            All in one Place.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/services">Browse Services</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/auth/register">Join as Technician</Link>
            </Button>
          </div>
        </div>
      </section> */}

      <section className="bg-muted/50 py-8">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-6 md:grid-cols-2">

      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Your Trusted Home Service Platform
        </h1>

        <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
          Book qualified technicians for plumbing, electrical, cleaning,
          painting, and more. <br />
          All in one Place.
        </p>

        <div className="mt-5 flex justify-center gap-3">
          <Button size="lg" asChild>
            <Link href="/services">Browse Services</Link>
          </Button>

          <Button size="lg" variant="outline" asChild>
            <Link href="/auth/register">Join as Technician</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">

        <div className="h-32 md:h-36 overflow-hidden rounded-xl bg-white shadow-sm">
          <video
            src="/animations/AC-Installation.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-contain"
          />
        </div>

        <div className="h-32 md:h-36 overflow-hidden rounded-xl bg-white shadow-sm">
          <video
            src="/animations/plumber.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-contain"
          />
        </div>

        <div className="h-32 md:h-36 overflow-hidden rounded-xl bg-white shadow-sm">
          <video
            src="/animations/Electrical-Electrician.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-contain"
          />
        </div>

        <div className="h-32 md:h-36 overflow-hidden rounded-xl bg-white shadow-sm">
          <video
            src="/animations/cleaning.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-contain"
          />
        </div>

      </div>

    </div>
  </div>
</section>


      {/* */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Featured Services</h2>
          <Link href="/services" className="text-sm text-primary ">
          <Button variant="ghost" className="flex items-center gap-2">
            <Badge variant="secondary">View all</Badge>
 
            </Button>
          </Link>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <p className="text-center text-muted-foreground py-10">No services available yet.</p>
        )}

        {!isLoading && !isError && services.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}