import { Model, Types } from 'mongoose';

export type TTransaction = {
  buyerId: Types.ObjectId;
  sellerId: Types.ObjectId;
  itemId: Types.ObjectId;
  status: 'Pending' | 'Completed';
};

export interface TransactionStaticModel extends Model<TTransaction> {
  isProductExistById(id: string): Promise<boolean>;
}
