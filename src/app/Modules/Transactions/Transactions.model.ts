import { model, Schema } from 'mongoose';
import { TTransaction } from './Transactions.interface';

const transactionsSchema = new Schema<TTransaction>(
  {
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: 'Auth',
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: 'Auth',
    },
    itemId: {
      type: Schema.Types.ObjectId,
      ref: 'Listings',
    },
    status: {
      type: String,
      enum: ['Pending', 'Completed'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  },
);

export const TransactionsModel = model<TTransaction>(
  'Transactions',
  transactionsSchema,
);
