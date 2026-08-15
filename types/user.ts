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

export interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
  role: "CUSTOMER" | "TECHNICIAN";
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  user: IUser;
}