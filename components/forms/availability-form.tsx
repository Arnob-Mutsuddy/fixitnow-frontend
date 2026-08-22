"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useMyTechnicianProfile, useSetAvailability } from "@/hooks/use-technician-profile";

const days = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
];

interface DaySlot {
  enabled: boolean;
  startTime: string;
  endTime: string;
}

export default function AvailabilityForm() {
  const { data } = useMyTechnicianProfile();
  const { mutate, isPending } = useSetAvailability();

  const [slots, setSlots] = useState<Record<number, DaySlot>>(
    Object.fromEntries(
      days.map((d) => [d.value, 
        { enabled: false, startTime: "09:00", endTime: "17:00" }])
    )
  );

  useEffect(() => {
    if (data?.data?.availability) {

      const updated = { ...slots };
      data.data.availability.forEach((a) => {
        updated[a.dayOfWeek] = { enabled: true, startTime: a.startTime, endTime: a.endTime };
      });
      setSlots(updated);
    }

  }, [data]);

  const toggleDay = (day: number) => {
    setSlots((prev) => 
      ({ ...prev, 
        [day]: { ...prev[day], enabled: !prev[day].enabled } }));
  };

  const updateTime = (day: number, field: "startTime" | "endTime", value: string) => {
    setSlots((prev) => ({ ...prev, [day]: { ...prev[day], [field]: value } }));
  };

  const handleSave = () => {
    const payload = Object.entries(slots)
      .filter(([, slot]) => slot.enabled)
      .map(([day, slot]) => ({
        dayOfWeek: Number(day),
        startTime: slot.startTime,
        endTime: slot.endTime,
      }));

    mutate(payload);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Availability</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {days.map((day) => (
          <div key={day.value} className="flex items-center gap-4">

            <div className="flex items-center gap-2 w-32">
              <Checkbox
                checked={slots[day.value].enabled}
                onCheckedChange={() => toggleDay(day.value)}
              />

              <span className="text-sm">{day.label}</span>
            </div>
            <Input
              type="time"
              className="w-32"
              value={slots[day.value].startTime}
              
              disabled={!slots[day.value].enabled}

              onChange={(e) => updateTime(day.value, "startTime", e.target.value)}
            />
            <span className="text-muted-foreground text-sm">to</span>
            <Input
              type="time"
              className="w-32"
              value={slots[day.value].endTime}
              disabled={!slots[day.value].enabled}
              onChange={(e) => updateTime(day.value, "endTime", e.target.value)}
            />
          </div>
        ))}

        <Button onClick={handleSave} disabled={isPending} className="mt-4">
          {isPending ? "Saving..." : "Save Availability"}
        </Button>
      </CardContent>
    </Card>
  );
}