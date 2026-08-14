import { ICategory } from "./category";
import { ITProfile } from "./technician";

export interface IService {
  id: string;
  title: string;
  description?: string;
  price: number;
  categoryId: string;
  technicianId: string;
  createdAt: string;
  updatedAt: string;
  category?: ICategory;
  technician?: ITProfile;
}