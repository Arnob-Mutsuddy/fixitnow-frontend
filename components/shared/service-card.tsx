import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { IService } from "@/types/service";

export default function ServiceCard({ service }: { service: IService }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{service.title}</CardTitle>
          {service.category && <Badge variant="secondary">{service.category.name}</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {service.description || "No description available"}
        </p>
        {service.technician?.user && (
          <p className="text-sm mt-2">By {service.technician.user.name}</p>
        )}
        {service.technician && service.technician.avgRating > 0 && (
          <div className="flex items-center gap-1 mt-1 text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            {service.technician.avgRating.toFixed(1)}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <span className="font-bold text-lg">${service.price}</span>
        <Link href={`/technicians/${service.technicianId}`} className="text-sm text-primary hover:underline">
          View & Book 
        </Link>
      </CardFooter>
    </Card>
  );
}