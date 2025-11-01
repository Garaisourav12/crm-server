import { CourseInterest } from '../enums/common';

export interface IUserResponse {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEnquiryResponse {
  id: string;
  name: string;
  email: string;
  courseInterest: CourseInterest;
  claimedBy?: string | null;
  claimedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
