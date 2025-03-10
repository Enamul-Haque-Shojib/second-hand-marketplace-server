import { model, Schema } from 'mongoose';
import { TAuth, AuthStaticModel, TFeedBack } from './Auth.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const feedBackSchema = new Schema<TFeedBack>({
  feedbackUserPhoto: { type: String, required: true },
  name: { type: String, required: true },
  lifeStyle: { type: String, require: true },
  feedBack: {
    type: String,
    required: true,
  },
});

const authSchema = new Schema<TAuth, AuthStaticModel>(
  {
    authName: {
      type: String,
      default: '',
    },
    authImgUrl: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'user'],
      },
      default: 'user',
    },
    status: {
      type: String,
      enum: {
        values: ['Ban', 'Unban'],
      },
      default: 'Unban',
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password; // Remove password field
        return ret;
      },
    },
  },
);

authSchema.statics.isAuthExistById = async function (id: string) {
  return await AuthModel.findById(id, { authId: 1 });
};
authSchema.statics.isAuthExistByEmail = async function (email: string) {
  return await AuthModel.findOne({ email });
};

authSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const auth = this; // doc

  auth.password = await bcrypt.hash(
    auth.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
authSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const AuthModel = model<TAuth, AuthStaticModel>('Auth', authSchema);

export const FeedBackModel = model<TFeedBack>('FeedBack', feedBackSchema);
