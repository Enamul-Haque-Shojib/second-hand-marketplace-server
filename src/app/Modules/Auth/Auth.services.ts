import AppError from '../../errors/AppError';
import { authSearchableField } from './Auth.constant';
import { TAuth, TFeedBack } from './Auth.interface';
import { AuthModel, FeedBackModel } from './Auth.model';
import { createToken, verifyToken } from './Auth.utils';
import QueryBuilder from '../../builder/QueryBuilder';

import config from '../../config';
import { ListingsModel } from '../Listings/Listings.model';
import { TransactionsModel } from '../Transactions/Transactions.model';

const registerUserIntoDB = async (userData: TAuth) => {
  const existingUser = await AuthModel.findOne({ email: userData.email });
  if (existingUser) {
    throw new AppError(406, 'Email is already registered');
  }

  // Create the user
  const user = new AuthModel(userData);
  const createdUser = await user.save();

  return await AuthServices.loginUserIntoDB({
    email: createdUser?.email,
    password: userData?.password,
  });
};

const loginUserIntoDB = async (payload: TAuth) => {
  const user = await AuthModel.findOne({ email: payload?.email });

  if (!user) {
    throw new AppError(400, 'This user is not found!');
  }

  if (user.status === 'Ban') {
    throw new AppError(403, 'This user is Ban!');
  }

  if (!(await AuthModel.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(403, 'Password does not match');
  }

  const jwtPayload = {
    name: user.authName as string,
    email: user.email as string,
    status: user.status as string,
    role: user.role as string,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    user,
    accessToken,
    refreshToken,
  };
};

const updateAuthIntoDB = async (id: string, payload: Partial<TAuth>) => {
  const updateAuthInfo = await AuthModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  if (!updateAuthInfo) {
    throw new AppError(400, 'Failed to update Auth');
  }
  return updateAuthInfo;
};

const getSingleAuthFromDB = async (email: string) => {
  const user = await AuthModel.findOne({ email: email });
  if (!user) {
    throw new AppError(400, 'This user is not found!');
  }
  return user;
};

const getAllAuthsFromDB = async (query: Record<string, unknown>) => {
  const authQuery = new QueryBuilder(AuthModel.find(), query)
    .search(authSearchableField)
    .filter();
  const result = authQuery.modelQuery;

  return result;
};

const deleteAuthFromDB = async (id: string) => {
  const deleteAuthInfo = await AuthModel.findByIdAndDelete(id);
  return deleteAuthInfo;
};

const createJwtToken = async (token: string) => {
  let verifiedToken = null;
  try {
    verifiedToken = verifyToken(token, config.jwt_refresh_secret as string);
  } catch (err) {
    throw new AppError(403, 'Invalid Refresh Token');
  }

  const { email } = verifiedToken;

  const isUserExist = await AuthModel.findOne({ email });
  if (!isUserExist) {
    throw new AppError(404, 'User does not exist');
  }

  if (isUserExist.status === 'Ban') {
    throw new AppError(500, 'User has been banned');
  }

  const jwtPayload = {
    name: isUserExist.authName as string,
    email: isUserExist.email as string,
    status: isUserExist.status as string,
    role: isUserExist.role as string,
  };

  const newAccessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken: newAccessToken,
  };
};

const feedBackUserIntoDB = async (userData: TFeedBack) => {
  const feedBack = await FeedBackModel.create(userData);

  return feedBack;
};
const getAllFeedBackUserIntoDB = async () => {
  const feedBack = await FeedBackModel.find();

  return feedBack;
};

const dashboardStatisticsFromDB = async (id: string) => {
  const productData = await ListingsModel.find();
  const transactionData = await TransactionsModel.find();
  const productCount = productData.length;

  let buyCount = 0;
  let saleCount = 0;

  transactionData.forEach((transaction) => {
    if (transaction.buyerId?.toString() === id) {
      buyCount++;
    } else if (transaction.sellerId?.toString() === id) {
      saleCount++;
    }
  });

  return { productCount, buyCount, saleCount };
};

export const AuthServices = {
  registerUserIntoDB,
  loginUserIntoDB,
  updateAuthIntoDB,
  getAllAuthsFromDB,
  deleteAuthFromDB,
  getSingleAuthFromDB,
  createJwtToken,
  feedBackUserIntoDB,
  getAllFeedBackUserIntoDB,
  dashboardStatisticsFromDB,
};
