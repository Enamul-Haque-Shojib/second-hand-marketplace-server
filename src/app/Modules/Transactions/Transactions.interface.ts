/* eslint-disable no-unused-vars */
import { Types } from 'mongoose';



export type TTransaction = {

  buyerId: Types.ObjectId;
  sellerId: Types.ObjectId;
  itemId: Types.ObjectId;
  status: 'Pending' | 'Completed';
  
};

// export interface ListingStaticModel extends Model<TListing> {
//   isProductExistById(id: string): Promise<TListing>;
// }
