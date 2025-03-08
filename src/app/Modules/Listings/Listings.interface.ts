/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';


export type TListing = {
  title: string;
  description: string;
  price: number;
  condition: 'Brand New' | 'Like New' | 'Excellent' | 'Good' | 'Fair (Acceptable)' | 'Needs Repair / For Parts';
  image: string;
  userId: Types.ObjectId;
  status: 'Available' | 'Sold';
 
  category: string ;
};

export interface ListingStaticModel extends Model<TListing> {
  isProductExistById(id: string): Promise<TListing>;
}
