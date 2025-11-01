import CreateUserDto from '../dto/CreateUserDto';
import LoginUserDto from '../dto/LoginUserDto';
import User from '../models/userModel';
import { IUserResponse } from '../types/common';
import { comparePassword, hashPassword } from '../utils/hashUtil';
import { generateToken } from '../utils/jwtUtil';

const registerUser = async (data: CreateUserDto): Promise<IUserResponse> => {
  const { name, email, password } = data;
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error('Email already registered');

  const hashedPassword = await hashPassword(password);
  const user = await User.create({ name, email, password: hashedPassword });

  const response: IUserResponse = {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    password: user.password,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return response;
};

const loginUser = async (
  data: LoginUserDto,
): Promise<{ user: IUserResponse; token: string }> => {
  const { email, password } = data;
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) throw new Error('Invalid credentials');

  const token = generateToken({ userId: user._id });

  const response: IUserResponse = {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    password: user.password,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return { user: response, token };
};

export { loginUser, registerUser };
