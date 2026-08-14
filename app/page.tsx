"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Home() {
  return (
    <div className="p-10">
      <Button onClick={() => toast.success("Toast is working!")}>
        Test Toast
      </Button>
    </div>
  );
}