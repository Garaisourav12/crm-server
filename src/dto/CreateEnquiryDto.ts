import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { CourseInterest } from '../types/common';

class CreateEnquiryDto {
  @IsNotEmpty({ message: 'Name is required' })
  name!: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email!: string;

  @IsEnum(CourseInterest, { message: 'Invalid course interest' })
  courseInterest!: CourseInterest;
}

export default CreateEnquiryDto;
