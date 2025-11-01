import mongoose from 'mongoose';
import CreateEnquiryDto from '../dto/CreateEnquiryDto';
import { createError } from '../middlewares/errorHandler';
import Enquiry from '../models/enquiryModel';
import { IEnquiryResponse } from '../types/common';

const addNewEnquiry = async (
  data: CreateEnquiryDto,
): Promise<CreateEnquiryDto> => {
  const { name, email, courseInterest } = data;
  const existingEnquiry = await Enquiry.findOne({ email });
  if (existingEnquiry) throw createError('Enquiry already exists', 400);

  const newEnquiry = await Enquiry.create({ name, email, courseInterest });

  if (!newEnquiry) {
    throw createError('Failed to create enquiry', 500);
  }

  const response: IEnquiryResponse = {
    id: newEnquiry._id.toString(),
    name: newEnquiry.name,
    email: newEnquiry.email,
    courseInterest: newEnquiry.courseInterest,
    createdAt: newEnquiry.createdAt,
    updatedAt: newEnquiry.updatedAt,
  };

  return response;
};

const claimLead = async (id: string, userId: string): Promise<void> => {
  const enquiry = await Enquiry.findById(id);

  if (!enquiry) {
    throw createError('Enquiry not found', 404);
  }

  if (enquiry.claimedBy) {
    throw createError('Enquiry already claimed', 400);
  }

  enquiry.claimedBy = new mongoose.Types.ObjectId(userId);
  enquiry.claimedAt = new Date();
  await enquiry.save();
};

const getUnclaimedEnquries = async (): Promise<IEnquiryResponse[]> => {
  const enquiries = await Enquiry.find({ claimedBy: null });
  return enquiries.map((enquiry) => ({
    id: enquiry._id.toString(),
    name: enquiry.name,
    email: enquiry.email,
    courseInterest: enquiry.courseInterest,
    createdAt: enquiry.createdAt,
    updatedAt: enquiry.updatedAt,
  }));
};

const getMyClaimedEnquries = async (
  userId: string,
): Promise<IEnquiryResponse[]> => {
  const enquiries = await Enquiry.find({ claimedBy: userId });
  return enquiries.map((enquiry) => ({
    id: enquiry._id.toString(),
    name: enquiry.name,
    email: enquiry.email,
    courseInterest: enquiry.courseInterest,
    createdAt: enquiry.createdAt,
    updatedAt: enquiry.updatedAt,
  }));
};

export { addNewEnquiry, claimLead, getMyClaimedEnquries, getUnclaimedEnquries };
