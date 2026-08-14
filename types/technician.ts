import { IService } from "./service";
import { IUser } from "./user";

export interface IAvailability {
  id: string;
  technicianId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export interface ITProfile {
  id: string;
  userId: string;
  bio?: string;
  experience?: number;
  skills: string[];
  hourlyRate?: number;
  location?: string;
  avgRating: number;
  createdAt: string;
  updatedAt: string;
  user?: Pick<IUser, "name" | "email">;
  availability?: IAvailability[];
  services?: IService[];
}
