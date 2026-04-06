import bcrypt from "bcryptjs";
import { db } from "../_helpers/db";
import { Role } from "../_helpers/role";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { User, UserCreationAttributes } from "../models/user.model";
import { AppError } from "../_helpers/AppError";

export const authService = {
  registerUser,
  verifyEmail,
  login,
  logout,
};

type RegisterUserParams = Omit<UserCreationAttributes, "passwordHash"> & {
  password: string;
};

interface VerifyEmailParams {
  email: string;
}

interface LoginParams {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    title: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}

async function registerUser(userData: RegisterUserParams): Promise<void> {
  const existingUser = await User.findOne({ where: { email: userData.email } });
  if (existingUser) {
    throw new AppError(`Email "${userData.email}" is already taken`, 400);
  }
  const { password, ...createParams } = userData;
  const passwordHash = await bcrypt.hash(password, 10);

  await db.User.create({
    ...createParams,
    passwordHash,
    role: createParams.role || Role.User,
  } as UserCreationAttributes);
}

async function login(params: LoginParams): Promise<AuthResponse> {
  const user = await db.User.scope("withHash").findOne({
    where: { email: params.email },
  });

  if(!user){
    throw new AppError("User not found", 404);
  }

  if (!(await bcrypt.compare(params.password, user.passwordHash))) {
    throw new AppError("Username or password is incorrect", 400 );
  }

  const secret = process.env.SECRET_KEY;
  if (!secret) {
    throw new AppError("SECRET_KEY is not configured", 500);
  }

  const token = jwt.sign({ sub: user.id, role: user.role }, secret, {
    expiresIn: "1d",
  });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      title: user.title,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
  };
}

async function verifyEmail(params: VerifyEmailParams): Promise<void> {
  const user = await User.findOne({ where: { email: params.email, verified: false } });

  if(!user){
    throw new AppError("Email not found", 404);
  }
  user.verified = true;
  await user.save();
}

async function logout(): Promise<void> {
  return;
}
