import mongoose, { Document, Schema, Types } from 'mongoose';
import { CourseInterest } from '../types';

export interface IEnquiry extends Document {
  name: string;
  email: string;
  courseInterest?: string;
  claimedBy?: Types.ObjectId | null;
  claimedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const enquirySchema = new Schema<IEnquiry>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    courseInterest: {
      type: CourseInterest,
      required: [true, 'Course interest is required'],
      trim: true,
    },
    claimedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    claimedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

const Enquiry = mongoose.model<IEnquiry>('Enquiry', enquirySchema);

export default Enquiry;
