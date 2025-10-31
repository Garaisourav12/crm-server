export interface IUserResponse {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEnquiryResponse {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  courseInterest?: string;
  claimedBy?: Types.ObjectId | null;
  claimedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
