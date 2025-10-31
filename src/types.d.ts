export interface IUserResponse {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum CourseInterest {
  WEB_DEVELOPMENT = 'Web Development',
  DATA_SCIENCE = 'Data Science',
  MACHINE_LEARNING = 'Machine Learning',
  CLOUD_COMPUTING = 'Cloud Computing',
  CYBER_SECURITY = 'Cyber Security',
  DIGITAL_MARKETING = 'Digital Marketing',
  UI_UX_DESIGN = 'UI/UX Design',
}

export interface IEnquiryResponse {
  _id: string;
  name: string;
  email: string;
  courseInterest: CourseInterest;
  claimedBy?: Types.ObjectId | null;
  claimedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
