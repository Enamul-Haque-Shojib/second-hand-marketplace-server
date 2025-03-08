/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { AuthRole } from './Auth.constant';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

export type TFeedBack = {
  feedbackUserPhoto: string;
  name:string;
  lifeStyle: string;
  feedBack: string;
}


export type TAuth = {
  authName?: string;
  authImgUrl?: string;
  email: string;
  password: string;
  role?: 'admin' | 'user';
  status?: 'Ban'|'Unban'
};

export interface AuthStaticModel extends Model<TAuth> {
  isAuthExistById(id: string): Promise<TAuth>;
  isAuthExistByEmail(email: string): Promise<TAuth>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TAuthRole = keyof typeof AuthRole;
