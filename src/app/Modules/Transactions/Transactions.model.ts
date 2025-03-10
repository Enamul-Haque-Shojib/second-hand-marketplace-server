import { model, Schema } from 'mongoose';
import { TransactionStaticModel, TTransaction } from './Transactions.interface';

const transactionsSchema = new Schema<TTransaction, TransactionStaticModel>(
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

transactionsSchema.statics.isProductExistById = async function (id: string) {
  return await TransactionsModel.findOne({itemId: id});
};

export const TransactionsModel = model<TTransaction, TransactionStaticModel>(
  'Transactions',
  transactionsSchema,
);
