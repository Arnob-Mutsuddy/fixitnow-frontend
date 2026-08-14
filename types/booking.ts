import { IUser } from "./user";
import { IService } from "./service";
import { ITProfile } from "./technician";

import { IPayment } from "./payment";
import { IReview } from "./review";

export type BookingStatus = "REQUESTED" | "ACCEPTED" | "DECLINED" | "PAID" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

export interface IBooking {
  id: string;
  customerId: string;
  technicianId: string;
  serviceId: string;
  scheduledAt: string;
  status: BookingStatus;
  address?: string;
  createdAt: string;
  updatedAt: string;
  service?: IService;
  customer?: Pick<IUser, "id" | "name" | "email">;
  technician?: ITProfile;
  payment?: IPayment;
  review?: IReview;
}