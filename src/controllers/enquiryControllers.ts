import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import CreateEnquiryDto from '../dto/CreateEnquiryDto';
import { createError } from '../middlewares/errorHandler';
import { enquiryServices } from '../services';

const addNewEnquiry = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const dto = plainToInstance(CreateEnquiryDto, req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      const firstError = Object.values(errors[0].constraints ?? {})[0];
      throw createError(firstError || 'Bad request', 400);
    }

    const response = await enquiryServices.addNewEnquiry(dto);

    res.status(201).json({
      success: true,
      message: 'Enquiry added successfully',
      enquiry: response,
    });
  } catch (error) {
    next(error);
  }
};

const claimLead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    // @ts-ignore
    const { userId } = req;

    if (!id || typeof id !== 'string') {
      throw createError('Invalid enquiry id', 400);
    }

    await enquiryServices.claimLead(id, userId);

    res.status(200).json({
      success: true,
      message: 'Lead claimed successfully',
    });
  } catch (error) {
    next(error);
  }
};

const getUnclaimedEnquries = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const enquiries = await enquiryServices.getUnclaimedEnquries();
    res.status(200).json({
      success: true,
      message: 'Unclaimed enquiries fetched successfully',
      enquiries,
    });
  } catch (error) {
    next(error);
  }
};

const getMyClaimedEnquries = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // @ts-ignore
    const { userId } = req;
    const enquiries = await enquiryServices.getMyClaimedEnquries(userId);
    res.status(200).json({
      success: true,
      message: 'My claimed enquiries fetched successfully',
      enquiries,
    });
  } catch (error) {
    next(error);
  }
};

export { addNewEnquiry, claimLead, getMyClaimedEnquries, getUnclaimedEnquries };
