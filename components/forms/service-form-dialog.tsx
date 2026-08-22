"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useCategories } from "@/hooks/use-categories";
import { useCreateService, useUpdateService } from "@/hooks/use-services";
import { IService } from "@/types/service";

export default function ServiceFormDialog({ service }: { service?: IService }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(service?.title || "");
  const [description, setDescription] = useState(service?.description || "");
  const [price, setPrice] = useState(service?.price?.toString() || "");
  const [categoryId, setCategoryId] = useState(service?.categoryId || "");

  const { data: categoriesData } = useCategories();
  const categories = categoriesData?.data || [];

  const { mutate: create, isPending: creating } = useCreateService();
  const { mutate: update, isPending: updating } = useUpdateService();

  const isEdit = !!service;
  const isPending = creating || updating;

  const handleSubmit = () => {
    const payload = { title, description, price: Number(price), categoryId };

    if (isEdit) {
      update(
        { id: service!.id, payload },
        { onSuccess: () => setOpen(false) }
      );
    } else {
      create(payload, {
        onSuccess: () => {
          setOpen(false);
          setTitle("");
          setDescription("");
          setPrice("");
          setCategoryId("");
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button size="sm" variant="outline">
            Edit
          </Button>
        ) : (
          <Button>
            <Plus className="h-4 w-4 mr-1" /> Add Service
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Service" : "Add New Service"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>


          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea value={description} onChange={(e) => 
              setDescription(e.target.value)} />

          </div>
          <div className="space-y-2">
            <Label>Price ($)</Label>
            <Input type="number" value={price} onChange={(e) => 
              setPrice(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? "Saving..." : isEdit ? "Update" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}