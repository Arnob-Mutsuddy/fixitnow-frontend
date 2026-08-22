"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useMyTechnicianProfile, useUpdateTechnicianProfile } from "@/hooks/use-technician-profile";
import { IUpProfilePayload } from "@/lib/api/technician.api";

export default function ProfileForm() {
  const { data, isLoading } = useMyTechnicianProfile();
  const { mutate, isPending } = useUpdateTechnicianProfile();
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  const { register, handleSubmit, reset } = useForm<IUpProfilePayload>();

  useEffect(() => {
    if (data?.data) {
      reset({
        bio: data.data.bio,
        experience: data.data.experience,
        hourlyRate: data.data.hourlyRate,
        location: data.data.location,
      });
      setSkills(data.data.skills || []);
    }
  }, [data, reset]);

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) =>s !== skill));
  };

  const onSubmit = (formData: IUpProfilePayload) => {
    mutate({
      ...formData,
      experience: formData.experience ? Number(formData.experience) : undefined,
      hourlyRate: formData.hourlyRate ? Number(formData.hourlyRate) : undefined,
      skills,
    });
  };

  if (isLoading) return <p className="text-muted-foreground">Loading profile...</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile & Services Info</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Bio</Label>
            <Textarea {...register("bio")} placeholder="Tell customers about yourself..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">

              <Label>Experience (years)</Label>

              <Input type="number" {...register("experience")} />
            </div>
            <div className="space-y-2">
              <Label>Hourly Rate ($)</Label>
              <Input type="number" {...register("hourlyRate")} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Location</Label>
            <Input {...register("location")} placeholder="e.g. Dhaka" />
          </div>

          <div className="space-y-2">
            <Label>Skills</Label>
            <div className="flex gap-2">
              <Input
              
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="e.g. wiring"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={addSkill}>
                Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="gap-1">
                  {skill}

                  <button type="button" onClick={() => removeSkill(skill)}>
                    <X className="h-3 w-3" />
                  </button>

                </Badge>
              ))}
            </div>
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save Profile"}

          </Button>
        </form>
      </CardContent>
    </Card>
  );
}