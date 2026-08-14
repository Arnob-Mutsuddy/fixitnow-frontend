export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED";
export type PaymentProvider = "STRIPE" | "SSLCOMMERZ";

export interface IPayment {
  id: string;
  bookingId: string;
  userId: string;
  amount: number;
  provider: PaymentProvider;
  transactionId?: string;
  status: PaymentStatus;
  paidAt?: string;
  createdAt: string;
}