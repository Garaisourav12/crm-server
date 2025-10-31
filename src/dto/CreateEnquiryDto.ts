import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { CourseInterest } from '../types'; // your enum file

export class CreateEnquiryDto {
  @IsNotEmpty({ message: 'Name is required' })
  name!: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email!: string;

  @IsEnum(CourseInterest, { message: 'Invalid course interest' })
  courseInterest!: CourseInterest;
}
