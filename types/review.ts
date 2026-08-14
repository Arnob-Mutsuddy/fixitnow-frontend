export interface IReview {
  id: string;
  bookingId: string;
  customerId: string;
  technicianId: string;
  rating: number;
  comment?: string;
  createdAt: string;
  customer?: { name: string };
}