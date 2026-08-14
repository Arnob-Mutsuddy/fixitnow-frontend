export type Role = "CUSTOMER" | "TECHNICIAN" | "ADMIN";
export type UserStatus = "ACTIVE" | "BANNED";

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}